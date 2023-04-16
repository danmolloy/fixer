import prisma from "../../../client"

const findUser = async (userId: string) => {
  return await prisma.user.findUnique({
    where: {
      id: userId
    }
  })
}

export default async function handle(req, res) {
  const {
    userId
  } = req.body;
  res.status(200).json(await findUser(userId))
}

export { findUser };