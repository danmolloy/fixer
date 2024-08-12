import prisma from "../../../../client"

export const updateUser = async(userObj: {[x: string]: string}) => {
  
  return await prisma.user.update({
    where: {
      id: userObj.id
    },
    data: userObj,
  })
}

