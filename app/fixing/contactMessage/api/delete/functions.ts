import prisma from '../../../../../client';

export const deleteContactMessage = async (contactMessageId: number) => {
  const data = await prisma.contactMessage.delete({
    where: {
      id: contactMessageId,
    },
  });
  return data;
};
