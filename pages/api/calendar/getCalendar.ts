import prisma from "../../../client"
import { getServerSession } from "next-auth"
import { authOptions } from '../auth/[...nextauth]'

const getCalendar = async (userId: string) => {
  const userCalendar = await prisma.user.findUnique({
    where: {
      id: userId
    },
    include: {
      calls: {
        include: {
          event: true
        }
      },
      events: {
        include: {
          calls: true
        }
      }
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
      },
      events: true
    }
  })
  return userCalendar
}

export default async function handle(req, res) {
  const session = await getServerSession(req, res, authOptions)
  let userDetails;
  if (session) {
    session.user.id 
    ? userDetails = await getCalendar(session.user.id)
    : session.user.email
    ? userDetails = await emailGetCalendar(session.user.email)
    : res.status(401).end()
  } else {
    console.log("No Session")
    res.status(401).end()
  }
  
  res.status(200).json(userDetails)
}

export { getCalendar, emailGetCalendar };