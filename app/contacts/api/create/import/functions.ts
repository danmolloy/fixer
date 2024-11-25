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

  const batchSize = 10; // Adjust batch size based on your database limits

const throttlePromises = async (promises, batchSize) => {
  const results: any = [];
  for (let i = 0; i < promises.length; i += batchSize) {
    const batch = promises.slice(i, i + batchSize);
    results.push(...(await Promise.all(batch)));
  }
  return results;
};

  
const contactCreationPromises = data.contacts.map(async (contact) => {
  const section = ensembleSections.find((section) => section.name === contact.sectionName);
  const newContact = await prisma.ensembleContact.create({
    data: {
      firstName: contact.firstName,
      lastName: contact.lastName,
      email: contact.email,
      phoneNumber: contact.phoneNumber,
      role: contact.role,
      category: contact.category,
      ensemble: { connect: { id: data.ensembleId } },
      section: section
        ? { connect: { id: section.id } }
        : {
            create: {
              name: contact.sectionName,
              ensemble: { connect: { id: data.ensembleId } },
            },
          },
    },
    include: {
      ensemble: { include: { sections: true } },
    },
  });

  if (!section) {
    ensembleSections = newContact.ensemble.sections;
  }

  return newContact;
});

const createdContacts = await throttlePromises(contactCreationPromises, batchSize);
return createdContacts;
};
