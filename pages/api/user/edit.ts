import prisma from "../../../client"

type updateUserObj = {
  userId: string
  name: string
  email: string
  instrument: string
}

const updateUser = async(userObj) => {
  
  return await prisma.user.update({
    where: {
      id: userObj.userId
    },
    data: {
      name: userObj.name,
      email: userObj.email,
      instrumentsList: [userObj.instrument]
    },
  })
}


export default async function handle(req, res) {
  const { 
    userId,
    name,
    email,
    instrument
  } = req.body

  const userObj: updateUserObj = {
    userId,
    name,
    email,
    instrument
  }
  console.log("Hi")
  res.status(200).json(await updateUser(userObj))
}

export { updateUser };