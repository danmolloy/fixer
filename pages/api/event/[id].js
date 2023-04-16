import prisma from "../../../client"

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
  res.status(200).json(await findEvent(parseInt(req.query.id)))

}