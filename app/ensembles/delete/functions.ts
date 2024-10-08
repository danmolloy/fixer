import prisma from '../../../client';

export const deleteEnsemble = async (ensembleId: string) => {
  if (!ensembleId || ensembleId === '') {
    throw new Error('Failed to delete ensemble: Ensemble ID is required');
  }
  try {
    return await prisma.ensemble.delete({
      where: {
        id: ensembleId,
      },
    });
  } catch (error) {
    throw new Error(
      `Failed to delete ensemble with id ${ensembleId}: ${error.message}`
    );
  }
};
