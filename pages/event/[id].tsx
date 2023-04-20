import { useRouter } from "next/router";
import Fixing from "../../components/fixing/fixing";
import Layout from "../../components/layout/layout";
import { useSession } from "next-auth/react";
import EventIndex from "../../components/event";
import { findEvent } from "../api/event/[id]";
import { allEvents } from '../api/event/findAll'
import prisma from "../../client";
import useSWR from "swr";
import IsLoadingEventIndex from "../../components/event/isLoadingEventIndex";

const fetcher = (url: string):Promise<any> => fetch(url).then((res) => res.json())

export default function Event({props}) {
  //const { data: session } = useSession()
  const router = useRouter();
  const { id } = router.query;
  const { data, mutate, isLoading } = useSWR(id ? `/api/event/${id}` : null, fetcher)


  const refreshData = () => {
    
    mutate();
  }

  if (isLoading) {
    return <IsLoadingEventIndex />
  }

  return (
    <Layout pageTitle={data ? data.eventTitle : "Event"}>
      {data 
      ? <EventIndex
        confirmed={data.confirmedOrOnHold}
        updatedAt={data.updatedAt}
        createdAt={data.createdAt}
        calls={data.calls}
        additionalInfo={data.additionalInfo}
        fee={data.fee}
        dressCode={data.dressCode}
        concertProgram={data.concertProgram}
        ensembleName={data.ensembleName}
        id={data.id}
        fixerName={data.fixerName}
        fixerId={data.fixerId} 
        session={data.session} /> 
        : <p>Error</p>}
        
      {data && data.users && 
        <Fixing users={data.users} eventCalls={data.calls} refreshProps={() => refreshData()} eventId={data.id} instrumentSections={data.instrumentSections} /> }
   </Layout>
  )
}

/* export async function getServerSideProps(context) {
  const props = JSON.parse(JSON.stringify(await findEvent(parseInt(context.params.id))))
  return {
    props: {props},
  }
} */


/* export async function getStaticPaths() {
  const eventList = JSON.parse(JSON.stringify(await allEvents()))
  console.log(eventList)
  return {
    paths: [...eventList],
    fallback: false, 
  } 
} 

export async function getStaticProps(context) {
  const props = JSON.parse(JSON.stringify(await findEvent(parseInt(context.params.id))))
  return {
    props: {props},
    revalidate: 10
  }
}    */