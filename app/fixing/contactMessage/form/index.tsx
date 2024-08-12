import { Call, ContactMessage, EnsembleContact } from "@prisma/client";
import { FieldArray, Form, Formik } from "formik";
import DiaryContact from "../diaryContact";
import AppendedContacts from "./appendedContacts";
import * as Yup from 'yup';
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import HelpMessage from "../../../layout/helpMessage";
import { buttonPrimary } from "../../../ensembles/dashboard";

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
  const [showFilters, setShowFilters] = useState(false);

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
    <div data-testid="contact-message-form">
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
          <div className="">
            <div className="w-full flex flex-row justify-between mt-6 mb-4">
            <h3>Diary Contacts</h3>
            <div>
            <button 
          className={buttonPrimary}
          onBlur={() => setTimeout(() => setShowFilters(false), 250)}
          onClick={(e) => {
            e.preventDefault();
            focus(); 
            setShowFilters(!showFilters)}}>
          Filters
        </button>
      {showFilters 
      && <div data-testid="filters-menu" className="flex flex-col border absolute p-1 rounded bg-white text-sm">
      {Array.from(new Set(sectionContacts.map(i => i.category))).filter(i => i !== null).map(i => (
                  <label key={i}>
                    <input 
                    className="m-1"
                  type="checkbox" 
                  onChange={() => {filterCategories.includes(i) 
                    ? setFilterCategories(filterCategories.filter(j => j !== i))
                    : setFilterCategories([...filterCategories, i])
                  }}
                  checked={filterCategories.includes(i)} />
                {i}
                  </label>
                ))}
      </div>}
      </div>
      </div>
            
            <FieldArray name="contacts">
            {({push}) => (sectionContacts.filter(i => i.category === null || filterCategories.includes(i.category)).length === 0 
            ? <div className="w-full my-4 flex justify-center ">
                <HelpMessage 
                head="No diary contacts."
                additional="Remove your filters, or add new contacts to you Address Book."/>
              </div>
            : sectionContacts.filter(i => i.category === null || filterCategories.includes(i.category)).map(i => (
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
          <div className="w-full flex flex-row justify-between mt-6 mb-2">
            <button className="border m-1 px-2 py-1 text-sm rounded hover:bg-gray-50" onClick={(e) => {e.preventDefault(); cancelForm()}}>Cancel</button>
            <button 
              
              className=" m-1 px-2 py-1 text-sm rounded text-white bg-indigo-500 hover:bg-indigo-600" type="submit">Submit</button>
          </div>
        </Form>
      )}
    </Formik>
    </div>
  )
}