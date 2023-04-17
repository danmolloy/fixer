import { useRouter } from "next/router";
import Fixing from "../../components/fixing/fixing";
import Layout from "../../components/layout/layout";
import { useSession } from "next-auth/react";
import EventIndex from "../../components/event";
import { findEvent } from "../api/event/[id]";
import { allEvents } from '../api/event/findAll'
import prisma from "../../client";



export default function Event({props}) {
  const { data: session } = useSession()
  const router = useRouter();

  const refreshData = () => {
    
    router.replace(router.asPath);
  }

  if (!session) {
    return <p>Loading..</p>
  }

  return (
    <Layout pageTitle="Event">
      <EventIndex
        confirmed={props.confirmedOrOnHold}
        updatedAt={props.updatedAt}
        createdAt={props.createdAt}
        calls={props.calls}
        additionalInfo={props.additionalInfo}
        fee={props.fee}
        dressCode={props.dressCode}
        concertProgram={props.concertProgram}
        ensembleName={props.ensembleName}
        id={props.id}
        fixerId={props.fixerId} 
        session={session} />
        
      {session && session.userData.id === props.fixerId && 
      <Fixing eventCalls={props.calls} refreshProps={() => refreshData()} eventId={props.id} instrumentSections={props.instrumentSections} />}
   </Layout>
  )
}

/* export async function getServerSideProps(context) {
  const props = JSON.parse(JSON.stringify(await findEvent(parseInt(context.params.id))))
  return {
    props: {props},
  }
} */


export async function getStaticPaths() {
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
}   