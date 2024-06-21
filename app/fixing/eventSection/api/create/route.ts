import prisma from "../../../../../client"


export const createEventSection = async(sectionObj: {
  eventId: number,
  ensembleSectionId: string,
  bookingStatus: string,
  numToBook: number
}) => {
  
  return await prisma.eventSection.create({
    data: {
      bookingStatus: sectionObj.bookingStatus,
      numToBook: sectionObj.numToBook,
      eventId: sectionObj.eventId,
      ensembleSectionId: sectionObj.ensembleSectionId
    }
  })
}


export async function POST(request: Request) {
  const req = await request.json()
  await createEventSection(req)
  return new Response()

}
