import prisma from "../../../client"
const getUser = async (userId: string) => {
  return await prisma.user.findUnique({
    where: {
      id: userId
    }
  })
}

const emailGetUser = async (userEmail: string) => {
  const userDetails = await prisma.user.findUnique({
    where: {
      email: userEmail
    },
    include: {
      calls: {
        include: {
          event: true
        }
      }
    }
  })
  return userDetails
}

export { getUser, emailGetUser };