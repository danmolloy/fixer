import prisma from '../../../../../client';
import { DateTime } from 'luxon';
import { Call, ContactMessage, Orchestration } from '@prisma/client';
import crypto from 'crypto';
import {
  emailAvailabilityChecks,
  emailBookingMusicians,
} from './emailFunctions';

export type CreateContactMessageProps = {
  contacts: {
    contactId: string;
    position: string;
    playerMessage?: string;
    calls: string[];
    autoAccepted: boolean;
  }[];
  eventSectionId: string;
  type: 'BOOKING' | 'AVAILABILITY' | 'AUTOBOOK';
  strictlyTied: string;
  urgent: boolean;
};

export const generateToken = () => {
  const token = crypto.randomBytes(32).toString('hex');

  return token;
};

export const createContactMessages = async (
  data: CreateContactMessageProps
) => {
  const currentCalls = await prisma.contactMessage.findMany({
    where: {
      eventSectionId: Number(data.eventSectionId),
    },
    orderBy: {
      indexNumber: 'asc',
    },
  });

  let currentHighestIndex =
    currentCalls.length > 0
      ? currentCalls[currentCalls.length - 1].indexNumber + 1
      : 1;

  for (let i = 0; i < data.contacts.length; i++) {
    const newContact = await prisma.contactMessage.create({
      data: {
        eventSectionId: Number(data.eventSectionId),
        contactId: data.contacts[i].contactId,
        status:
          data.contacts[i].autoAccepted === true
            ? 'AUTOBOOKED'
            : 'NOTCONTACTED',
        token: generateToken(),
        //position: data.contacts[i].position,
        playerMessage: data.contacts[i].playerMessage,
        indexNumber: currentHighestIndex,
        type: data.contacts[i].autoAccepted === true ? 'AUTOBOOK' : data.type,
        strictlyTied: data.strictlyTied === 'true',
        urgent: data.urgent,
      },
    });
    for (let j = 0; j < data.contacts[i].calls.length; j ++) {
      await prisma.contactEventCall.create({
        data: {
          callId: Number(data.contacts[i].calls[j]),
          status: data.type === "AUTOBOOK" ? "ACCEPTED" : data.type === "AVAILABILITY" ? "TOCHECK" : "TOOFFER",
          contactMessageId: newContact.id
          /* call: {
            connect: {
              id: Number(data.contacts[i].calls[j]),
            }
          } */
        }
          
    }) 
  }
    currentHighestIndex += 1;
  }
  if (data.type !== 'AVAILABILITY') {
    await emailBookingMusicians(Number(data.eventSectionId));
  } else {
    await emailAvailabilityChecks(Number(data.eventSectionId));
  }
  return;
};

export const getDateRange = (calls: Call[]) => {
  const sortedCalls = calls.sort(
    (a, b) =>
      Number(DateTime.fromJSDate(new Date(a.startTime))) -
      Number(DateTime.fromJSDate(new Date(b.startTime)))
  );

  const startDate = DateTime.fromJSDate(sortedCalls[0].startTime);
  const endDate = DateTime.fromJSDate(
    sortedCalls[sortedCalls.length - 1].endTime
  );

  if (startDate.hasSame(endDate, 'day')) {
    return `${startDate.toFormat('dd LLL yyyy')}`;
  } else if (startDate.hasSame(endDate, 'month')) {
    return `${startDate.toFormat('dd')}-${endDate.toFormat('dd LLL yyyy')}`;
  } else if (startDate.hasSame(endDate, 'year')) {
    return `${startDate.toFormat('dd LLL')}-${endDate.toFormat('dd LLL yyyy')}`;
  } else {
    return `${startDate.toFormat('dd LLL yyyy')}-${endDate.toFormat('dd LLL yyyy')}`;
  }
};

export const gigIsFixed = async (eventID: number) => {
  const event = await prisma.event.findUnique({
    where: {
      id: eventID,
    },
    include: {
      fixer: true,
      sections: {
        include: {
          contacts: {
            include: {
              //calls: true
              eventCalls: {
                include: {
                  call: true
                }
              }
            }
          },
          orchestration: true
        },
      },
    },
  });

  if (event?.sections.length === undefined) {
    return true;
  }

  for (let i = 0; i < event.sections.length; i++) {
    const orchestrations = event?.sections[i].orchestration
    for (let j = 0; j < orchestrations.length; j ++) {
      let numStillRequired = orchestrations[j].numRequired;
      let numBooked = event?.sections[i].contacts.filter(c => (
        c.eventCalls.map(j => j.callId).includes(orchestrations[j].callId) 
        && (c.eventCalls.find(j => j.callId)!.status === "ACCEPTED")
      )).length
      
      if (numStillRequired - numBooked !== 0) {
        return false;
      }
    }
  }
  return true;
};

export const getNumToContact = (data: {
  contactMessages: ContactMessage[];
  orchestration: Orchestration[];
}): number => {
  const numBooked = data.contactMessages.filter(
    (i) => i.status === 'AUTOBOOKED' || i.status === 'ACCEPTED'
  ).length;
  const numYetToRespond = data.contactMessages.filter(
    (i) =>
      i.status === 'AWAITINGREPLY' &&
      (i.type === 'AUTOBOOK' || i.type === 'BOOKING')
  ).length;

  const numToContact = data.orchestration.sort((a, b) => b.numRequired - a.numRequired)[0].numRequired - numBooked - numYetToRespond;
  return numToContact;
};

export const callsNotFixed = (args: {
  contactMessages: (ContactMessage & {calls: Call[]})[];
  orchestration: Orchestration[]
}): number[] => {
  let callIDs: number[] = [];

  for (let i = 0; i < args.orchestration.length; i ++) {
    const bookedPlayers = args.contactMessages.filter(j => (
      j.status === "ACCEPTED" 
      || j.status === "AUTOBOOKED" 
    ) && j.calls.map(c => c.id).includes(args.orchestration[i].callId));
    if (bookedPlayers.length < args.orchestration[i].numRequired) {
      callIDs = [...callIDs, args.orchestration[i].callId]
    }
  }
  return callIDs;
}


// players to msg
/* 
discard all fixed calls
for each player{
  discard fixed calls from playerMessage
  if all remaining calls numRequired - (booked + aw) > 0 {
    await offer those calls
  }
}
  

*/
