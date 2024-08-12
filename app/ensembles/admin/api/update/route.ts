import prisma from "../../../../../client"

export const updateAdmin = async (data: {
  adminId: string
  positionTitle: string
  accessType: string
}) => {
  if (!data) {
    throw new Error("Failed to update ensemble admin: data is undefined")
  }
  try {
    return await prisma.ensembleAdmin.update({
      where: {
        id: data.adminId
      },
      data: {
        positionTitle: data.positionTitle,
        accessType: data.accessType
      }
    })
  } catch (error) {
    throw new Error(`Failed to update ensemble admin: ${error.message}`)

  }
}

export async function POST(request: Request) {
  const req = await request.json()
  await updateAdmin(req)
  return new Response()
}