import prisma from "../../../client"

const getCalendar = async (userId: string) => {
  const userCalendar = await prisma.user.findUnique({
    where: {
      id: userId
    },
    include: {
      calls: true
    }
  })
  return userCalendar
}

const emailGetCalendar = async (userEmail: string) => {
  const userCalendar = await prisma.user.findUnique({
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
  return userCalendar
}

export { getCalendar, emailGetCalendar };