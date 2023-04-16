import prisma from "../../../client"

const findUsers = async () => {
  const events =  await prisma.event.findMany({})
  return events.map(i => ({params: {id: String(i.id)}}))
}

export default async function handle(req, res) {
  res.status(200).json(await findUsers())
}

export { findUsers };