import prisma from '../../../../../../client';

export const updateContactEventCalls = async (data: {
  calls: {
    connect: { id: number }[];
    disconnect: { id: number }[];
  };
  contactMessageId: number;
}) => {
  return await prisma.contactMessage.update({
    where: {
      id: data.contactMessageId,
    },
    data: {
      calls: data.calls,
    },
  });
};
