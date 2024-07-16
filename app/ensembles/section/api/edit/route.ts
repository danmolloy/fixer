import { EnsembleContact } from "@prisma/client"
import prisma from "../../../../../client"

export type UpdateSectionProps = {
  id: string 
  name: string
  contacts: EnsembleContact[]
}

const updateContacts = async (contact: EnsembleContact) => {
  return await prisma.ensembleContact.update({
    where: {
      id: contact.id
    },
    data: {
      indexNumber: contact.indexNumber
    }
  })
}

const updateSection = async (data: UpdateSectionProps) => {
  for (let i = 0; i < data.contacts.length; i++) {
    await updateContacts(data.contacts[i])
  }

  return await prisma.ensembleSection.update({
    where: {
      id: data.id
    },
    data: {
      name: data.name,
    }
  })
}

export async function POST(req: Request) {
  const data = await req.json()
  return Response.json(await updateSection(data))
}