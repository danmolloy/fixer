import { ContactEventCallStatus, ContactMessageStatus } from '@prisma/client';
import prisma from '../../../../../client';
import { addMeterEvent } from '../../../../billing/api/meterEvent/lib';
import { releaseDeppers } from './depFunctions';
import { emailNotRequired } from '../../../../sendGrid/playerLib';
import axios from 'axios';

export const updateManyContactMessage = async (args: {
  contactIDs: number[];
  data: { status: ContactMessageStatus };
}) => {
  try {
    const updatedData = await prisma.contactMessage.updateManyAndReturn({
      where: {
        id: {
          in: args.contactIDs,
        },
      },
      data: args.data,
    });

    if (args.data.status === 'CANCELLED') {
      const contactMessages = await prisma.contactMessage.findMany({
        where: {
          id: {
            in: args.contactIDs,
          },
        },
        include: {
          eventCalls: {
            include: {
              call: true,
            },
          },
          contact: true,
          eventSection: {
            include: {
              event: {
                include: {
                  fixer: true,
                },
              },
            },
          },
        },
      });

      for (const contactMessage of contactMessages) {
        const emailData = await emailNotRequired({
          ...contactMessage,
          calls: contactMessage.eventCalls.map((c) => c.call),
        });
        await axios.post(`${process.env.URL}/sendGrid`, {
          body: {
            emailData: emailData,
            templateID: emailData.templateID,
            emailAddress: emailData.email,
          },
        });
      }
    }
    return updatedData;
  } catch (e) {
    console.log(e);
    throw new Error(e);
  }
};

export const updateContactMessage = async (contactMessageObj: {
  id: number;
  data: any;
  eventCalls?: {
    status: ContactEventCallStatus;
    callId: number;
  }[];
}) => {
  try {
    const updatedData = await prisma.contactMessage.update({
      where: {
        id: contactMessageObj.id,
      },
      data: contactMessageObj.data,
      include: {
        contact: true,
        eventSection: {
          include: {
            event: {
              include: {
                fixer: true,
                ensemble: true,
              },
            },
          },
        },
      },
    });
    if (contactMessageObj.eventCalls) {
      for (let j = 0; j < contactMessageObj.eventCalls.length; j++) {
        await prisma.contactEventCall.updateMany({
          where: {
            callId: contactMessageObj.eventCalls[j].callId,
            contactMessageId: contactMessageObj.id,
          },
          data: {
            status: contactMessageObj.eventCalls[j].status,
          },
        });
      }
    }

    if (
      contactMessageObj.data.status === 'AUTOBOOKED' ||
      (contactMessageObj.data.status === 'ACCEPTED' && contactMessageObj.data)
    ) {
      const subscriptionID =
        updatedData.eventSection.event.ensemble.stripeSubscriptionId;
      await addMeterEvent(subscriptionID!);
      await releaseDeppers(updatedData.eventSectionId);
    }
    return updatedData;
  } catch (e) {
    console.log(e);
    throw new Error(e);
  }
};

export const updateContactIndex = async (data: {
  eventSectionId: number;
  movingUp: boolean;
  contactMessageId: number;
}) => {
  const currentContacts = await prisma.contactMessage.findMany({
    where: {
      eventSectionId: data.eventSectionId,
    },
    orderBy: {
      indexNumber: 'asc',
    },
  });
  const contactToReplaceIndexNum = data.movingUp
    ? currentContacts.map((i) => i.id).indexOf(data.contactMessageId - 1)
    : currentContacts.map((i) => i.id).indexOf(data.contactMessageId - 1);
  await prisma.contactMessage.update({
    where: {
      id: data.contactMessageId,
    },
    data: {
      indexNumber: currentContacts[contactToReplaceIndexNum].indexNumber,
    },
  });
  await prisma.contactMessage.update({
    where: {
      id: currentContacts[contactToReplaceIndexNum].id,
    },
    data: {
      indexNumber: data.movingUp
        ? currentContacts[contactToReplaceIndexNum + 1].indexNumber
        : currentContacts[contactToReplaceIndexNum - 1].indexNumber,
    },
  });
};
