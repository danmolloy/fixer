import { BookingStatus } from '@prisma/client';
import prisma from '../../../../../client';
import { emailBookingMusicians } from '../../../contactMessage/api/create/emailFunctions';

export const updateEventSection = async (sectionObj: {
  eventSectionId: number;
  bookingStatus: BookingStatus;
  numToBook: number;
}) => {
  const updatedSection = await prisma.eventSection.update({
    where: {
      id: sectionObj.eventSectionId,
    },
    data: {
      bookingStatus: sectionObj.bookingStatus,
      numToBook: sectionObj.numToBook,
    },
    include: {
      contacts: true,
    },
  });
  if (
    sectionObj.bookingStatus === 'ACTIVE' &&
    updatedSection.contacts.length > 0
  ) {
    await emailBookingMusicians(updatedSection.id);
  }
  return updatedSection;
};

export const updateAllEventSections = async (eventId: number, data: any) => {
  return await prisma.eventSection.updateMany({
    where: {
      eventId: eventId,
    },
    data: data,
  });
};
