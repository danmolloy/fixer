import { Field, FieldArray, Formik } from 'formik'
import Layout from '../../../components/layout/layout'
import { useSession } from 'next-auth/react';
import axios from 'axios';
import { useRouter } from 'next/router';
import CreateEventForm from '../../../components/createEvent/createEventForm';


export default function EditEvent(props) {
  const router = useRouter()
  const { data: session } = useSession()


  if (!session) {
    return <p>Loading..</p>
  }

  const handleSubmit = async(vals) => {
    return axios.post('/api/event/edit/update', vals)
          .then(response => {
            console.log(response.data.id);
            router.push(`/event/${response.data.id}`)
          })
          .catch(function (error) {
            console.log(error);
          });
  }

  return (
    <Layout>
      <CreateEventForm initialValues={props} handleSubmit={(vals) => handleSubmit(vals)}/>
    </Layout>
  )
}

export const getServerSideProps = async (context) => {

  const res = await fetch(`http://localhost:3000/api/event/${context.params.id}`)
  const data = await res.json()
  if (!data) {
    return {
      notFound: true,
    }
  }
  return { props: { ...data } }
}
