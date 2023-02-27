import axios from "axios";
import { useRouter } from "next/router";
import CreateEventForm from "../../components/createEvent/createEventForm";
import Layout from "../../components/layout/layout";
import { useSession } from "next-auth/react";



export default function Fix() {
  const { data: session } = useSession()
  const router = useRouter()

  const handleSubmit = async(vals) => {
    return axios.post('/api/event/create', vals)
          .then(response => {
            console.log(response.data.id);
            router.push(`/event/${response.data.id}`)
          })
          .catch(function (error) {
            console.log(error);
          });
  }


  if (!session) {
    return <p>Loading..</p>
  }

  return (
    <Layout pageTitle="Create Event">
      <CreateEventForm 
      handleSubmit={(vals) => handleSubmit(vals)}
      session={{
        user: session.user,
        expires: session.expires 
      }}
        />
    </Layout>
  )

}