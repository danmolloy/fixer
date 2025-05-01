import prisma from '../../../../../client';
import { DateTime } from 'luxon';
import {
  Call,
  ContactEventCall,
  ContactMessage,
  EnsembleContact,
  Event,
  EventSection,
  Orchestration,
  User,
} from '@prisma/client';
import crypto from 'crypto';
import { emailAvailabilityChecks } from './emailFunctions';
import axios from 'axios';
import {
  bookingCompleteEmail,
  listExhaustedEmail,
} from '../../../../sendGrid/adminEmailLib';
import { createOfferEmail } from '../../../../sendGrid/playerLib';

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
  eventId: string;
};

export type FixingSection = EventSection & {
  orchestration: (Orchestration & {
    call: Call;
  })[];
  contacts: (ContactMessage & {
    contact: EnsembleContact;
    eventCalls: (ContactEventCall & {
      call: Call;
    })[];
  })[];
};

export type FixingObj = Event & {
  sections: FixingSection[];
  fixer: User;
  calls: Call[];
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

  const event = await prisma.event.findUnique({
    where: {
      id: Number(data.eventId),
    },
    include: {
      fixer: true,
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
      include: {
        contact: true,
      },
    });
    for (let j = 0; j < data.contacts[i].calls.length; j++) {
      await prisma.contactEventCall.create({
        data: {
          callId: Number(data.contacts[i].calls[j]),
          status:
            data.contacts[i].autoAccepted === true
              ? 'ACCEPTED' /* CHange to AUTOBOOKED eventually */
              : data.type === 'AVAILABILITY'
                ? 'TOCHECK'
                : 'TOOFFER',
          contactMessageId: newContact.id,
        },
      });
    }
    if (newContact.type === 'AUTOBOOK' && event !== null) {
      try {
        const playerCalls = await prisma.contactEventCall.findMany({
          where: {
            contactMessageId: newContact.id,
          },
          include: {
            call: true,
          },
        });

        const emailData = await createOfferEmail({
          ...newContact,
          calls: playerCalls.map((c) => c.call),
          event: event,
        });

        await axios.post(`${process.env.URL}/sendGrid`, {
          body: {
            emailData: emailData,
            templateID: emailData.templateID,
            emailAddress: emailData.email,
          },
        });
        //await addEmailToQueue(emailData);
        if (newContact.urgent === true) {
          await urgentNotification({ ...newContact, event: event });
        }
      } catch (e) {
        throw new Error(e);
      }
    }
    currentHighestIndex += 1;
  }
  if (data.type !== 'AVAILABILITY') {
    await handleFixing(Number(data.eventId));
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

  const startDate = DateTime.fromJSDate(new Date(sortedCalls[0].startTime));
  const endDate = DateTime.fromJSDate(
    new Date(sortedCalls[sortedCalls.length - 1].endTime)
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
                  call: true,
                },
              },
            },
          },
          orchestration: true,
        },
      },
    },
  });

  if (event?.sections.length === undefined) {
    return true;
  }

  for (let i = 0; i < event.sections.length; i++) {
    const orchestrations = event?.sections[i].orchestration;
    for (let j = 0; j < orchestrations.length; j++) {
      let numStillRequired = orchestrations[j].numRequired;
      let numBooked = event?.sections[i].contacts.filter(
        (c) =>
          c.eventCalls
            .map((j) => j.callId)
            .includes(orchestrations[j].callId) &&
          c.eventCalls.find((j) => j.callId)!.status === 'ACCEPTED'
      ).length;

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
    (i) => i.status === 'AUTOBOOKED' || i.status === 'IN_PROGRESS'
  ).length;
  const numYetToRespond = data.contactMessages.filter(
    (i) =>
      i.status === 'AWAITINGREPLY' &&
      (i.type === 'AUTOBOOK' || i.type === 'BOOKING')
  ).length;

  const numToContact =
    data.orchestration.sort((a, b) => b.numRequired - a.numRequired)[0]
      .numRequired -
    numBooked -
    numYetToRespond;
  return numToContact;
};

export const callsNotFixed = (args: {
  contactMessages: (ContactMessage & { calls: Call[] })[];
  orchestration: Orchestration[];
}): number[] => {
  let callIDs: number[] = [];

  for (let i = 0; i < args.orchestration.length; i++) {
    const bookedPlayers = args.contactMessages.filter(
      (j) =>
        (j.status === 'RESPONDED' || j.status === 'AUTOBOOKED') &&
        j.calls.map((c) => c.id).includes(args.orchestration[i].callId)
    );
    if (bookedPlayers.length < args.orchestration[i].numRequired) {
      callIDs = [...callIDs, args.orchestration[i].callId];
    }
  }
  return callIDs;
};

export const getEventSections = async (
  eventID: number
): Promise<FixingObj | null> => {
  return await prisma.event.findUnique({
    where: {
      id: eventID,
    },
    include: {
      fixer: true,
      calls: true,
      sections: {
        include: {
          orchestration: {
            include: {
              call: true,
            },
          },
          contacts: {
            include: {
              contact: true,
              eventCalls: {
                include: {
                  call: true,
                },
              },
            },
          },
        },
      },
    },
  });
};
export const getUnfixedCalls = (section: FixingSection): number[] => {
  let unfixedCallIDs: number[] = [];

  section.orchestration.forEach((orch) => {
    const bookedPlayers = section.contacts.filter(
      (contact) =>
        contact.eventCalls.filter(
          (eCall) => eCall.callId === orch.callId && eCall.status === 'ACCEPTED'
        ).length > 0 && contact.status !== "FINDINGDEP"
    );
    
    if (orch.numRequired > bookedPlayers.length) {
      unfixedCallIDs = [...unfixedCallIDs, orch.callId];
    }
  });

  return unfixedCallIDs;
};
export const isGigFixed = (event: FixingObj) => {
  for (let i = 0; i < event.sections.length; i++) {
    if (getUnfixedCalls(event.sections[i]).length > 0) {
      return false;
    }
  }
  return true;
};

export const gigFixedNotification = async (event: FixingObj) => {
  try {
    // Let fixer know it's done.
    const bookingComplete = await bookingCompleteEmail({
      dateRange: getDateRange(event.calls),
      fixerFirstName: event.fixer.firstName!,
      email: event.fixer.email!,
      ensemble: event.ensembleName,
    });

    return await axios.post(`${process.env.URL}/sendGrid`, {
      body: {
        emailData: bookingComplete,
        templateID: bookingComplete.templateID,
        emailAddress: bookingComplete.email,
      },
    });
  } catch (e) {
    console.log(e);
    throw new Error(e);
  }
};

export const listExhaustedNotification = async (data: {
  event: FixingObj;
  instrumentName: string;
}) => {
  try {
    const emailAlert = await listExhaustedEmail({
      dateRange: getDateRange(data.event.calls),
      fixerFirstName: data.event.fixer.firstName!,
      email: data.event.fixer.email!,
      ensemble: data.event.ensembleName,
      instrument: data.instrumentName,
    });

    await axios.post(`${process.env.URL}/sendGrid`, {
      body: {
        emailData: emailAlert,
        templateID: emailAlert.templateID,
        emailAddress: emailAlert.email,
      },
    });
  } catch (e) {
    throw new Error(e);
  }
};
export const urgentNotification = async (data: {
  event: Event & {
    fixer: User;
  };
  contact: EnsembleContact;
}) => {
  try {
    return await axios.post(`${process.env.URL}/twilio`, {
      body: {
        phoneNumber: data.contact.phoneNumber,
        message: `Hi ${data.contact.firstName}, we have just sent you an urgent email on behalf of ${data.event.fixer.firstName} ${data.event.fixer.lastName} (${data.event.ensembleName}). GigFix`,
      },
    });
  } catch (e) {
    throw new Error(e);
  }
};

export const getCallsToOffer = async (data: {
  contactMessageID: number;
  sectionID: number;
}): Promise<number[]> => {
  try {
    const section = await prisma.eventSection.findUnique({
      where: {
        id: data.sectionID,
      },
      include: {
        orchestration: {
          include: {
            call: true,
          },
        },
        contacts: {
          include: {
            contact: true,
            eventCalls: {
              include: {
                call: true,
              },
            },
          },
        },
      },
    });

    let callsArray: number[] = [];
    const contact = section!.contacts.find(
      (c) => c.id === data.contactMessageID
    );
    for (let i = 0; i < contact!.eventCalls.length; i++) {
      const eventCall = contact!.eventCalls[i];
      const bookedPlayers =
        section?.contacts.filter((c) =>
          c.status !== "FINDINGDEP" &&
          c.eventCalls
            .filter(
              (e) => e.callId === eventCall.callId && e.status === 'ACCEPTED'
            )
            .map((e) => e.callId)
            .includes(eventCall.callId)
        ).length || 0;
      const awaitingPlayers =
        section?.contacts.filter((c) =>
          c.eventCalls
            .filter(
              (e) => e.callId === eventCall.callId && e.status === 'OFFERING'
            )
            .map((e) => e.callId)
            .includes(eventCall.callId)
        ).length || 0;
      const toOfferPriority =
        section?.contacts.filter(
          (c) =>
            c.eventCalls
              .filter(
                (e) => e.callId === eventCall.callId && e.status === 'TOOFFER'
              )
              .map((e) => e.callId)
              .includes(eventCall.callId) &&
            c.indexNumber < contact!.indexNumber
        ).length || 0;
      const numRequired =
        section?.orchestration.find((orch) => orch.callId === eventCall.callId)
          ?.numRequired || 0;
      if (numRequired - bookedPlayers - awaitingPlayers - toOfferPriority > 0) {
        callsArray = [...callsArray, eventCall.callId];
      }
    }
    return callsArray;
  } catch (e) {
    throw new Error(e);
  }
};

export const handleFixing = async (eventID: number) => {
  // Get all event sections
  const event = await getEventSections(eventID);
  if (event === null) {
    return;
  }
  // If all sections fixed, send email to fixer
  if (isGigFixed(event) === true) {
    return await gigFixedNotification(event);
  }
  // Iterate through all sections.
  for (let i = 0; i < event.sections.length; i++) {
    // Get unfixed calls
    const unfixedCalls = await getUnfixedCalls(event.sections[i]);
    // Iterate over each contact in the section
    for (let j = 0; j < event.sections[i].contacts.length; j++) {
      const contact = event.sections[i].contacts[j];
      // Find reason to skip
      if (contact.status !== 'NOTCONTACTED') {
        continue;
      }
      const callsToOffer = await getCallsToOffer({
        contactMessageID: contact.id,
        sectionID: event.sections[i].id,
      });
      const unfixedEventCalls = contact.eventCalls.filter((c) =>
        unfixedCalls.includes(c.callId)
      );

      if (callsToOffer.length > 0 && unfixedEventCalls.length === callsToOffer.length) {
        await makeOffer({
          ...contact,
          eventCalls: unfixedEventCalls,
          event: event,
        });
      }
    }
  }
  // Alert fixer if any lists are exhausted

  return;
};

export const makeOffer = async (
  contact: ContactMessage & {
    contact: EnsembleContact;
    event: Event & {
      fixer: User;
    };
    eventCalls: (ContactEventCall & {
      call: Call;
    })[];
  }
) => {
  try {
    await prisma.contactMessage.update({
      where: {
        id: contact.id,
      },
      data: {
        status: 'AWAITINGREPLY',
      },
    });
    await prisma.contactEventCall.updateManyAndReturn({
      where: {
        id: {
          in: contact.eventCalls.map((c) => c.id),
        },
      },
      data: {
        status: 'OFFERING',
      },
    });
    const emailData = await createOfferEmail({
      ...contact,
      calls: contact.eventCalls.map((c) => c.call),
      event: contact.event,
    });

    await axios.post(`${process.env.URL}/sendGrid`, {
      body: {
        emailData: emailData,
        templateID: emailData.templateID,
        emailAddress: emailData.email,
      },
    });
    //await addEmailToQueue(emailData);
    if (contact.urgent === true) {
      await urgentNotification(contact);
    }
  } catch (e) {
    throw new Error(e);
  }
};
