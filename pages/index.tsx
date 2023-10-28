import Layout from "../components/layout/layout";
import { useSession } from "next-auth/react"
import LandingPage from "../components/landingPage/landingPage";
import UserInfoForm from "../components/index/userInfoForm";
import axios from "axios";
import { useRouter } from "next/router";
import Loading from "../components/index/loading";
import Dashboard from "../components/index/dashboard";
import useSWR from "swr";
import CalendarIndex from "../components/calendar";

const fetcher = (url: string):Promise<any> => fetch(url).then((res) => res.json())

export default function Home() {
  const router = useRouter()
  const { data: session, status } = useSession()
  const { data, error, /* isLoading */ } = useSWR('/api/calendar/getCalendar', fetcher)

  /* const handleSubmit = async (vals) => {
    console.log("Hello from handleSubmit");
    return axios.post('/api/user/edit', vals)
          .then(response => {
            router.push(`/`)
          })
          .catch(function (error) {
            console.log(error);
          });
  } */


  if (!session) {
    return (
      <Layout>
        <LandingPage />
      </Layout>
    )}


  return (
    <Layout pageTitle="">
      {/* <EventsIndex data={data}/> */}
      <CalendarIndex data={data}/>
    </Layout>
  )
}
