import { useSession } from "next-auth/react";
import CreateEventForm from "../../components/createEvent/createEventForm";
import Layout from "../../components/layout/layout";
import axios from "axios";
import { Router, useRouter } from "next/router";

export default function Create() {
  const { data: session } = useSession()
  const router = useRouter()

  if (!session) {
    return <p>Loading..</p>
  }
  
  const handleSubmit = async(vals) => {
    console.log("Hello from handleSubmit");
    return axios.post('/api/event/create', vals)
          .then(response => {
            router.push(`/event/${response.data.id}`)
          })
          .catch(function (error) {
            console.log(error);
          });
  }

  return (
    <Layout pageTitle="Create Event">
      <CreateEventForm 
      handleSubmit={(vals) => handleSubmit(vals)}
      session={{
        user: {...session.user, id: session.userData.id},
        expires: session.expires 
      }}
        />
    </Layout>
  )
}