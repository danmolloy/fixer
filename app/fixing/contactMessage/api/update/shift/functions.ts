import prisma from '../../../../../../client';

export const updateContactIndex = async (data: {
  eventSectionId: number;
  movingUp: boolean;
  contactMessageId: number;
}) => {
  try {
    const currentCalls = await prisma.contactMessage.findMany({
      where: {
        eventSectionId: data.eventSectionId,
      },
      orderBy: {
        indexNumber: 'asc',
      },
    });
    const movingCallIndex = currentCalls
      .map((i) => i.id)
      .indexOf(data.contactMessageId);

    const [contactX, contactY] = await prisma.$transaction([
      prisma.contactMessage.update({
        where: {
          id: data.contactMessageId,
        },
        data: {
          indexNumber: data.movingUp
            ? currentCalls[movingCallIndex - 1].indexNumber
            : currentCalls[movingCallIndex + 1].indexNumber,
        },
      }),
      prisma.contactMessage.update({
        where: {
          id: data.movingUp
            ? currentCalls[movingCallIndex - 1].id
            : currentCalls[movingCallIndex + 1].id,
        },
        data: {
          indexNumber: currentCalls[movingCallIndex].indexNumber,
        },
      }),
    ]);

    return { data: [contactX, contactY] };
  } catch (e) {
    throw new Error(`Failed to update contact index: ${e.message}`);
  }
};
