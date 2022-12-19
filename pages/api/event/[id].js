import prisma from "../../../client"

export const findEvent = async (id) => {
  return await prisma.event.findUnique({
    where: {
      id: id
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
              }
            }
          }
        }
      }
    }
  }) 
}


export default async function handle(req, res) {  
  res.status(200).json(await findEvent(Number(req.query.id)))
}