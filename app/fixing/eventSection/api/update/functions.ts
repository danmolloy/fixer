import prisma from '../../../../../client';

export const updateEventSection = async (sectionObj: {
  eventSectionId: number;
  bookingStatus: string;
  numToBook: number;
}) => {
  return await prisma.eventSection.update({
    where: {
      id: sectionObj.eventSectionId,
    },
    data: {
      bookingStatus: sectionObj.bookingStatus,
      numToBook: sectionObj.numToBook,
    },
  });
};

export const updateAllEventSections = async (
  eventId: number,
  data: any
) => {
  return await prisma.eventSection.updateMany({
    where: {
      eventId: eventId
    },
    data: data,
  });
};
