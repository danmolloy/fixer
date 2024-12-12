import prisma from '../../../client';

export const deleteEvent = async (eventId: number) => {
  return await prisma.event.delete({
    where: {
      id: eventId,
    },
    include: {
      fixer: true,
      calls: true,
      sections: {
        include: {
          contacts: {
            where: {
              OR: [
                {status: "AUTOBOOKED"},
                {status: "ACCEPTED"},
                {status: "AVAILABLE"},
                {status: "MIXED"},
                {status: "FINDINGDEP"},
                {status: "AWAITINGREPLY"},
              ]
            },
            include: {
              contact: true,
            },
          },
        },
      },
    },
  });
};
