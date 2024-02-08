import prisma from "../../../client"

type updateUserObj = {
  userId: string
  firstName: string
  lastName: string
  email: string
  instrument: string
}

const updateUser = async(userObj) => {
  return await prisma.user.update({
    where: {
      id: userObj.userId
    },
    data: {
      firstName: userObj.firstName,
      lastName: userObj.lastName,
      email: userObj.email,
      instrumentsList: [userObj.instrument]
    },
  })
}


export default async function handle(req, res) {
  const { 
    userId,
    firstName,
    lastName,
    email,
    instrument
  } = req.body

  const userObj: updateUserObj = {
    userId,
    firstName,
    lastName,
    email,
    instrument
  }
  console.log("Hi")
  res.status(200).json(await updateUser(userObj))
}

export { updateUser };