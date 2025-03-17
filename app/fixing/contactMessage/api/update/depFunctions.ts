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
      const updatedCalls = await prisma.contactEventCall.updateManyAndReturn({
        where: {
          contactMessageId: deppingContacts[0].id
        },
        data: {
          status: "DECLINED"
        },
        include: {
          call: true
        }
      })
      const releaseMusician = await prisma.contactMessage.update({
        where: {
          id: deppingContacts[0].id,
        },
        data: {
          status: 'RESPONDED',
        },
        include: {
          contact: true,
          eventSection: {
            include: {
              event: true,
            },
          },
        },
      });
      return await emailDeppingMusician({
        ...releaseMusician,
        calls: updatedCalls.map((c) => c.call),
        ensembleName: releaseMusician.eventSection.event.ensembleName,
        eventId: releaseMusician.eventSection.eventId,
      });
    } catch (e) {
      throw new Error(e);
    }
  }
};
