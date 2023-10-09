import prisma from "../../../client"

type updateUserObj = {
}

const updateUser = async(userObj: {data: {[x: string]: string}, userId: string}) => {
  
  return await prisma.user.update({
    where: {
      id: userObj.userId
    },
    data: {...userObj.data},
  })
}


export default async function handle(req, res) {
  res.status(200).json(await updateUser(req.body))
}

export { updateUser };