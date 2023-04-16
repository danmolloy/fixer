import { useRouter } from "next/router";
import { Suspense, useEffect, useState } from "react";
import Fixing from "../../components/fixing/fixing";
import Layout from "../../components/layout/layout";
import { parse } from "json2csv";
import { CSVLink } from "react-csv";
import Link from "next/link";
import { useSession } from "next-auth/react";
import EventIndex from "../../components/event";
import { findEvent } from "../api/event/[id]";



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


/* export const getServerSideProps = async (context) => {

  //const res = await fetch(`${process.env.URL}/api/event/${context.params.id}`)
  //const data = await res.json()
  const data = JSON.stringify(await findEvent(parseInt(context.params.id)))

  if (!data) {
    return {
      notFound: true,
    }
  }
  return { props: {...data} }
} */

export async function getStaticPaths() {
  const res = await fetch(`${process.env.URL}/api/event/findAll`)
  const allEvents = await res.json()
  console.log(allEvents)
  return {
    paths: [...allEvents],
    fallback: false, // can also be true or 'blocking'
  } 
} 

export async function getStaticProps(context) {
  //const res = await fetch(`${process.env.URL}/api/event/${context.params.id}`)
  //const props = await res.json()
  const props = JSON.parse(JSON.stringify(await findEvent(Number(context.params.id))))
  return {
    props: {props}
  }
}
