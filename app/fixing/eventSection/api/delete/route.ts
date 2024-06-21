import prisma from "../../../../../client"

export const deleteEventSection = async(eventSectionId: number) => {
  
  return await prisma.eventSection.delete({
    where: {
      id: eventSectionId
    }
  })
}


export async function POST(request: Request) {
  const req = await request.json()
  await deleteEventSection(req.sectionId)
  return new Response()

}
