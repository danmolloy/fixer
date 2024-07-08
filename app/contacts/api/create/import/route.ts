import prisma from "../../../../../client"

export type CreateContactsProps = {
  contacts: {
    "First Name": string
    "Last Name": string
    Email: string
    "Phone Number": string
    Role: string
    Section: string
    Category: string
    sectionId: string|undefined
  }[]
  ensembleId: string
}

export const createContacts = async(data: CreateContactsProps) => {
  
  for (let i = 0; i < data.contacts.length; i ++) {
    await prisma.ensembleContact.create({
      data: {
        firstName: data.contacts[i]["First Name"],
        lastName: data.contacts[i]["Last Name"],
        email: data.contacts[i]["Email"],
        phoneNumber: data.contacts[i]["Phone Number"],
        role: data.contacts[i].Role,
        category: data.contacts[i].Category,
        ensemble: {
          connect: {
            id: data.ensembleId
          }
        },
        section: data.contacts[i].sectionId ? {
          connect: {
            id: data.contacts[i].sectionId
          }
        } : {
          create: {
            name: data.contacts[i].Section,
            instrument: data.contacts[i].Section,
            ensemble: {
              connect: {
                id: data.ensembleId
              }
            }
          }
        }
      }
    })
  }
  return;
}

export async function POST(request: Request) {
  const req = await request.json()
  //console.log(req)
  //return Response.json({hello: "world"})
  const data = await createContacts(req)
  return Response.json({hello: "world"})
}