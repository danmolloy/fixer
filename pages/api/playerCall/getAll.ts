import { getServerSession } from "next-auth"
import prisma from "../../../client"
import { PlayerCallNotification } from "../../../components/notifications"
import { authOptions } from "../auth/[...nextauth]"

export const getPlayerCalls = async (userId: string): Promise<PlayerCallNotification[]> => {
  
  return await prisma.playerCall.findMany({
    where: {
      musicianId: userId
    },
    include: {
      calls: true,
      eventSection: {
        include: {
          event: {
            include: {
              ensemble: true,
              fixer: true
            }
          }
        }
      }
    }
  })
}


export default async function handle(req, res) {
  const session = await getServerSession(req, res, authOptions)
  if (session) {
    
    res.status(200).json(await getPlayerCalls(session.userId))
  } else {
    res.status(200).json([])
  }
}
