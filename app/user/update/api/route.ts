import { redirect } from "next/navigation"
import prisma from "../../../../client"

export const updateUser = async(userObj: {[x: string]: string}) => {
  
  return await prisma.user.update({
    where: {
      id: userObj.id
    },
    data: userObj,
  })
}


export async function POST(request: Request) {
  const req = await request.json()

  console.log(JSON.stringify(req))
  await updateUser(req)
  //redirect('/')
  return new Response(redirect("/"))


}
