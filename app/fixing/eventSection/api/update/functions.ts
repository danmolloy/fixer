import prisma from '../../../../../client';
import { emailBookingMusicians } from '../../../contactMessage/api/create/functions';

export const updateEventSection = async (sectionObj: {
  eventSectionId: number;
  bookingStatus: string;
  numToBook: number;
}) => {

  const updatedSection =  await prisma.eventSection.update({
    where: {
      id: sectionObj.eventSectionId,
    },
    data: {
      bookingStatus: sectionObj.bookingStatus,
      numToBook: sectionObj.numToBook,
    },
  });
  if (sectionObj.bookingStatus.toLocaleLowerCase() === "active") {
      await emailBookingMusicians(updatedSection.id);
    }
  return updatedSection;
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
