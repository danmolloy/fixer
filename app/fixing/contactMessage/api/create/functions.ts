import axios from 'axios';
import prisma from '../../../../../client';
import { EmailData } from '../../../../sendGrid/lib'; 
import { DateTime } from 'luxon';
import { Call, ContactMessage, EnsembleContact, EnsembleSection, Event, EventSection, User } from '@prisma/client';
import crypto from 'crypto';

const url = `${process.env.URL}`


export type createContactMessage = {
  contacts: {
    contactId: string;
    position: string;
    playerMessage?: string;
    calls: string[];
  }[];
  eventSectionId: string;
  bookingOrAvailability: string;
  strictlyTied: string;
};

export const generateToken = () => {
  const token = crypto.randomBytes(32).toString('hex'); 
  console.log(token);

  return token;
};

export const createContactMessages = async (data: createContactMessage) => {
  const currentCalls = await prisma.contactMessage.findMany({
    where: {
      eventSectionId: Number(data.eventSectionId),
    },
    orderBy: {
      indexNumber: 'asc',
    },
  });
  let currentHighest =
    currentCalls.length > 0
      ? currentCalls[currentCalls.length - 1].indexNumber + 1
      : 1;
  for (let i = 0; i < data.contacts.length; i++) {
    await prisma.contactMessage.create({
      data: {
        eventSectionId: Number(data.eventSectionId),
        contactId: data.contacts[i].contactId,
        calls: {
          connect: data.contacts[i].calls.map((j) => ({
            id: Number(j),
          })),
        },
        token: generateToken(),
        //position: data.contacts[i].position,
        playerMessage: data.contacts[i].playerMessage,
        indexNumber: currentHighest,
        bookingOrAvailability: data.bookingOrAvailability,
        strictlyTied: data.strictlyTied === "true",
      },
    });
    currentHighest += 1;
  }
  if (data.bookingOrAvailability.toLocaleLowerCase() === "booking")
  {
    await emailBookingMusicians(Number(data.eventSectionId));

  } else {
    await emailAvailabilityChecks(Number(data.eventSectionId));

  }
  return;
};

export const getDateRange = (calls: Call[]) => {
  const sortedCalls = calls.sort((a, b) =>
    Number(DateTime.fromJSDate(a.startTime).toMillis) -
    Number(DateTime.fromJSDate(b.startTime).toMillis));
  
  const startDate = DateTime.fromJSDate(sortedCalls[0].startTime);
  const endDate = DateTime.fromJSDate(sortedCalls[sortedCalls.length - 1].endTime);

  if (startDate.hasSame(endDate, "day")) {
    return `${startDate.toFormat("dd LLL yyyy")}`;
  } else if (startDate.hasSame(endDate, "month")) {
    return `${startDate.toFormat("dd")}-${endDate.toFormat("dd LLL yyyy")}`;
  } else if (startDate.hasSame(endDate, "year")) {
    return `${startDate.toFormat("dd LLL")}-${endDate.toFormat("dd LLL yyyy")}`;
  } else {
    return `${startDate.toFormat("dd LLL yyyy")}-${endDate.toFormat("dd LLL yyyy")}`;
  }
}

export const gigIsFixed = async (eventID: number) => {
  const event = await prisma.event.findUnique({
    where: {
      id: eventID
    },
    include: {
      fixer: true,
      sections: {
        include: {
          contacts: true
        }
      }
    }
  })

  if (event?.sections.length === undefined) {
    return true;
  }

  for (let i = 0; i < event?.sections.length; i ++) {
    const numToBook = event.sections[i].numToBook;
    const numBooked = event.sections[i].contacts.filter(i => (
      i.accepted === true && i.status.toLocaleLowerCase() !== "dep out")).length;
    if (numToBook - numBooked !== 0) {
      return false;
    }
  }
  console.log("Gig is fixed")
  return true;

}

export const createEmailData = (contact: 
  ContactMessage & 
  {contact: EnsembleContact} & 
  {calls: Call[]} &
  {eventSection: EventSection & 
    {event: Event & {fixer: User}} & {ensembleSection: EnsembleSection}} ): EmailData => {
  
      const emailData = {
        strictlyTied: contact.strictlyTied,
      accepted: contact.accepted,
      firstName: contact.contact.firstName,
      lastName: contact.contact.lastName,
      email: contact.contact.email!,
      phoneNumber: contact.contact.phoneNumber!,
      booking: contact.bookingOrAvailability === "Booking",
      ensembleName: contact.eventSection.event.ensembleName,
      dateRange: getDateRange(contact.calls),
      personalMessage: contact.playerMessage !== null ? contact.playerMessage : undefined,
      sectionMessage: undefined,
      position: contact.position,
      sectionName: contact.eventSection.ensembleSection.name,
      fixerName: `${contact.eventSection.event.fixer.firstName} ${contact.eventSection.event.fixer.lastName}`,
      fixerEmail: contact.eventSection.event.fixer.email!,
      fixerMobile: contact.eventSection.event.fixer.mobileNumber!,
      responseURL: `https://gigfix.co.uk/fixing/response/${contact.token}/`,
      concertProgram: contact.eventSection.event.concertProgram,
      confirmed: contact.eventSection.event.confirmedOrOnHold.toLocaleLowerCase() === "confirmed",
      dressCode: contact.eventSection.event.dressCode,
      fee: contact.eventSection.event.fee,
      additionalInfo: contact.eventSection.event.additionalInfo ? contact.eventSection.event.additionalInfo : undefined,
      calls: contact.calls.map(i => ({
        date: DateTime.fromJSDate(i.startTime).toFormat('ccc LL LLL y'),
        startTime: DateTime.fromJSDate(i.startTime).toFormat('hh:mm a'),
        endTime: DateTime.fromJSDate(i.endTime).toFormat('hh:mm a'),
        venue: i.venue
      }))
    }

    return emailData;
}


export const emailBookingMusicians = async (eventSectionId: number) => {
  const contactMessages = await prisma.contactMessage.findMany({
    where: {
      eventSectionId: eventSectionId,
      bookingOrAvailability: "Booking",
    },
    include: {
      eventSection: {
        include: {
          event: {
            include: {
              fixer: true,
              calls: true
            }
          },
          ensembleSection: true
        }
      },
      contact: true,
      calls: true,
    },
    orderBy: [{
      indexNumber: 'asc',
    }]
  });

  if (contactMessages.length === 0) {

    return;
  }

  const eventID = contactMessages[0].eventSection.eventId
  if (await gigIsFixed(eventID)) {
    try {
      return await axios.post(`${url}/sendGrid`, {
        body: {
          emailData: {
            firstName: contactMessages[0].eventSection.event.fixer.firstName,
            dateRange: getDateRange(contactMessages[0].eventSection.event.calls),
            ensembleName: contactMessages[0].eventSection.event.ensembleName
          },
          templateID: "d-1604c09cec2e461c9b519c6de4b34e08",
          emailAddress: contactMessages[0].eventSection.event.fixer.email
        }
      });

    } catch(e) {
      throw new Error(e)
    }
   
  } 

  const numToBook = contactMessages[0].eventSection.numToBook;
  const numBooked = contactMessages.filter(i => i.accepted === true).length;
  const numYetToRespond = contactMessages.filter(i => i.accepted === null && i.recieved === true).length;
  const toDepCount = contactMessages.filter(i => i.status.toLocaleLowerCase() === "dep out").length;
  console.log(`${toDepCount} player(s) looking for a dep`);
  const numToContact = numToBook - numBooked - numYetToRespond + toDepCount;
  console.log(`${numToContact} player(s) to contact.`);

  const notContacted = contactMessages.filter(i => i.recieved === false && i.accepted === null);

  if (numToBook > numBooked && numYetToRespond === 0) {
    try {
      return await axios.post(`${url}/sendGrid`, {
        body: {
          emailData: {
            instrumentName: contactMessages[0].eventSection.ensembleSection.name,
            firstName: contactMessages[0].eventSection.event.fixer.firstName,
            dateRange: getDateRange(contactMessages[0].eventSection.event.calls),
            ensembleName: contactMessages[0].eventSection.event.ensembleName,
            numToBook: numToBook,
            numBooked: numBooked
          },
          templateID: "d-1604c09cec2e461c9b519c6de4b34e08",
          emailAddress: contactMessages[0].eventSection.event.fixer.email
        }
      });

    } catch(e) {
      throw new Error(e)
    }

  }
  if (numToContact === 0) {
    return [];
  }

  for (let i = 0; i < numToContact; i++) {   
    
    const contact = notContacted[i];
    if (contact.contact.email === null) {
      console.log(`No email for contactID: ${contact.contact.id}`)
      break;
    }
    if (contact.contact.phoneNumber === null) {
      console.log(`No phone number for contactID: ${contact.contact.id}`)
      break;
    }
    const emailData = createEmailData(contact)
    console.log("About to post")
    try {
      await axios.post(`${url}/sendGrid`, {body: {
        emailData: emailData,
        templateID: "d-f23e2cc89b50474b95ed0839995510c1",
        emailAddress: contact.contact.email
      }})
      await prisma.contactMessage.update({
        where: {
          id: contact.id
        },
        data: {
          recieved: true
        }
      })
    } catch (e) {
      throw Error;
    }
    
  }

  return;
}

export const emailAvailabilityChecks = async (eventSectionId: number) => {
  const availabilityChecks = await prisma.contactMessage.findMany({
    where: {
      eventSectionId: eventSectionId,
      bookingOrAvailability: "Availability",
      recieved: false
    },
    include: {
      eventSection: {
        include: {
          event: {
            include: {
              fixer: true
            }
          },
          ensembleSection: true
        }
      },
      contact: true,
      calls: true
    },
    orderBy: [{
      indexNumber: 'asc',
    }]
  });

  console.log(JSON.stringify(availabilityChecks));



  if (availabilityChecks.length === 0) {
    return [];
  }

  for (let i = 0; i < availabilityChecks.length; i++) {   
    
    const contact = availabilityChecks[i];
    if (contact.contact.email === null) {
      console.log(`No email for contactID: ${contact.contact.id}`)
      break;
    }
    if (contact.contact.phoneNumber === null) {
      console.log(`No phone number for contactID: ${contact.contact.id}`)
      break;
    }
    const emailData = createEmailData(contact)
    try {
      await axios.post(`${url}/sendGrid`, {body: {
        emailData: emailData,
        templateID: "d-f23e2cc89b50474b95ed0839995510c1",
        emailAddress: contact.contact.email
      }})
      await prisma.contactMessage.update({
        where: {
          id: contact.id
        },
        data: {
          recieved: true
        }
      })
    } catch (e) {
      throw Error;
    }
  }

  return;
}

export const emailDeppingMusician = async(contactMessage: ContactMessage & {contact: EnsembleContact}) => {
  console.log("emailDeppingMusician")
  try {
    await axios.post(`${url}/sendGrid`, {body: {
      emailData: contactMessage,
      templateID: "",
      emailAddress: contactMessage.contact.email
    }})
    
  } catch (e) {
    throw Error;
  }
}
