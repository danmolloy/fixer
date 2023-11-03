import { useRouter } from "next/router";
import Fixing from "../../components/fixing/fixing";
import EventIndex from "../../components/event";
import useSWR from "swr";
import IsLoadingEventIndex from "../../components/event/isLoadingEventIndex";
import { useEffect, useState } from "react";
import IsLoadingInstrumentTile from "../../components/fixing/isLoadingTile";
import { useSession } from "next-auth/react";
import LandingPage from "../../components/externalSite/landingPage/landingPage";
import LayoutIndex from "../../components/layout";
import LoadingLayout from "../../components/layout/loading";
import ExternalLayout from "../../components/layout/external";

const fetcher = (url: string):Promise<any> => fetch(url).then((res) => res.json())

export default function Event({props}) {
  const router = useRouter();
  const { id } = router.query;
  const { data, mutate, isLoading } = useSWR(id ? `/api/event/${id}` : null, fetcher)
  const [lastUpdated, setLastUpdated] = useState<null|Date>(null)
  const { data: session, status } = useSession()

  useEffect(() => {
    setLastUpdated(new Date())
  }, [data])

  const refreshData = () => {
    mutate();
    setLastUpdated(new Date());
  }

  if (isLoading) {
    return <LoadingLayout />
  }



  if (!session) {
    return (
      <ExternalLayout>
        <LandingPage />
      </ExternalLayout>
    )}

  return (
    <LayoutIndex pageTitle={data ? data.eventTitle : "Event"}>
      {isLoading 
      ? <>
          <IsLoadingEventIndex />
          <IsLoadingInstrumentTile />
        </>
      : data 
      ? <EventIndex 
      event={{
        eventTitle: data.eventTitle,
    confirmedOrOnHold: data.confirmedOrOnHold,
    updatedAt: data.updatedAt,
    createdAt: data.createdAt,
    calls: data.calls,
    additionalInfo: data.additionalInfo,
    fee: data.fee,
    dressCode: data.dressCode,
    concertProgram: data.concertProgram,
    ensembleName: data.ensembleName,
    id: data.id,
    fixerName: data.fixerName,
    fixerId: data.fixerId,
      }}
      session={data.session} />
        : <p>Error</p>}
      {data && data.users && <Fixing lastUpdated={lastUpdated} isLoading={isLoading} users={data.users} eventCalls={data.calls} refreshProps={() => refreshData()} eventId={data.id} instrumentSections={data.instrumentSections} /> }
   </LayoutIndex>
  )
}
{/* <EventIndex
        event={data}
        session={data.session} />  */}