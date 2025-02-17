import { BookingStatus } from '@prisma/client';
import prisma from '../../../../../client';

export const createEventSection = async (sectionObj: {
  eventId: number;
  ensembleSectionId: string;
  bookingStatus: BookingStatus;
  orchestration: {
    callId: number;
    numRequired: number;
  }[];
}) => {
  return await prisma.eventSection.create({
    data: {
      bookingStatus: sectionObj.bookingStatus,
      orchestration: {
        create: sectionObj.orchestration.map((i) => ({
          numRequired: Number(i.numRequired),
          callId: Number(i.callId),
        })),
      },
      eventId: sectionObj.eventId,
      ensembleSectionId: sectionObj.ensembleSectionId,
    },
  });
};
