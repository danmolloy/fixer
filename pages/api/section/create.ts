import prisma from "../../../client"

export type CreateSectionArg = {
  name: string
  ensembleId: string
  extras: {
    userId: string
    positionTitle: string
    positionNumber: string
  }[]
  members: {
    userId: string
    positionTitle: string
    positionNumber: string
  }[]
}

export const createSection = async (obj: CreateSectionArg) => {
  return await prisma.ensembleSection.create({
    data: {
      ...obj,
      extras: {
        create: obj.extras.map(i => ({...i, ensembleId: obj.ensembleId}))
      },
      members: {
        create: obj.members.map(i => ({...i, ensembleId: obj.ensembleId}))
      }
    }
  })
}

export default async function handle(req, res) {
  res.status(200).json(await createSection(req.body))
}