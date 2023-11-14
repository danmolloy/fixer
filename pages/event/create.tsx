import { useSession } from "next-auth/react";
import CreateEventForm from "../../components/event/createEvent/createEventForm";
import axios from "axios";
import { Router, useRouter } from "next/router";
import LayoutIndex from "../../components/layout";
import LoadingLayout from "../../components/layout/loading";
import ExternalLayout from "../../components/layout/external";
import LandingPage from "../../components/externalSite/landingPage";

export default function Create() {
  const { data: session, status } = useSession()
  const router = useRouter()

  if (status === "loading") {
    return (
      <LoadingLayout />
    )
  } else if (!session) {
    return (
      <ExternalLayout>
        <LandingPage />
      </ExternalLayout>
    )
  }
  
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
    <LayoutIndex pageTitle="Create Event">
      <CreateEventForm 
      handleSubmit={(vals) => handleSubmit(vals)}
      userId={session.user.id}
      userName={session.user.name}
        />
    </LayoutIndex>
  )
}