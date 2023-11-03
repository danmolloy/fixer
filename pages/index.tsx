import { useSession } from "next-auth/react"
import LandingPage from "../components/externalSite/landingPage/landingPage";
import UserInfoForm from "../components/index/userInfoForm";
import axios from "axios";
import { useRouter } from "next/router";
import Loading from "../components/index/loading";
import Dashboard from "../components/index/dashboard";
import useSWR from "swr";
import CalendarIndex from "../components/calendar";
import LayoutIndex from "../components/layout";
import LoadingLayout from "../components/layout/loading";

const fetcher = (url: string):Promise<any> => fetch(url).then((res) => res.json())

export default function Home() {
  const router = useRouter()
  const { data, error, isLoading} = useSWR('/api/calendar/getCalendar', fetcher)

  if (!data) {
    return (
      <LayoutIndex>
        <LandingPage />
      </LayoutIndex>
    )}

    return (
      <LayoutIndex pageTitle="">
        <CalendarIndex data={data}/>
      </LayoutIndex>
    )
  
}


/* 
return (
    <Layout pageTitle="">
      <CalendarIndex data={data}/>
    </Layout>
  )
*/