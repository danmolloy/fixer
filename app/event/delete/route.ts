import prisma from "../../../client"

export const deleteEvent = async(eventId: number) => {
  
  return await prisma.event.delete({
    where: {
      id: eventId
    }
  })
}


export async function POST(request: Request) {
  const req = await request.json()
  await deleteEvent(Number(req.eventId))
  return new Response()

}
