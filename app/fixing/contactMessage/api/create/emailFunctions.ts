import axios from 'axios';
import prisma from '../../../../../client';
import {
  bookingCompleteEmail,
  createOfferEmail,
  listExhaustedEmail,
  releaseDepperEmail,
} from '../../../../sendGrid/lib';
import { getDateRange, getNumToContact, gigIsFixed } from './functions';
import { Call, ContactMessage, EnsembleContact } from '@prisma/client';
const url = `${process.env.URL}`;

export const emailBookingMusicians = async (eventSectionId: number) => {
  const contactMessages = await prisma.contactMessage.findMany({
    where: {
      eventSectionId: eventSectionId,
      bookingOrAvailability: 'Booking',
    },
    include: {
      eventSection: {
        include: {
          event: {
            include: {
              fixer: true,
              calls: true,
            },
          },
          ensembleSection: true,
        },
      },
      contact: true,
      calls: true,
    },
    orderBy: [
      {
        indexNumber: 'asc',
      },
    ],
  });

  if (contactMessages.length === 0) {
    return;
  }

  const eventID = contactMessages[0].eventSection.eventId;
  if (await gigIsFixed(eventID)) {
    try {
      // Let fixer know it's done.
      const bookingComplete = await bookingCompleteEmail({
        dateRange: getDateRange(contactMessages[0].eventSection.event.calls),
        fixerFirstName: contactMessages[0].eventSection.event.fixer.firstName!,
        email: contactMessages[0].eventSection.event.fixer.email!,
        ensemble: contactMessages[0].eventSection.event.ensembleName,
      });
      return await axios.post(`${url}/sendGrid`, {
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
  }

  const numToContact = getNumToContact({
    contactMessages: contactMessages,
    numToBook: contactMessages[0].eventSection.numToBook,
  });
  const notContacted = contactMessages.filter(
    (i) => i.received === false && i.accepted === null
  );

  if (numToContact === 0) {
    return [];
  }

  if (numToContact > notContacted.length) {
    // Let fixer know they need to add to list
    const emailAlert = await listExhaustedEmail({
      dateRange: getDateRange(contactMessages[0].eventSection.event.calls),
      fixerFirstName: contactMessages[0].eventSection.event.fixer.firstName!,
      email: contactMessages[0].eventSection.event.fixer.email!,
      ensemble: contactMessages[0].eventSection.event.ensembleName,
      instrument: contactMessages[0].eventSection.ensembleSection.name,
    });
    try {
      await axios.post(`${url}/sendGrid`, {
        body: {
          emailData: emailAlert,
          templateID: emailAlert.templateID,
          emailAddress: emailAlert.email,
        },
      });
    } catch (e) {
      throw new Error(e);
    }
  }

  const numEmails: number =
    numToContact < notContacted.length ? numToContact : notContacted.length;

  for (let i = 0; i < numEmails; i++) {
    const contact = notContacted[i];
    const sentEmailData = await createOfferEmail(contact);

    if (
      contact.contact.email === null &&
      process.env.TWILIO_ACTIVE === 'true'
    ) {
      break;
    }
    if (
      contact.contact.phoneNumber === null &&
      process.env.TWILIO_ACTIVE === 'true'
    ) {
      break;
    }
    try {
      await axios.post(`${url}/sendGrid`, {
        body: {
          emailData: sentEmailData,
          templateID: sentEmailData.templateID,
          emailAddress: sentEmailData.email,
        },
      });
      await prisma.contactMessage.update({
        where: {
          id: contact.id,
        },
        data: {
          received: true,
        },
      });
      if (contact.urgent === true) {
        await axios.post(`/twilio`, {
          phoneNumber: contact.contact.phoneNumber,
          message: `Hi ${contact.contact.firstName}, we have just sent you an urgent email on behalf of ${contact.eventSection.event.fixer.firstName} ${contact.eventSection.event.fixer.lastName} (${contact.eventSection.event.ensembleName}). GigFix`,
        });
      }
    } catch (e) {
      //console.log(`Is this the error? ${e}`)
      throw new Error(e);
    }
  }

  return;
};

export const emailAvailabilityChecks = async (eventSectionId: number) => {
  const availabilityChecks = await prisma.contactMessage.findMany({
    where: {
      eventSectionId: eventSectionId,
      bookingOrAvailability: 'Availability',
      received: false,
    },
    include: {
      eventSection: {
        include: {
          event: {
            include: {
              fixer: true,
            },
          },
          ensembleSection: true,
        },
      },
      contact: true,
      calls: true,
    },
    orderBy: [
      {
        indexNumber: 'asc',
      },
    ],
  });

  if (availabilityChecks.length === 0) {
    return [];
  }

  for (let i = 0; i < availabilityChecks.length; i++) {
    const contact = availabilityChecks[i];
    const sentEmailData = await createOfferEmail(contact);

    if (
      contact.contact.email === null &&
      process.env.TWILIO_ACTIVE === 'true'
    ) {
      //console.log(`No email for contactID: ${contact.contact.id}`)
      break;
    }
    if (
      contact.contact.phoneNumber === null &&
      process.env.TWILIO_ACTIVE === 'true'
    ) {
      //console.log(`No phone number for contactID: ${contact.contact.id}`)
      break;
    }
    try {
      await axios
        .post(`${url}/sendGrid`, {
          body: {
            emailData: sentEmailData, // emailData,
            templateID: sentEmailData.templateID, //"d-f23e2cc89b50474b95ed0839995510c1",
            emailAddress: sentEmailData.email, //contact.contact.email
          },
        })
        .then(async () => {
          if (contact.urgent === true) {
            //console.log("if urgent")
            await axios.post(`${url}/twilio`, {
              body: {
                phoneNumber: contact.contact.phoneNumber,
                message: `Hi ${contact.contact.firstName}, we have just sent you an urgent email on behalf of ${contact.eventSection.event.fixer.firstName} ${contact.eventSection.event.fixer.lastName} (${contact.eventSection.event.ensembleName}). GigFix`,
              },
            });
          }
        });
      await prisma.contactMessage.update({
        where: {
          id: contact.id,
        },
        data: {
          received: true,
        },
      });
    } catch (e) {
      console.log(e);
      throw new Error(e);
    }
  }

  return;
};

export const emailDeppingMusician = async (
  contactMessage: ContactMessage & {
    contact: EnsembleContact;
    calls: Call[];
    ensembleName: string;
    eventId: number;
  }
) => {
  //console.log("emailDeppingMusician")
  const emailData = await releaseDepperEmail({
    firstName: contactMessage.contact.firstName,
    email: contactMessage.contact.email!,
    dateRange: getDateRange(contactMessage.calls),
    ensemble: contactMessage.ensembleName,
    eventId: contactMessage.eventId,
  });
  try {
    await axios.post(`${url}/sendGrid`, {
      body: {
        emailData: emailData,
        templateID: emailData.templateID,
        emailAddress: emailData.email,
      },
    });
  } catch (e) {
    throw Error;
  }
};
