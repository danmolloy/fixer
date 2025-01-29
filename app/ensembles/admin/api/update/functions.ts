import { AccessType } from '@prisma/client';
import prisma from '../../../../../client';

export const updateAdmin = async (data: {
  adminId: string;
  positionTitle: string;
  accessType: AccessType;
}) => {
  if (!data) {
    throw new Error('Failed to update ensemble admin: data is undefined');
  }
  try {
    return await prisma.ensembleAdmin.update({
      where: {
        id: data.adminId,
      },
      data: {
        positionTitle: data.positionTitle,
        accessType: data.accessType,
      },
    });
  } catch (error) {
    throw new Error(`Failed to update ensemble admin: ${error.message}`);
  }
};
