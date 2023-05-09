import prisma from "../../../client"
import { getServerSession } from "next-auth"
import { authOptions } from '../auth/[...nextauth]'

const getUser = async (userId: string) => {
  const userDetails = await prisma.user.findUnique({
    where: {
      id: userId
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
      calls: {
        include: {
          event: true
        }
      }
    }
  })
  return userDetails
}

export default async function handle(req, res) {
  const session = await getServerSession(req, res, authOptions)
  let userDetails;
  if (session) {
    session.user.id 
    ? userDetails = await getUser(session.user.id)
    : session.user.email
    ? userDetails = await emailGetUser(session.user.email)
    : res.status(401).end()
  } else {
    console.log("No Session")
    res.status(401).end()
  }
  
  res.status(200).json(userDetails)
}

export { getUser, emailGetUser };