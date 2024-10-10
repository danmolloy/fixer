import prisma from '../../../../../client';
import { emailBookingMusicians } from '../create/functions';

export const updateContactMessage = async (contactMessageObj: {
  id: number;
  data: {};
}) => {
  try {
    const updatedData = await prisma.contactMessage.update({
      where: {
        id: contactMessageObj.id,
      },
      data: contactMessageObj.data,
    });
    await emailBookingMusicians(updatedData.eventSectionId)
    return updatedData
  } catch (e) {
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
