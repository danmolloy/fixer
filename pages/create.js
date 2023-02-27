import { useSession } from "next-auth/react";
import CreateEventForm from "../components/createEvent/createEventForm";
import Layout from "../components/layout";

export default function Create() {
  const { data: session } = useSession()

  if (!session) {
    return <p>Loading..</p>
  }

  return (
    <Layout pageTitle="Create Event">
      <CreateEventForm 
      session={{
        user: session.user,
        expires: session.expires 
      }}
        />
    </Layout>
  )
}