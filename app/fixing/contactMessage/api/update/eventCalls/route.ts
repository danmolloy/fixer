import prisma from "../../../../../../client"

export const updateContactEventCalls = async (data: {
  calls: {
    connect: {id: number}[],
    disconnect: {id: number}[],
  }, 
  contactMessageId: number}) => {
  return await prisma.contactMessage.update({
    where: {
      id: data.contactMessageId
    },
    data: {
      calls: data.calls
    }
  })
}


export async function POST(request: Request) {
  const req = await request.json()
  const data = await updateContactEventCalls(req)
  return Response.json(data)
}