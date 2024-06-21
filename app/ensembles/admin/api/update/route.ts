import prisma from "../../../../../client"

const updateAdmin = async (data: {
  adminId: string
  positionTitle: string
  accessType: string
}) => {
  return await prisma.ensembleAdmin.update({
    where: {
      id: data.adminId
    },
    data: {
      positionTitle: data.positionTitle,
      accessType: data.accessType
    }
  })
}

export async function POST(request: Request) {
  const req = await request.json()
  await updateAdmin(req)
  return new Response()
}