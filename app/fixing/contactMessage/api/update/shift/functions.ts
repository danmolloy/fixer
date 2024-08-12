import prisma from "../../../../../../client"


export const updateContactIndex = async(data: {
  eventSectionId: number, 
  movingUp: boolean, 
  contactMessageId: number
}) => {

  // Get current calls sorted by indexNumber
  // Get index of elected call
  // set it to index of elected call - 1
  
  const currentCalls = await prisma.contactMessage.findMany({
    where: {
      eventSectionId: data.eventSectionId
    },
    orderBy: {
      indexNumber: "asc"
    }
  })
  const movingCallIndex = currentCalls.map(i => i.id).indexOf(data.contactMessageId)

  await prisma.contactMessage.update({
    where: {
      id: data.contactMessageId
    },
    data: {
      indexNumber: data.movingUp ? currentCalls[movingCallIndex - 1].indexNumber : currentCalls[movingCallIndex + 1].indexNumber
    }
  })
  await prisma.contactMessage.update({
    where: {
      id: data.movingUp ? currentCalls[movingCallIndex - 1].id : currentCalls[movingCallIndex + 1].id
    },
    data: {
      indexNumber: currentCalls[movingCallIndex].indexNumber
    }
  })
  return {hello: "world"}
}


