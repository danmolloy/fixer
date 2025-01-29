import prisma from '../../../../../client';
import { emailDeppingMusician } from '../create/emailFunctions';

export const releaseDeppers = async (eventSectionId: number) => {
  const deppingContacts = await prisma.contactMessage.findMany({
    where: {
      eventSectionId: eventSectionId,
      status: 'FINDINGDEP',
    },
    orderBy: [
      {
        indexNumber: 'asc',
      },
    ],
  });
  if (deppingContacts.length > 0) {
    try {
      const releaseMusician = await prisma.contactMessage.update({
        where: {
          id: deppingContacts[0].id,
        },
        data: {
          status: 'DECLINED',
        },
        include: {
          contact: true,
          calls: true,
          eventSection: {
            include: {
              event: true,
            },
          },
        },
      });
      return await emailDeppingMusician({
        ...releaseMusician,
        ensembleName: releaseMusician.eventSection.event.ensembleName,
        eventId: releaseMusician.eventSection.eventId,
      });
    } catch (e) {
      throw new Error(e);
    }
  }
};
