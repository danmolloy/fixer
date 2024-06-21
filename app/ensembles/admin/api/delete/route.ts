import prisma from "../../../../../client"

const deleteAdmin = async (data: {
  adminId: string
}) => {
  return await prisma.ensembleAdmin.delete({
    where: {
      id: data.adminId
    },
    
  })
}

export async function POST(request: Request) {
  const req = await request.json()
  await deleteAdmin(req)
  return new Response()
}