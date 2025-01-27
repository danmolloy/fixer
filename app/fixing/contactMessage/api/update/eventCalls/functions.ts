import prisma from '../../../../../../client';

export const updateContactEventCalls = async (data: {
  calls: {
    connect: { id: number }[];
    disconnect: { id: number }[];
  };
  contactMessageId: number;
}) => {
  try {
    return await prisma.contactMessage.update({
      where: {
        id: data.contactMessageId,
      },
      data: {
        calls: data.calls,
      },
      include: {
        contact: true,
        calls: true,
        eventSection: {
          include: {
            event: true,
            ensembleSection: true,
          },
        },
      },
    });
  } catch (e) {
    throw Error(e);
  }
};
