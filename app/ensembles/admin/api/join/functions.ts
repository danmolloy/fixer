import prisma from "../../../../../client"

export const joinEnsemble = async(data: {accessCode: string, userId: string}) => {
  if (!data) {
    throw new Error("Failed to join ensemble: data is undefined.")
  }

  try {


  const adminInvite = await prisma.adminInvite.findUnique({
    where: {
      id: data.accessCode
    }
  })
  if (adminInvite === null) {
    throw new Error("Invalid access code.")
  }

    await prisma.ensembleAdmin.create({
      data: {
        positionTitle: adminInvite!.positionTitle,
        accessType: adminInvite!.accessType,
        user: {
          connect: {
            id: data.userId
          }
        },
        ensemble: {
          connect: {
            id: adminInvite!.ensembleId
          }
        }
      }
    })
    return await prisma.adminInvite.delete({
      where: {
        id: data.accessCode
      }
    })
  
} catch(error) {
  throw new Error(`Failed to join ensemble: ${error.message}`)
}
  
}
