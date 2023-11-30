import { Field, FieldArray, Formik } from 'formik'
import { useSession } from 'next-auth/react';
import axios from 'axios';
import { useRouter } from 'next/router';
import CreateEventForm from '../../../components/event/createUpdate';
import useSWR from "swr";
import { Call, Event } from '@prisma/client';
import { EventWithCalls } from '../../../components/event/eventDetail/menu/calendarEventLink'; 
import LandingPage from '../../../components/externalSite/landingPage';
import LayoutIndex from '../../../components/layout';
import ExternalLayout from '../../../components/layout/external';
import LoadingLayout from '../../../components/layout/loading';
import SignIn from '../../../components/layout/signIn';
import Index404 from '../../../components/layout/components/index404';

const fetcher = (url: string):Promise<any> => fetch(url).then((res) => res.json())

export default function EditEvent(props) {
  const router = useRouter()
  const { id } = router.query;
  const { data, error, isLoading } = useSWR(id ? `/api/event/${id}` : null, fetcher)
  const { data: session } = useSession()
  

  if (isLoading) {
    return <LoadingLayout />
  }
  
  if (!session) {
    return (
      <LayoutIndex>
        <SignIn />
      </LayoutIndex>
    )
  }


  const handleSubmit = async(vals: EventWithCalls) => {

    const eventObj: Event = {
      ensembleId: "",
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

  if (error || data === null) {
    return (
    <LayoutIndex>
      <Index404 />
    </LayoutIndex>)
  }

  return (
    <LayoutIndex>
      <CreateEventForm
        adminEnsembleList={session.userData.admins}

      fixingEnsembles={session.userData.fixingEnsembles}
      createOrUpdate='Update'
       initialValues={data} 
       handleSubmit={(vals) => handleSubmit(vals)}
        userId={session.user.id}
        userName={session.user.name}
       />
    </LayoutIndex>
  )
}