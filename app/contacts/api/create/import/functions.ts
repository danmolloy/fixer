import { EnsembleContact } from '@prisma/client';
import prisma from '../../../../../client';

export type CreateContactsProps = {
  contacts: {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    role: string;
    sectionId: string;
    category: string;
  }[];
  ensembleId: string;
};

export const createContacts = async (data: CreateContactsProps) => {
  return await prisma.ensembleContact.createMany({
    data: data.contacts.map((contact) => ({
      firstName: contact.firstName,
      lastName: contact.lastName,
      email: contact.email,
      phoneNumber: contact.phoneNumber,
      role: contact.role,
      category: contact.category,
      ensembleId: data.ensembleId,
      sectionId: contact.sectionId,
    })),
  });
};

