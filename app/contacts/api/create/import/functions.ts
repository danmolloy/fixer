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

  let ensembleSections = await prisma.ensembleSection.findMany({
    where: {
      ensembleId: data.ensembleId,
    },
  });

  // Map the contact creation process
  const contactCreationPromises = data.contacts.map(async (contact) => {
    // Find section or prepare to create a new one
    const section = ensembleSections.find(
      (section) => section.name === contact.sectionName
    );

    // Create a contact with either a connected section or a new one
    const newContact = await prisma.ensembleContact.create({
      data: {
        firstName: contact.firstName,
        lastName: contact.lastName,
        email: contact.email,
        phoneNumber: contact.phoneNumber,
        role: contact.role,
        category: contact.category,
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
                name: contact.sectionName,
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

    // Update sections if a new section was created
    if (!section) {
      ensembleSections = newContact.ensemble.sections;
    }

    return newContact;
  });

  // Wait for all contacts to be created
  const createdContacts = await Promise.all(contactCreationPromises);
  return createdContacts;
};
