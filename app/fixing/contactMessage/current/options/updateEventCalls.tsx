import { Call, ContactMessage, EnsembleContact } from "@prisma/client";
import axios from "axios";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { DateTime } from "luxon";
import { useRouter } from "next/navigation";
import * as Yup from 'yup';

export type UpdateContactEventCallsProps = {
  contact: (ContactMessage & {
    contact: EnsembleContact
    calls: Call[]
    })
  eventCalls: Call[]
}

export default function UpdateContactEventCalls(props: UpdateContactEventCallsProps) {
  const { contact, eventCalls } = props;
  const router = useRouter();

  const initialVals = {
    calls: contact.calls.map(i => String(i.id)),
    contactMessageId: contact.id
  }

  const validationSchema = Yup.object().shape({
      contactMessageId: Yup.string().required(),
      calls: Yup.array().of(Yup.number())/* .min(1),  */
    })

  const handleSubmit = async (data) => {
    return await axios.post("/fixing/contactMessage/api/update/eventCalls", data).then(() => {
    router.refresh()
    })
  }


  return (
    <Formik 
      initialValues={initialVals} 
      validationSchema={validationSchema}
      onSubmit={(values, actions) => {
       if (values.calls.length < 1 && contact.calls.map(i => String(i.id)).filter(i => values.calls.includes(i)).length < 1) {
          return alert("This player will no longer have any calls offered, which is not a valid action. If you wish to remove them from the event, delete them from the list.")
        }
        handleSubmit({
          contactMessageId: values.contactMessageId,
          calls: {
            connect: values.calls.map(i => ({id: Number(i)})),
            disconnect: contact.calls.map(i => String(i.id)).filter(i => !values.calls.includes(i)).map(i => ({
              id: Number(i)
            }))
          }
        })
        actions.setSubmitting(false);
      }}>
      {props => (
        <Form data-testid="update-event-calls">
      {eventCalls.map(i => (
        <label key={i.id}>
          <p>{DateTime.fromJSDate(new Date(i.startTime)).toFormat("HH:mm")}</p>
              <p>{DateTime.fromJSDate(new Date(i.startTime)).toFormat("DD")}</p>
          <Field
            checked={props.values.calls.map(j => String(j)).includes(String(i.id)) ? true : false}
            type="checkbox" 
            value={String(i.id)}
            name={`calls`} />
        </label>
      ))}
      <ErrorMessage name="calls">
        {err => (
          <p>{err}</p>
        )}
      </ErrorMessage>
      {props.values.calls.length < 1 && <p>At least one call must be offered.</p>}
      <button 
        disabled={JSON.stringify(initialVals.calls.map(i => String(i))) === JSON.stringify(props.values.calls.map(i => String(i)))} 
        className=" disabled:opacity-40" type="submit">
        Update Calls
      </button>
        </Form>
      )}
    </Formik>
  )
}