import { Field, FieldArray, Formik } from 'formik'
import Layout from '../../../components/layout/layout'
import { useSession } from 'next-auth/react';
import axios from 'axios';
import { useRouter } from 'next/router';
import CreateEventForm from '../../../components/createEvent/createEventForm';
import useSWR from "swr";
import { Call, Event } from '@prisma/client';
import { EventWithCalls } from '../../../components/event';

const fetcher = (url: string):Promise<any> => fetch(url).then((res) => res.json())

export default function EditEvent(props) {
  const router = useRouter()
  const { id } = router.query;
  const { data, isLoading } = useSWR(id ? `/api/event/${id}` : null, fetcher)
  const { data: session } = useSession()
  

  if (isLoading || !session) {
    return <p>Loading..</p>
  }

  const handleSubmit = async(vals: EventWithCalls) => {

    const eventObj: Event = {
      id: vals.id,
      createdAt: data.createdAt,
      updatedAt: new Date(),
      ensembleName: vals.ensembleName,
      eventTitle: vals.eventTitle,
      concertProgram: vals.concertProgram,
      confirmedOrOnHold: vals.confirmedOrOnHold,
      dressCode: vals.dressCode,
      fee: vals.fee,
      additionalInfo: vals.additionalInfo,
      fixerId: vals.fixerId,
      fixerName: vals.fixerName,
    }

    const callsArr: Call[] = vals.calls

    const reqObj = {
      eventObj: eventObj,
      callsArr: callsArr
    }


    return axios.post('/api/event/edit', reqObj)
      .then(response => {
        router.push(`/event/${response.data.event.id}`)
      })
      .catch(function (error) {
        console.log(error);
      }); 
  }

  return (
    <Layout>
      <CreateEventForm
       initialValues={data} 
       handleSubmit={(vals) => handleSubmit(vals)}
        userId={session.user.id}
        userName={session.user.name}
       />
    </Layout>
  )
}