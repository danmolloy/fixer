import prisma from '../../../../../client';
import { addMeterEvent } from '../../../../billing/api/meterEvent/lib';
import {
  emailBookingMusicians,
} from '../create/emailFunctions';
import { releaseDeppers } from './depFunctions';

export const updateContactMessage = async (contactMessageObj: {
  id: number;
  data: any;
}) => {
  try {
    const updatedData = await prisma.contactMessage.update({
      where: {
        id: contactMessageObj.id,
      },
      data: contactMessageObj.data,
      include: {
        calls: true,
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
    

    if (
      updatedData.bookingOrAvailability.toLocaleLowerCase() === 'booking' &&
      contactMessageObj.data.accepted === true
    ) {
      const subscriptionID =
        updatedData.eventSection.event.ensemble.stripeSubscriptionId;
      await addMeterEvent(subscriptionID!);
      await releaseDeppers(updatedData.eventSectionId);
    }
    await emailBookingMusicians(updatedData.eventSectionId);
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
