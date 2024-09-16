import prisma from '../../../../../client';

export const updateEnsemble = async (ensembleObj: {
  name: string;
  ensembleId: string;
}) => {
  if (!ensembleObj) {
    throw new Error('Failed to update ensemble: ensemble is undefined');
  }
  try {
    return await prisma.ensemble.update({
      where: {
        id: ensembleObj.ensembleId,
      },
      data: {
        name: ensembleObj.name,
      },
    });
  } catch (error) {
    throw new Error(
      `Failed to update ensemble with ID ${ensembleObj.ensembleId}: ${error.message}`
    );
  }
};
