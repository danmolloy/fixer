import { auth } from "../../auth";
import SignIn from "../../signin/page";
import JoinEnsembleForm from "./form";

export default async function JoinEnsemblePage() {
  const session = await auth()

  return (
    !session 
      ? <SignIn />
      : <JoinEnsembleForm userId={session.user.id} />
  )
}