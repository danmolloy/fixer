import prisma from "../../../client"
import { getServerSession } from "next-auth"
import { authOptions } from "../auth/[...nextauth]"


export const findEvent = async (uniqueId) => {

  return await prisma.event.findUnique({
    where: {
      id: uniqueId
    },
    include: {
      ensemble: {
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
      },
      calls: true,
      sections: {
        include: {
            ensembleSection: {
              include: {
                members: true,
                extras: true
              }
            },
          musicians: {
            include: {
              musician: true,
              calls: true
            }
          }
        }
      },
/* 
      instrumentSections: {
        include: {
          musicians: {
            include: {
              musician: true,
              calls: true,
            }
          },
        
        }
      } */
    }
  }) 
}

export const findUsers = async () => {
  return await prisma.user.findMany({})
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

  if (eventData.fixerId === session.user.id) {
    eventData = {...eventData, users: await findUsers()}
  }

  res.status(200).json({...eventData, session: session})

} 