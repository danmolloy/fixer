import prisma from '../../../../../client';

export const deleteAdmin = async (data: { adminId: string }) => {
  if (!data.adminId || data.adminId.length === 0) {
    throw new Error('Failed to delete admin: adminId is required');
  }
  try {
    return await prisma.ensembleAdmin.delete({
      where: {
        id: data.adminId,
      },
    });
  } catch (error) {
    throw new Error(
      `Failed to delete admin with id ${data.adminId}: ${error.message}`
    );
  }
};
