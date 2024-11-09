import { EnsembleContact } from '@prisma/client';
import prisma from '../../../../../client';

export type CreateContactsProps = {
  contacts: {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    role: string;
    sectionName: string;
    category: string;
    //sectionId: string | undefined;
  }[];
  ensembleId: string;
};

export const createContacts = async (data: CreateContactsProps) => {
  let arr: EnsembleContact[] = [];

  let ensembleSections = await prisma.ensembleSection.findMany({
    where: {
      ensembleId: data.ensembleId,
    },
  });

  for (let i = 0; i < data.contacts.length; i++) {
    const section = ensembleSections.find(
      (j) => j.name == data.contacts[i].sectionName
    );
    const newContact = await prisma.ensembleContact.create({
      data: {
        firstName: data.contacts[i].firstName,
        lastName: data.contacts[i].lastName,
        email: data.contacts[i].email,
        phoneNumber: data.contacts[i].phoneNumber,
        role: data.contacts[i].role,
        category: data.contacts[i].category,
        ensemble: {
          connect: {
            id: data.ensembleId,
          },
        },
        section: section
          ? {
              connect: {
                id: section.id,
              },
            }
          : {
              create: {
                name: data.contacts[i].sectionName,
                ensemble: {
                  connect: {
                    id: data.ensembleId,
                  },
                },
              },
            },
      },
      include: {
        ensemble: {
          include: {
            sections: true,
          },
        },
      },
    });
    ensembleSections = newContact.ensemble.sections;
    arr = [...arr, newContact];
  }
  return arr;
};
