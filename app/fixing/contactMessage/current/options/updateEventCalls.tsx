import { Call, ContactMessage, EnsembleContact } from "@prisma/client";
import axios from "axios";
import { ErrorMessage, Field, FieldArray, Form, Formik } from "formik";
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
        <Form>
      {eventCalls.map(i => (
        <label key={i.id}>
          <p>{DateTime.fromJSDate(new Date(i.startTime)).toFormat("HH:mm")}</p>
              <p>{DateTime.fromJSDate(new Date(i.startTime)).toFormat("DD")}</p>
              {JSON.stringify(props.values.calls)}
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