import prisma from "../../../../../client"

const deleteContactMessage = async (contactMessageId: number) => {
  const data = await prisma.contactMessage.delete({
    where: {
      id: contactMessageId
    },
  })
  return data
}

export async function POST(request: Request) {
  const req = await request.json()

  const data = await deleteContactMessage(Number(req.contactMessageId))
  return Response.json(data)

}