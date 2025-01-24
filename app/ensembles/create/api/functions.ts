import { SectionName } from '@prisma/client';
import prisma from '../../../../client';

export const sectionNamesArr: SectionName[] = [
  "FLUTE",
  "OBOE",
  "CLARINET",
  "BASSOON",
  "HORN",
  "TRUMPET",
  "TROMBONE",
  "TUBA",
  "TIMPANI",
  "PERCUSSION",
  "ORGAN",
  "PIANO",
  "VIOLIN1",
  "VIOLIN2",
  "VIOLA",
  "CELLO",
  "DOUBLEBASS"
]

export const createEnsemble = async (ensembleObj: {
  name: string;
  userId: string;
  ensembleNames: string[];
}) => {
  if (!ensembleObj) {
    throw new Error('Failed to create ensemble: data not defined.');
  }
  try {
    return await prisma.ensemble.create({
      data: {
        name: ensembleObj.name,
        ensembleNames: ensembleObj.ensembleNames,
        sections: {
          create: sectionNamesArr.map(i => ({
            name: i
          }))
        },
        admin: {
          create: {
            positionTitle: 'Manager',
            user: {
              connect: {
                id: ensembleObj.userId,
              },
            },
          },
        },
      },
    });
  } catch (error) {
    throw new Error(`Failed to create ensemble: ${error.message}`);
  }
};
