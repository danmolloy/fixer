import prisma from '../../../../../client';

export const createAdminInvite = async (data: {
  firstName: string;
  lastName: string;
  senderName: string;
  email: string;
  ensembleId: string;
  positionTitle: string;
  accessType: string;
}) => {
  if (!data || data === undefined) {
    throw new Error('Failed to create invite: invite data is undefined.');
  }
  try {
    return await prisma.adminInvite.create({
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        senderName: data.senderName,
        email: data.email,
        positionTitle: data.positionTitle,
        accessType: data.accessType,
        ensemble: {
          connect: {
            id: data.ensembleId,
          },
        },
      },
      include: {
        ensemble: true
      }
    });
  } catch (error) {
    throw new Error(`Failed to create invite: ${error.message}`);
  }
};
