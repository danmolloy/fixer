import axios from 'axios';
import prisma from '../../../../../client';
import {
  createOfferEmail,
  releaseDepperEmail,
} from '../../../../sendGrid/playerLib';
import { callsNotFixed, getDateRange, gigIsFixed } from './functions';
import { Call, ContactMessage, EnsembleContact } from '@prisma/client';
import {
  bookingCompleteEmail,
  listExhaustedEmail,
} from '../../../../sendGrid/adminEmailLib';
const url = `${process.env.URL}`;

const getContactMessages = async (eventSectionId: number) => {
  return await prisma.contactMessage.findMany({
    where: {
      eventSectionId: eventSectionId,
      OR: [{ type: 'AUTOBOOK' }, { type: 'BOOKING' }],
    },
    include: {
      eventCalls: {
        include: {
          call: true,
        },
      },
      eventSection: {
        include: {
          orchestration: {
            include: {
              bookedPlayers: true,
            },
          },
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
    },
    orderBy: [
      {
        indexNumber: 'asc',
      },
    ],
  });
};
export const emailBookingMusicians = async (eventSectionId: number) => {
  let contactMessages = await getContactMessages(eventSectionId);

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

  for (
    let i = 0;
    i < contactMessages.filter((i) => i.status === 'NOTCONTACTED').length;
    i++
  ) {
    let notContacted = contactMessages.filter(
      (i) => i.status === 'NOTCONTACTED'
    );

    let notFixedCalls = contactMessages[0].eventSection.orchestration
      .filter((i) => i.numRequired > i.bookedPlayers.length)
      .map((c) => c.callId);

    // stop function if all calls are fixed
    if (notFixedCalls.length === 0) {
      return;
    }
    // contact whoever I can currently
    const callsToOfferNotFixed = notContacted[i].eventCalls.filter((c) =>
      notFixedCalls.includes(c.callId)
    );
    const callsNotFixed = contactMessages[0].eventSection.orchestration
      .filter(
        (i) =>
          i.numRequired >
          i.bookedPlayers.length +
            contactMessages.filter(
              (j) =>
                j.status === 'AWAITINGREPLY' &&
                j.eventCalls.map((c) => c.callId).includes(i.callId)
            ).length
      )
      .map((c) => c.callId);

    if (callsToOfferNotFixed.length === callsNotFixed.length) {
      const callsToOffer = await prisma.contactEventCall.updateManyAndReturn({
        where: {
          id: {
            in: callsToOfferNotFixed.map((c) => c.id),
          },
        },
        data: {
          status: 'OFFERING',
        },
        include: {
          call: true,
        },
      });
      await prisma.contactMessage.update({
        where: {
          id: notContacted[i].id,
        },
        data: {
          status: 'AWAITINGREPLY',
        },
      });
      await createOfferEmail({
        ...notContacted[i],
        calls: callsToOffer.map((c) => c.call),
      });

      contactMessages = await getContactMessages(eventSectionId);
    }
  }

  if (
    callsNotFixed.length > 0 &&
    contactMessages.filter((c) => c.status === 'NOTCONTACTED').length === 0
  ) {
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

  /* 
  for (let i = 0; i < numEmails; i++) {
    const callsNotFixed = callsToFix({contactMessages: contactMessages, orchestration: contactMessages[0].eventSection.orchestration});
    
    const contact = notContacted[i];

    const callsToOffer = contact.calls.filter(j => callsNotFixed.includes(j.id))

    const contactWithCalls = {...contact, calls: callsToOffer};

    if (callsToOffer.length < 1) {
      break;
    }

    const sentEmailData = await createOfferEmail(contactWithCalls);

    if (
      contactWithCalls.contact.email === null &&
      process.env.TWILIO_ACTIVE === 'true'
    ) {
      break;
    }
    if (
      contactWithCalls.contact.phoneNumber === null &&
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
          id: contactWithCalls.id,
        },
        data: {
          emailStatus: null,
          status: 'AWAITINGREPLY',
        },
      });
      if (contactWithCalls.urgent === true) {
        await axios.post(`${url}/twilio`, {
          body: {
            phoneNumber: contactWithCalls.contact.phoneNumber,
            message: `Hi ${contactWithCalls.contact.firstName}, we have just sent you an urgent email on behalf of ${contact.eventSection.event.fixer.firstName} ${contact.eventSection.event.fixer.lastName} (${contact.eventSection.event.ensembleName}). GigFix`,
          },
        });
      }
    } catch (e) {
      //console.log(`Is this the error? ${e}`)
      throw new Error(e);
    }
  } */

  return;
};

export const emailAvailabilityChecks = async (eventSectionId: number) => {
  const availabilityChecks = await prisma.contactMessage.findMany({
    where: {
      eventSectionId: eventSectionId,
      type: 'AVAILABILITY',
      status: 'NOTCONTACTED',
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
      //calls: true,
      eventCalls: {
        include: {
          call: true,
        },
      },
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
    const sentEmailData = await createOfferEmail({
      ...contact,
      calls: contact.eventCalls.map((c) => c.call),
    });

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
          status: 'AWAITINGREPLY',
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
  const emailData = await releaseDepperEmail({
    firstName: contactMessage.contact.firstName,
    email: contactMessage.contact.email!,
    dateRange: getDateRange(contactMessage.calls),
    ensemble: contactMessage.ensembleName,
    eventId: contactMessage.eventId,
    contactMessageID: contactMessage.id,
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
