import { useSession } from "next-auth/react";
import CreateEventForm from "../../components/event/createUpdate";
import axios from "axios";
import { Router, useRouter } from "next/router";
import LayoutIndex from "../../components/layout";
import LoadingLayout from "../../components/layout/loading";
import ExternalLayout from "../../components/layout/external";
import LandingPage from "../../components/externalSite/landingPage";
import SignIn from "../../components/layout/signIn";

export default function Create() {
  const { data: session, status } = useSession()
  const router = useRouter()


  
  const handleSubmit = async(vals) => {
    return axios.post('/api/event/create', vals)
          .then(response => {
            router.push(`/event/${response.data.id}`)
          })
          .catch(function (error) {
            console.log(error);
          });
  }

  return (
    <LayoutIndex >
      {session 
      ? <CreateEventForm 
        adminEnsembleList={session.userData.admins}
        createOrUpdate="Create"
        handleSubmit={(vals) => handleSubmit(vals)}
        userId={session.user.id}
        fixingEnsembles={session.userData.fixingEnsembles}
        userName={session.user.name}
          />
      : <SignIn />}
      
    </LayoutIndex>
  )
}