import { useSession } from "next-auth/react";
import CreateEventForm from "../../components/createEvent/createEventForm";
import Layout from "../../components/layout/layout";
import axios from "axios";

export default function Create() {
  const { data: session } = useSession()

  if (!session) {
    return <p>Loading..</p>
  }
  const handleSubmit = async(vals) => {
    return axios.post('/api/event/create', vals)
          .then(response => {
            console.log("Hello from handleSubmit");
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
        user: session.user,
        expires: session.expires 
      }}
        />
    </Layout>
  )
}