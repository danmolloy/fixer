import axios from 'axios';
import prisma from '../../../client';
import { Call, ContactMessage, EnsembleContact, Event, EventSection, User } from '@prisma/client';
import { EmailData } from '../../sendGrid/lib';
import { getDateRange } from '../../fixing/contactMessage/api/create/functions';
import { DateTime } from 'luxon';

const url = `${process.env.URL}`


export const deleteEvent = async (eventId: number) => {
  return await prisma.event.delete({
    where: {
      id: eventId,
    },
    include: {
      fixer: true,
      calls: true,
      sections: {
        include: {
          contacts: {
            where: {
              accepted: !false,
              recieved: true
            },
            include: {
              contact: true
            }
          }
        }
      }
    }
  });
};


export const getUpdateEmailData = (event: (Event & {fixer: User}), 
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
        responseURL: `https://gigfix.co.uk/response/${contact.id}/${contact.token}/`,
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

export const deleteEmailPlayers = async (event: 
   Event & {
    calls: Call[]
    fixer: User,
    sections: (EventSection & { 
      contacts: (ContactMessage & {contact: EnsembleContact})[] 
    })[]
}, updateMessage: string) => {

  let contacts: (ContactMessage & {contact: EnsembleContact})[] = [];

  for (let i = 0; i < event.sections.length; i++) {
    contacts = [...contacts, 
      ...event.sections[i].contacts.filter(i => 
        i.accepted !== false && i.recieved === true)];
  }

  for (let i = 0; i < contacts.length; i++) {
    const emailData = getUpdateEmailData(event, event.calls, contacts[i])
    try {
      await axios.post(`${url}/sendGrid`, {body: {
        emailData: {...emailData, updateMessage: updateMessage},
        templateID: "d-49ff83e234f54edead44ec38921181c0",
        emailAddress: contacts[i].contact.email
      }})
    } catch(e) {
      throw Error(e)
    }
  }

}
