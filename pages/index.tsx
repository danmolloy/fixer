import LandingPage from "../components/externalSite/landingPage";
import useSWR from "swr";
import CalendarIndex from "../components/calendar";
import LayoutIndex from "../components/layout";
import { useSession } from "next-auth/react";
import LoadingLayout from "../components/layout/loading";

const fetcher = (url: string):Promise<any> => fetch(url).then((res) => res.json())

export default function Home() {
  const { data, error, isLoading} = useSWR('/api/calendar/getCalendar', fetcher)
  const { data: session, status } = useSession()

 if (session && isLoading) {
    return <LoadingLayout />
  }

  return (
    <LayoutIndex pageTitle="">
      {(session && data) 
      ? <CalendarIndex data={data}/>
      :  <LandingPage />}
    </LayoutIndex>
  )
  
}

