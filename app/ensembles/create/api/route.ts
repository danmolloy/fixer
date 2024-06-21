import { redirect } from "next/navigation"
import prisma from "../../../../client"

export const createEnsemble = async(ensembleObj: {name: string, userId: string, ensembleNames: string[]}) => {
  
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
}


export async function POST(request: Request) {
  const req = await request.json()

  await createEnsemble(req)
  return new Response()

}
