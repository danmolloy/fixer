import prisma from "../../../../client";


export type CreateEnsembleContact = {
  firstName: string;
  lastName: string;
  section: {
    name: string
    id: undefined|string
  };
  role: string;
  ensembleId: string;
  email: string;
  phone: string;
  category: string;
}

export const createContact = async(args: CreateEnsembleContact) => {
  const sectionData = args.section.id
  ? { connect: { id: args.section.id } }
  : {
      create: {
        name: args.section.name,
        ensemble: {
          connect: {
            id: args.ensembleId
          }
        },
      },
    };
  return await prisma.ensembleContact.create({
    data: {
      firstName: args.firstName,
      lastName: args.lastName,
      role: args.role,
      email: args.email,
      phoneNumber: args.phone,
      category: args.category,
      ensemble: {
        connect: {
          id: args.ensembleId
        }
      },
      section: sectionData
    }
  })
}
