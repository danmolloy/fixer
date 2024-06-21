import prisma from "../../../../../client"


export const updateEventSection = async(sectionObj: {
  eventSectionId: number,
  bookingStatus: string,
  numToBook: number
}) => {
  
  return await prisma.eventSection.update({
    where: {
      id: sectionObj.eventSectionId
    },
    data: {
      bookingStatus: sectionObj.bookingStatus,
      numToBook: sectionObj.numToBook,
    }
  })
}


export async function POST(request: Request) {
  const req = await request.json()
  await updateEventSection(req)
  return new Response()

}
