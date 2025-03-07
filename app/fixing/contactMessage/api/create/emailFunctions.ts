import axios from 'axios';
import prisma from '../../../../../client';
import {
  createOfferEmail,
  releaseDepperEmail,
} from '../../../../sendGrid/playerLib';
import { getDateRange, urgentNotification } from './functions';
import {
  Call,
  ContactEventCall,
  ContactMessage,
  EnsembleContact,
  Event,
  User,
} from '@prisma/client';
const url = `${process.env.URL}`;

let addEmailToQueue: any;

/* if (typeof window === 'undefined') {
  addEmailToQueue = async (emailData: any) => {
    const { addEmailToQueue } = require("../../../../../lib/queues/emailQueue");
    await addEmailToQueue.add('sendEmail', { body: emailData });
  };
} */

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
      event: contact.eventSection.event,
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
