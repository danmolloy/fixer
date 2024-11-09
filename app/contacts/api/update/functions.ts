import prisma from '../../../../client';

export const updateContact = async (data: {
  contactId: string;
  updatedData: {
    firstName: string;
    lastName: string;
    section: {
      name: string;
      id: string | undefined;
    };
    role: string;
    ensembleId: string;
    email: string;
    phone: string;
    category: string;
  };
}) => {
  const sectionData = data.updatedData.section.id
    ? { connect: { id: data.updatedData.section.id } }
    : {
        create: {
          name: data.updatedData.section.name,
          ensemble: {
            connect: {
              id: data.updatedData.ensembleId,
            },
          },
        },
      };

  return await prisma.ensembleContact.update({
    where: {
      id: data.contactId,
    },
    data: {
      firstName: data.updatedData.firstName,
      lastName: data.updatedData.lastName,
      category: data.updatedData.category,
      role: data.updatedData.role,
      email: data.updatedData.email,
      phoneNumber: data.updatedData.phone,
      section: sectionData,
    },
  });
};
