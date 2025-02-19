import { BookingStatus } from '@prisma/client';
import prisma from '../../../../../client';
import { handleFixing } from '../../../contactMessage/api/create/functions';

export const updateEventSection = async (sectionObj: {
  eventSectionId: number;
  bookingStatus: BookingStatus;
  //numToBook: number;
  orchestration: {
    callId: number;
    numRequired: number;
    id: number;
  }[];
}) => {
  const updatedSection = await prisma.eventSection.update({
    where: {
      id: sectionObj.eventSectionId,
    },
    data: {
      bookingStatus: sectionObj.bookingStatus,
    },
    include: {
      contacts: true,
    },
  });

  const updateOrchestration = await Promise.all(
    sectionObj.orchestration.map(async (i) => {
      await prisma.orchestration.upsert({
        where: {
          id: i.id || -1,
        },
        update: {
          numRequired: Number(i.numRequired),
        },
        create: {
          callId: Number(i.callId),
          eventSectionId: Number(sectionObj.eventSectionId),
          numRequired: Number(i.numRequired),
        },
      });
    })
  );

  if (
    sectionObj.bookingStatus === 'ACTIVE' &&
    updatedSection.contacts.length > 0
  ) {
    await handleFixing(updatedSection.eventId);
  }
  return { updatedSection, updateOrchestration };
};

export const updateAllEventSections = async (eventId: number, data: any) => {
  return await prisma.eventSection.updateMany({
    where: {
      eventId: eventId,
    },
    data: data,
  });
};
