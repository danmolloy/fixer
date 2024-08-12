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
