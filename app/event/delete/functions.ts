import prisma from "../../../client"

export const deleteEvent = async(eventId: number) => {
  
  return await prisma.event.delete({
    where: {
      id: eventId
    }
  })
}

