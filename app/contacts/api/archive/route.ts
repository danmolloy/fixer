import prisma from "../../../../client"

export const archiveContact = async (archiveArg: {id: string}) => {
  if (archiveArg.id === "") {
    return undefined
  }
  return await prisma.ensembleContact.update({
    where: {
      id: archiveArg.id
    },
    data: {
      status: "ARCHIVED",
      phoneNumber: null,
      email: null
    }
  })
}

export async function POST(request: Request) {
  const req = await request.json()
  const data = await archiveContact(req)
  console.log(data)
  return Response.json(data)
}