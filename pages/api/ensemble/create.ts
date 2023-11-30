import { Prisma } from "@prisma/client"
import prisma from "../../../client"

export type EnsembleWithAdmin = Prisma.EnsembleGetPayload<{
  include: {
    admin: true
  }
}>

export const createEnsembleAndAdmin = async (obj: {
  ensembleName: string, 
  userId: string, 
  userPositionTitle: string
}) => {
  
  return await prisma.ensemble.create({
    data: {
      name: obj.ensembleName,
      admin: {
        create: {
          userId: obj.userId,
          positionTitle: obj.userPositionTitle
        }
      }
    },
  })
}


export default async function handle(req, res) {
  res.status(200).json(await createEnsembleAndAdmin(req.body))
}
