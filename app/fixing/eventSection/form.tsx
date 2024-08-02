'use client'
import { EnsembleSection, EventSection } from "@prisma/client";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from 'yup';
import TextInput from "../../forms/textInput";
import axios from "axios";
import { useRouter } from "next/navigation";

export type CreateEventSectionProps = {
  eventId: number
  ensembleSections: EnsembleSection[]
  setCreateSection: (arg: boolean) => void
  ensembleSectionId: undefined|string
  bookingStatus: string
  numToBook: number
  eventSectionId: number|undefined
  eventSections: (EventSection & {ensembleSection: EnsembleSection})[]

}

export default function CreateEventSection(props: CreateEventSectionProps) {
  const { eventId, ensembleSections, setCreateSection, ensembleSectionId, bookingStatus, numToBook, eventSectionId, eventSections } = props;
  const router = useRouter()

  const formSchema = Yup.object().shape({
    eventId: Yup.number().required("event id required"),
    ensembleSectionId: Yup.string().required("ensemble section id required"),
    bookingStatus: Yup.string().required(),
    numToBook: Yup.number().min(0).max(50).required('number of musicians required'),
  })
  
  const initialVals = {
    eventId: eventId,
    ensembleSectionId: ensembleSectionId,
    bookingStatus: bookingStatus,
    numToBook: numToBook
  }

  const handleSubmit = async (vals) => {
    if (eventSectionId !== undefined) {
      return await axios.post("/fixing/eventSection/api/update", {...vals, eventSectionId: eventSectionId}).then(() => {
        router.refresh()
        setCreateSection(false)
      })
    } else {
      return await axios.post("/fixing/eventSection/api/create", vals).then(() => {
        router.refresh()
        setCreateSection(false)
      })
    }
  }

  return (
    <div data-testid="create-event-section">
      <Formik 
        initialValues={initialVals} 
        onSubmit={(values, actions) => {
          handleSubmit(values)
          actions.setSubmitting(false);
        }} 
        validationSchema={formSchema}>
        {props => (
          <Form>
            <h2>{ensembleSections.find(i => i.id === ensembleSectionId)?.name}</h2>
            {ensembleSectionId === undefined &&
            <div>
              <label htmlFor="ensembleSectionId">Section</label>
            <Field as="select" name="ensembleSectionId" data-testid="section-select">
              <option value={""}>select section</option>
              {ensembleSections.filter(i => !eventSections.map(j => j.ensembleSectionId).includes(i.id)).map(i => (
                <option key={i.id} value={i.id}>{i.name}</option>
              ))}
            </Field>
            <ErrorMessage name={'ensembleSectionId'}>
            { msg => <div className="p-1 text-red-600 text-sm" data-testid={`$ensembleSectionId-error`}>{msg}</div> }
          </ErrorMessage>
          </div>}
            <TextInput type="number" name="numToBook" id="numtobook-input" label="Num to Book" />
            <button onClick={(e) => {e.preventDefault(); setCreateSection(false)}}>
              Cancel
            </button>
            <button type="submit">
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  )
}