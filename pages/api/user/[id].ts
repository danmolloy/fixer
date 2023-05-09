import prisma from "../../../client"

export const findUser = async (userId: string) => {
  return await prisma.user.findUnique({
    where: {
      id: userId
    }
  })
}

export default async function handle(req, res) {

  res.status(200).json(await findUser(req.query.id))
}