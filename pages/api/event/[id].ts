import prisma from "../../../client"
import { getServerSession } from "next-auth"
import { authOptions } from "../auth/[...nextauth]"


export const findEvent = async (uniqueId) => {

  return await prisma.event.findUnique({
    where: {
      id: uniqueId
    },
    include: {
      calls: true,
      instrumentSections: {
        include: {
          musicians: {
            include: {
              musician: {
                select: {
                  name: true
                }
              },
              calls: {
                select: {
                  id: true
                }
              }
            }
          }
        }
      }
    }
  }) 
}

export default async function handle(req, res) {  
  const session = await getServerSession(req, res, authOptions)
  let eventData;
  if (session) {
    session.user.id 
    ? eventData = await findEvent(parseInt(req.query.id))
    : session.user.email
    ? eventData = await findEvent(parseInt(req.query.id))
    : res.status(401).end()
  } else {
    console.log("No Session")
    res.status(401).end()
  }
  res.status(200).json({...eventData, session: session})

}