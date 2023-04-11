import Layout from "../components/layout/layout";
import { useSession } from "next-auth/react"
import LandingPage from "../components/landingPage/landingPage";
import EventsIndex from "../components/upcomingEvents/eventsIndex"

export default function Home() {
  const { data: session } = useSession()

if (!session) {
  return (
    <Layout>
      <LandingPage />
    </Layout>
  )}

  return (
    <Layout pageTitle="Calendar">
      <EventsIndex session={session}/>
    </Layout>
  )
}
