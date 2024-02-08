import prisma from "../../../client"

export const findEnsemble = async (ensembleId: string) => {
  return await prisma.ensemble.findUnique({
    where: {
      id: ensembleId
    },
    include: {
      sections: {
        include: {
          members: {
            include: {
              user: true
            }
          },
          extras: {
            include: {
              user: true
            }
          }
                }
      }
    }
  })
}

export default async function handle(req, res) {
  res.status(200).json(await findEnsemble(req.query.id))
}