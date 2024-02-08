import { getServerSession } from "next-auth"
import { authOptions } from "../auth/[...nextauth]"
import prisma from "../../../client"
import { PlayerCallNotification } from "../../../components/notifications"

const getUniquePlayerCall = async (playerCallId: number): Promise<PlayerCallNotification> => {

  return await prisma.playerCall.findUnique({
    where: {
      id: playerCallId
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
    const playerCall = await getUniquePlayerCall(Number(req.query.id))
    if (session.user.id === playerCall.musicianId) {
      res.status(200).json(playerCall)
    }
  } else {
    res.status(200).json([])
  }
}
