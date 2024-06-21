import prisma from "../../../../client";


export type CreateEnsembleContact = {
  firstName: string;
  lastName: string;
  section: {
    name: string
    instrument: string
    id: undefined|string
    option: "create"|"select"
  };
  role: string;
  ensembleId: string;
  email: string;
  phone: string;
  category: string;
}

const createContact = async(args: CreateEnsembleContact) => {
  const sectionData = args.section.id
  ? { connect: { id: args.section.id } }
  : {
      create: {
        name: args.section.name,
        instrument: args.section.instrument,
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

export async function POST(request: Request) {
  const req = await request.json()
  const data = await createContact(req)
  return Response.json(data)
}