import prisma from "../../../../../client"

export const deleteEventSection = async(eventSectionId: number) => {
  
  return await prisma.eventSection.delete({
    where: {
      id: eventSectionId
    }
  })
}
