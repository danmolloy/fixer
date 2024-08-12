import prisma from "../../../../client"

export const createEnsemble = async(ensembleObj: {name: string, userId: string, ensembleNames: string[]}) => {
  if (!ensembleObj) {
    throw new Error("Failed to create ensemble: data not defined.")
  }
  try {
    return await prisma.ensemble.create({
      data: {
        name: ensembleObj.name,
        ensembleNames: ensembleObj.ensembleNames,
        admin: {
          create: {
            positionTitle: "Manager",
            user: {
              connect: {
                id: ensembleObj.userId
              }
            }
          }
        }
      },
    })
  } catch(error) {
    throw new Error(`Failed to create ensemble: ${error.message}`)
  }

}


export async function POST(request: Request) {
  const req = await request.json()

  await createEnsemble(req)
  return new Response()

}
