import { redirect } from 'next/navigation';
import prisma from '../../../../client';
import { Call, ContactMessage, EnsembleContact, Event, EventSection, User } from '@prisma/client';
import { EmailData } from '../../../sendGrid/lib';
import axios from 'axios';
import { DateTime } from 'luxon';
import { getDateRange } from '../../../fixing/contactMessage/api/create/functions';

const url = `${process.env.URL}`

export const formattedCalls = (calls, fixerId) => {
  return [...calls].map((i) => ({
    startTime: new Date(i.startTime),
    endTime: new Date(i.endTime),
    venue: i.venue,
    fixer: { connect: { id: fixerId } },
  }));
};

export const eventObj = (obj) => {
  return {
    //ensembleId: obj.ensembleId,
    id: Number(obj.id),
    ensembleName: obj.ensembleName,
    eventTitle: obj.eventTitle,
    concertProgram: obj.concertProgram,
    confirmedOrOnHold: obj.confirmedOrOnHold,
    formattedCalls: formattedCalls(obj.calls, obj.fixerId),
    dressCode: obj.dressCode,
    fee: obj.fee,
    additionalInfo: obj.additionalInfo,
    //fixerName: obj.fixerName,
    fixerId: obj.fixerId,
  };
};

export const updateEvent = async (eventObj: Event) => {
  const updatedEvent = await prisma.event.update({
    where: {
      id: eventObj.id,
    },
    data: {
      eventTitle: eventObj.eventTitle,
      ensembleName: eventObj.ensembleName,

      concertProgram: eventObj.concertProgram,
      confirmedOrOnHold: eventObj.confirmedOrOnHold,
      dressCode: eventObj.dressCode,
      fee: eventObj.fee,
      additionalInfo: eventObj.additionalInfo,
      //fixerName: obj.fixerName,
      fixerId: eventObj.fixerId,
      updatedAt: new Date(),
    },
    include: {
      fixer: true,
      sections: {
        include: {
          contacts: {
            where: {
              accepted: !false,
              recieved: true
            },
            include: {
              calls: true,
              contact: true
            }
          }
        }
      }
    }
  });
  return updatedEvent;
};

export const updateOrCreateCall = async (callObj: any) => {
  try {
    const updatedCall = await prisma.call.update({
      where: {
        id: callObj.id,
      },
      data: {
        startTime: new Date(callObj.startTime),
        endTime: new Date(callObj.endTime),
        venue: callObj.venue,
        updatedAt: new Date(),
      },
    });

    return updatedCall;
  } catch (e) {
    console.log(e);
    const createCall = await prisma.call.create({
      data: {
        startTime: new Date(callObj.startTime),
        endTime: new Date(callObj.endTime),
        venue: callObj.venue,
        eventId: callObj.eventId,
        fixerId: callObj.fixerId,
      },
    });
    return createCall;
  }
};

export const updateCalls = async (
  callsArr: Call[],
  fixerId: string,
  eventId: number
) => {
  let updatedCalls: Call[] = [];
  for (let i = 0; i < callsArr.length; i++) {
    let updatedCall = await updateOrCreateCall({
      ...callsArr[i],
      fixerId: fixerId,
      eventId: eventId,
    });
    updatedCalls = [...updatedCalls, updatedCall];
  }
  return updatedCalls;
};

export const getUpdateEmailData = (event: Event & {fixer: User}, 
  calls: Call[],
  contact: ContactMessage & {contact: EnsembleContact}): EmailData => {


      const emailData = {
        accepted: contact.accepted,
        firstName: contact.contact.firstName,
        lastName: contact.contact.lastName,
        email: contact.contact.email!,
        phoneNumber: contact.contact.phoneNumber!,
        booking: contact.bookingOrAvailability === "Booking",
        ensembleName: event.ensembleName,
        dateRange: getDateRange(calls),
        personalMessage: contact.playerMessage !== null ? contact.playerMessage : undefined,
        sectionMessage: undefined,
        position: contact.position,
        sectionName: "",
        fixerName: `${event.fixer.firstName} ${event.fixer.lastName}`,
        fixerEmail: event.fixer.email!,
        fixerMobile: event.fixer.mobileNumber!,
        responseURL: `https://gigfix.co.uk/response/${contact.token}/`,
        concertProgram: event.concertProgram,
        confirmed: event.confirmedOrOnHold.toLocaleLowerCase() === "confirmed",
        dressCode: event.dressCode,
        fee: event.fee,
        additionalInfo: event.additionalInfo ? event.additionalInfo : undefined,
        calls: calls.map(i => ({
          date: DateTime.fromJSDate(i.startTime).toFormat('ccc LL LLL y'),
          startTime: DateTime.fromJSDate(i.startTime).toFormat('hh:mm a'),
          endTime: DateTime.fromJSDate(i.endTime).toFormat('hh:mm a'),
          venue: i.venue
        }))
    }

    return emailData;
}

export const updateEmailPlayers = async (data: {
  event: Event & {
    fixer: User,
    sections: (EventSection & { 
      contacts: (ContactMessage & {contact: EnsembleContact})[] 
    })[]
}, calls: Call[]}, updateMessage: string) => {

  let contacts: (ContactMessage & {contact: EnsembleContact})[] = [];

  for (let i = 0; i < data.event.sections.length; i++) {
    contacts = [...contacts, 
      ...data.event.sections[i].contacts.filter(i => 
        i.accepted !== false && i.recieved === true)];
  }

  for (let i = 0; i < contacts.length; i++) {
    const emailData = getUpdateEmailData(data.event, data.calls, contacts[i])
    try {
      await axios.post(`${url}/sendGrid`, {body: {
        emailData: {...emailData, updateMessage: updateMessage},
        templateID: "d-64b6930d20d3471f85c7519750c9e444",
        emailAddress: contacts[i].contact.email
      }})
    } catch(e) {
      throw Error(e)
    }
  }

}

export const updateEventandCalls = async (eventAndCalls: {
  eventObj: any;
  callsArr: Call[];
}) => {
  const event = await updateEvent(eventAndCalls.eventObj);
  const calls = await updateCalls(
    eventAndCalls.callsArr,
    eventAndCalls.eventObj.fixerId,
    eventAndCalls.eventObj.id
  );
  
  return { event, calls };
};
