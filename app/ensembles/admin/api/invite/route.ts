import prisma from "../../../../../client"

const createAdminInvite = async (data: {
  firstName: string, 
  lastName: string, 
  email: string, 
  ensembleId: string
  positionTitle: string,
  accessType: string
}) => {
  return await prisma.adminInvite.create({
    data: {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      positionTitle: data.positionTitle,
      accessType: data.accessType,
      ensemble: {
        connect: {
          id: data.ensembleId
        }
      }
    }
  })
}

export async function POST(request: Request) {
  const req = await request.json()
  await createAdminInvite(req)
  return new Response()
}