import prisma from "../../../client"

const getUser = async (userId: string) => {
  const userDetails = await prisma.user.findUnique({
    where: {
      id: userId
    },
    include: {
      playerCalls: {
        include: {
          eventSection: {
            include: {
              event: true
            }
          }
        }
      }
    }
  })
  return userDetails
}

const emailGetUser = async (userEmail: string) => {
  const userDetails = await prisma.user.findUnique({
    where: {
      email: userEmail
    },
    include: {
      playerCalls: {
        include: {
          eventSection: {
            include: {
              event: true
            }
          }
        }
      }
    }
  })
  return userDetails
}

export { getUser, emailGetUser };