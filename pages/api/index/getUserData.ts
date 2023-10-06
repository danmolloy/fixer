import prisma from "../../../client"
import { getServerSession } from "next-auth"
import { authOptions } from '../auth/[...nextauth]'

const getUserData = async (id: string) => {
  const userData = await prisma.user.findUnique({
    where: {
      id: id
    },
    include: {
      events: {
        include: {
          calls: true
        }
      },
      calls: {
        include: {
          event: true
        }
      },
      playerCalls: true
    }
  })


  return userData

}

export default async function handle(req, res) {
  const session = await getServerSession(req, res, authOptions)
  
  res.status(200).json(await getUserData(session.user.id))
}