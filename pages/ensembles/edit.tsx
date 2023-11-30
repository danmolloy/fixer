import { useSession } from "next-auth/react"
import LayoutIndex from "../../components/layout"
import SignIn from "../../components/layout/signIn"
import EnsembleForm from "../../components/users/settings/ensembleForm"
import useSWR from "swr"
import IsLoadingProfile from "../../components/users/isLoadingProfile"

export default function EditEnsembles() {

  const { data: session, status } = useSession()


  return (
    <LayoutIndex>
      {session 
      ? <EnsembleForm userEnsembles={session.userData.admins} userId={session.user.id} /> 
      : <SignIn />}
    </LayoutIndex>
  )
}