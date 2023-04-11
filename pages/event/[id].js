import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Fixing from "../../components/fixing/fixing";
import Layout from "../../components/layout/layout";
import { parse } from "json2csv";
import { CSVLink } from "react-csv";
import Link from "next/link";
import { useSession } from "next-auth/react";
import EventIndex from "../../components/event";



export default function Event(props) {
  const { data: session } = useSession()
  const [fixing, setFixing] = useState(false)
  const [exportObj, setExportObj] = useState({})
  const router = useRouter();

/*   useEffect(() => {

    let obj = {
      "ID": props.id,
      "Last Updated": props.updatedAt,
      Ensemble: props.ensembleName,
      Program: props.concertProgram,
      Fee: props.fee,
      Dress: props.dressCode,
      "Additional Info": props.additionalInfo,
      Violin: musicianNameArr("Violin"),
      Viola: musicianNameArr("Viola"),
      Cello: musicianNameArr("Cello"),
      Bass: musicianNameArr("Bass"),
      // calls
    }
    

    setExportObj(obj)
    
  }, [props])

  const musicianNameArr = (e) => {
    if ([...props.instrumentSections]
      .find(i => i.instrumentName === e) === undefined) {
        return "null"
      }
    return [...props.instrumentSections]
      .find(i => i.instrumentName === e)
      .musicians.filter(i => i.accepted === true)
      .map(i => i.musician.name)
  } */

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
        fixerEmail={props.fixerEmail} 
        session={session} />
        
      {session && session.userData.id === props.fixerId && 
      <Fixing eventCalls={props.calls} refreshProps={() => refreshData()} eventId={props.id} instrumentSections={props.instrumentSections} />}
    </Layout>
  )
}


export const getServerSideProps = async (context) => {
  /* console.log(context.params.id)
  console.log("severSide called") */
  const res = await fetch(`http://localhost:3000/api/event/${context.params.id}`)
  const data = await res.json()
  if (!data) {
    return {
      notFound: true,
    }
  }
  return { props: { ...data } }
}
