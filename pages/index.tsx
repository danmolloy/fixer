import Layout from "../components/layout/layout";
import { useSession } from "next-auth/react"
import LandingPage from "../components/landingPage/landingPage";
import EventsIndex from "../components/upcomingEvents/eventsIndex"
import UserInfoForm from "../components/index/userInfoForm";
import axios from "axios";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter()
  const { data: session } = useSession()

  const profileIncomplete = session 
  && session?.userData 
  && session?.userData.email === null 
  || session?.userData.instrument === null 
  || session?.userData.name === null 

  const handleSubmit = async (vals) => {
    console.log("Hello from handleSubmit");
    return axios.post('/api/user/edit', vals)
          .then(response => {
            router.push(`/`)
          })
          .catch(function (error) {
            console.log(error);
          });
  }

if (!session) {
  return (
    <Layout>
      <LandingPage />
    </Layout>
  )}

  if (profileIncomplete) {
    return ( 
      <Layout>
        <UserInfoForm userSession={session} handleSubmit={(arg) => handleSubmit(arg)}/>
      </Layout>
  )}

  return (
    <Layout pageTitle="Calendar">
      <EventsIndex /* session={session} *//>
    </Layout>
  )
}
