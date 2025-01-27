import { EnsembleContact, SectionName } from '@prisma/client';
import prisma from '../../../../../client';

export type UpdateSectionProps = {
  id: string;
  name: SectionName;
  contacts: EnsembleContact[];
};

export const updateContacts = async (contact: EnsembleContact) => {
  if (!contact) {
    throw new Error('Failed to update contact: Contact is undefined');
  }
  try {
    return await prisma.ensembleContact.update({
      where: {
        id: contact.id,
      },
      data: {
        indexNumber: contact.indexNumber,
      },
    });
  } catch (error) {
    throw new Error(
      `Failed to update contact with id ${contact.id}: ${error.message}`
    );
  }
};

export const updateSection = async (data: UpdateSectionProps) => {
  if (!data) {
    throw new Error('Failed to update section: section is undefined');
  }
  try {
    if (data.contacts) {
      for (let i = 0; i < data.contacts.length; i++) {
        //console.log(`Contact ${i}: ${JSON.stringify(data.contacts[i])}`)
        await updateContacts(data.contacts[i]);
      }
    }

    return await prisma.ensembleSection.update({
      where: {
        id: data.id,
      },
      data: {
        name: data.name,
      },
    });
  } catch (error) {
    throw new Error(
      `Failed to update section with ID ${data.id}: ${error.message}`
    );
  }
};
