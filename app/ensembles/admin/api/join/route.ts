import prisma from "../../../../../client"

const joinEnsemble = async(data: {accessCode: string, userId: string}) => {
  const adminInvite = await prisma.adminInvite.findUnique({
    where: {
      id: data.accessCode
    }
  })
  if (adminInvite) {
    await prisma.ensembleAdmin.create({
      data: {
        positionTitle: adminInvite.positionTitle,
        accessType: adminInvite.accessType,
        user: {
          connect: {
            id: data.userId
          }
        },
        ensemble: {
          connect: {
            id: adminInvite.ensembleId
          }
        }
      }
    })
    return await prisma.adminInvite.delete({
      where: {
        id: data.accessCode
      }
    })
  } else {
    return {}
  }
}

export async function POST(request: Request) {
  const req = await request.json()
  await joinEnsemble(req)
  return new Response()
}