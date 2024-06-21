import { auth } from "../../../../auth"
import SignIn from "../../../../signin/page"
import InviteAdminForm from "./form"

export default async function InviteAdmin({ params }: { params: { id: string } }) {
  const { id } = params
  const session = await auth()

  return (
    !session 
    ? <SignIn />
    :  <InviteAdminForm ensembleId={id} />
  )
}