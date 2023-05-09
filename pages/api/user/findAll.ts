import prisma from "../../../client"

const findUsers = async () => {
  return await prisma.user.findMany({})
}

export default async function handle(req, res) {
  res.status(200).json(await findUsers())
}

export { findUsers };