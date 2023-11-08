import { getServerSession } from "next-auth"
import { authOptions } from '../auth/[...nextauth]'
import { getUser, emailGetUser } from "./getUserDetailsFunctions";
import prisma from "../../../client";

const findUser = async (userId: string) => {
  return await prisma.user.findUnique({
    where: {
      id: userId
    },
    include: {
      blockedUsers: true
    }
  })
}
export default async function handle(req, res) {
  const session = await getServerSession(req, res, authOptions)
  let userDetails;
  if (session) {
    session.user.id 
    ? userDetails = await findUser(session.user.id)
    : res.status(401).end()
  } else {
    console.log("No Session")
    res.status(401).end()
  }
  
  res.status(200).json(userDetails)
}

export { getUser, emailGetUser };