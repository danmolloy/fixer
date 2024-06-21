import prisma from "../../../client"

export const deleteEnsemble = async(ensembleId: string) => {
  
  return await prisma.ensemble.delete({
    where: {
      id: ensembleId
    }
  })
}


export async function POST(request: Request) {
  const req = await request.json()
  await deleteEnsemble(req.ensembleId)
  return new Response()

}
