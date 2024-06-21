import { auth } from "../../auth"
import SignIn from "../../signin/page"
import UpdateUserForm from "./form"
import prisma from "../../../client"



export default async function UpdateUserPage() {
  const session = await auth()

  return (
    session 
    ? <UpdateUserForm session={session} />
    : <SignIn />
  )
}