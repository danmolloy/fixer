import axios from "axios";
import { useRouter } from "next/router";
import CreateEventForm from "../../components/createEvent/createEventForm";
import Layout from "../../components/layout/layout";



export default function Fix() {
  const router = useRouter()

  const handleSubmit = async(vals) => {
    return axios.post('/api/event/create', vals)
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
      <CreateEventForm handleSubmit={(vals) => handleSubmit(vals)}/>
    </Layout>
  )
}