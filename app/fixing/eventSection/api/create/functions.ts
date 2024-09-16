import prisma from '../../../../../client';

export const createEventSection = async (sectionObj: {
  eventId: number;
  ensembleSectionId: string;
  bookingStatus: string;
  numToBook: number;
}) => {
  return await prisma.eventSection.create({
    data: {
      bookingStatus: sectionObj.bookingStatus,
      numToBook: sectionObj.numToBook,
      eventId: sectionObj.eventId,
      ensembleSectionId: sectionObj.ensembleSectionId,
    },
  });
};
