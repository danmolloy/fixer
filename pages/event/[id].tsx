import { useRouter } from "next/router";
import Fixing from "../../components/fixing/fixing";
import useSWR from "swr";
import IsLoadingEventIndex from "../../components/event/eventDetail/isLoadingEventIndex";
import { useEffect, useState } from "react";
import IsLoadingInstrumentTile from "../../components/fixing/isLoadingTile";
import { useSession } from "next-auth/react";
import LandingPage from "../../components/externalSite/landingPage";
import LayoutIndex from "../../components/layout";
import LoadingLayout from "../../components/layout/loading";
import ExternalLayout from "../../components/layout/external";
import SignIn from "../../components/layout/signIn";
import EventDetail from "../../components/event/eventDetail";
import Index404 from "../../components/layout/components/index404";

const fetcher = (url: string):Promise<any> => fetch(url).then((res) => res.json())

export default function Event() {
  const router = useRouter();
  const { id } = router.query;
  const { data, error, mutate, isLoading } = useSWR(id ? `/api/event/${id}` : null, fetcher)
  const [lastUpdated, setLastUpdated] = useState<null|Date>(null)
  const { data: session, status } = useSession()

  useEffect(() => {
    setLastUpdated(new Date())
  }, [data])

  const refreshData = () => {
    mutate();
    setLastUpdated(new Date());
  }




    if (error || data === null) {
      return (
      <LayoutIndex>
        <Index404 />
      </LayoutIndex>)
    }

  return (
    <LayoutIndex >
      {isLoading 
      ? <>
          <IsLoadingEventIndex />
          <IsLoadingInstrumentTile />
        </>
      : session 
      ? <EventDetail 
        event={data}
        session={session} />  
        :         <SignIn />
      }
      {data && data.users && <Fixing lastUpdated={lastUpdated} isLoading={isLoading} users={data.users} eventCalls={data.calls} refreshProps={() => refreshData()} eventId={data.id} instrumentSections={data.instrumentSections} /> }
   </LayoutIndex>
  )
}
{/* <EventIndex
        event={data}
        session={data.session} />  */}