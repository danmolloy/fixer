import { Call, ContactMessage, EnsembleContact } from "@prisma/client";
import { FieldArray, Form, Formik } from "formik";
import DiaryContact from "../diaryContact";
import AppendedContacts from "./appendedContacts";
import * as Yup from 'yup';
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

export type ContactMessageFormProps = {
  cancelForm: () => void
  eventCalls: Call[]
  eventContacts: (ContactMessage & {
    contact: EnsembleContact
    calls: number[]
    contactMessageId: number|undefined
  })[]
  eventSectionId: number
  bookingOrAvailability: string
  sectionContacts: EnsembleContact[]
  currentContacts: (ContactMessage /* & {contact: EnsembleContact} */)[]
}

export default function ContactMessageForm(props: ContactMessageFormProps) {
  const { currentContacts, eventCalls, cancelForm, sectionContacts, eventContacts, eventSectionId, bookingOrAvailability } = props;
  const router = useRouter();
  const [filterCategories, setFilterCategories] = useState<string[]>(Array.from(new Set(sectionContacts.map(i => i.category))).filter(i => i !== null))

  const initialVals = {
    contacts: eventContacts.map(i => ({
      contactId: i.contactId,
      contactMessageId: i.contactMessageId,
      position: i.contact.role,
      name: `${i.contact.firstName} ${i.contact.lastName}`,
      playerMessage: i.playerMessage,
      calls: i.calls
    })),
    eventSectionId: eventSectionId,
    bookingOrAvailability: bookingOrAvailability
  }

  const validationSchema = Yup.object().shape({
    contacts: Yup.array().of(Yup.object({
      contactId: Yup.string().required(),
      position: Yup.string().required(),
      playerMessage: Yup.string(),
      calls: Yup.array().of(Yup.string()).min(1)
    })),
    eventSectionId: Yup.number().required("Event section ID required"),
    bookingOrAvailability: Yup.string().required("Availability check/offer to book not clarified"),
  })

  const handleSubmit = async (data) => {
    return await axios.post("/fixing/contactMessage/api/create", data).then(() => {
    router.refresh()
    })
  }

  return  (
    <Formik
      initialValues={initialVals}
      validationSchema={validationSchema}
      onSubmit={(values, actions) => {
        handleSubmit(values)
        actions.setSubmitting(false);
      }}>
      {props => (
        <Form>
          <AppendedContacts eventCalls={eventCalls} contacts={props.values.contacts}/>
          <div>
            <h3>Diary Contacts</h3>
            <div>
              <p>Filter by category: </p>
              <div>
                {Array.from(new Set(sectionContacts.map(i => i.category))).filter(i => i !== null).map(i => (
                  <label key={i}>
                    <input 
          type="checkbox" 
          onChange={() => {filterCategories.includes(i) 
            ? setFilterCategories(filterCategories.filter(j => j !== i))
            : setFilterCategories([...filterCategories, i])
          }}
          checked={filterCategories.includes(i)} />
        {i}
                  </label>
                ))}
              </div>
            </div>
            
            <FieldArray name="contacts">
            {({push}) => (sectionContacts.filter(i => i.category === null || filterCategories.includes(i.category)).map(i => (
              <DiaryContact
                setSelectContact={() => push({
                contactId: i.id,
                position: i.role,
                name: `${i.firstName} ${i.lastName}`,
                playerMessage: undefined,
                calls: eventCalls.map(j => String(j.id))
                })} 
                disabled={
                  props.values.contacts.map(j => j.contactId).includes(i.id)
                  || currentContacts.map(j => j.contactId).includes(i.id)
                } 
                key={i.id} 
                contact={i}/>
            )))}
            </FieldArray>

          </div>
          <button onClick={(e) => {e.preventDefault(); cancelForm()}}>Cancel</button>
          <button type="submit">Submit</button>
          {props.errors && <p>{JSON.stringify(props.errors)}</p>}
        </Form>
      )}
    </Formik>
  )
}