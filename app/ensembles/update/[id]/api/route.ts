import prisma from "../../../../../client"

export const updateEnsemble = async(ensembleObj: {name: string, ensembleId: string}) => {
  
  return await prisma.ensemble.update({
    where: {
      id: ensembleObj.ensembleId
    },
    data: {
      name: ensembleObj.name,
    },
  })
}


export async function POST(request: Request) {
  const req = await request.json()

  await updateEnsemble(req)
  return new Response()

}
