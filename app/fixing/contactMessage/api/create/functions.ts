import prisma from '../../../../../client';

export type createContactMessage = {
  contacts: {
    contactId: string;
    position: string;
    playerMessage?: string;
    calls: string[];
  }[];
  eventSectionId: string;
  bookingOrAvailability: string;
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
        //position: data.contacts[i].position,
        playerMessage: data.contacts[i].playerMessage,
        indexNumber: currentHighest,
        bookingOrAvailability: data.bookingOrAvailability,
      },
    });
    currentHighest += 1;
  }
  return;
};
