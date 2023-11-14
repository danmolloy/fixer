import { FieldArray, Formik } from 'formik'
import { v4 as uuidv4 } from 'uuid';
import * as Yup from 'yup';
import TextInput from './textInput';
import { useState } from 'react';
import React from 'react';
import CallInput from './callInput';
import ButtonPrimary from "../../index/buttonPrimary"
import EnsembleRadioGroup from './ensembleRadioGroup';
import ConfirmedOrOnHold from './confirmedOrOnHold';
import { Prisma } from '@prisma/client';

export type EventWithCallsAndInstruments = Prisma.EventGetPayload<{
  include: {
    calls: true,
    instrumentSections: true
  }
}>


export type CreateEventFormProps = {
  handleSubmit: (vals: any) => void
  initialValues?: EventWithCallsAndInstruments
  userId: string
  userName: string
}

export default function CreateEventForm(props: CreateEventFormProps) {
  const { handleSubmit, initialValues, userId, userName } = props
  const [confirmedOrOnHold, setConfirmedOrOnHold] = useState('')

  const EventSchema = Yup.object().shape({
    fixerName: Yup.string().required("Fixer name required"),
    fixerId: Yup.string().required("Fixer ID required"),
    id: Yup.string(),
    confirmedOrOnHold: Yup.string().required("Event confirmation status required"),
    ensemble: Yup.string().required('Select ensemble'),
    ensembleName: Yup.string().when("ensemble", {
      is: "Other",
      then: (schema) => schema.required("Ensemble name required"),
    }),
    eventTitle: Yup.string().required('Event title required'),
    concertProgram: Yup.string().required('Concert Program required'),
    calls: Yup.array().of(Yup.object({
      id: Yup.string(),
      startTime: Yup.string().required("Call start time required"),
      endTime: Yup.string().required("Call end time equired"),
      venue: Yup.string().required("Venue required"),
      info: Yup.string(),
    })), 
    dressCode: Yup.string(),
    fee: Yup.string(),
    additionalInfo: Yup.string(),
  })

  
  return (
    <div data-testid="create-event-form" className='sm:border sm:shadow-sm p-1 sm:p-2 mb-4 rounded flex flex-col items-center w-full md:w-3/4 '>
      <Formik 
        initialValues={{
          fixerName: userName,
          fixerId: userId,
          id: initialValues ? initialValues.id : "",
          confirmedOrOnHold: initialValues ? initialValues.confirmedOrOnHold : "",
          ensemble: initialValues ? "Other" : "",
          ensembleName: initialValues ? initialValues.ensembleName :"", 
          eventTitle: initialValues ? initialValues.eventTitle :"", 
          concertProgram: initialValues ? initialValues.concertProgram : "",
          calls: initialValues
          ? initialValues.calls.map(i => ({
            id: i.id,
            startTime: String(i.startTime).slice(0, -8),
            endTime: String(i.endTime).slice(0, -8),
            venue: i.venue,
          }))
          : [{
            id: 0,
            startTime: "",
            endTime: "",
            venue: "",
            info: "",
          }],
          dressCode: initialValues ? initialValues.dressCode : "",
          fee: initialValues ? initialValues.fee : "",
          additionalInfo: initialValues ? initialValues.additionalInfo : "",
        }}
        validationSchema={EventSchema}
        onSubmit={(values, actions) => {
          if (values.ensemble === "Other") {
            values.ensemble = values.ensembleName
          }
          actions.setSubmitting(true);
          handleSubmit(values);
          //actions.setSubmitting(false);
          
        }}>
          {(props) => (
            <form id="fixing-form" className='flex flex-col w-full lg:w-2/3 py-8' onSubmit={props.handleSubmit}>
              
              {/* <AddAdmin /> Let's keep it simple for now. */}

              
              <div className='flex flex-col sm:items-center w-full sm:flex-row '>
                <EnsembleRadioGroup 
                  ensemble={props.values.ensemble}
                  handleChange={props.handleChange}
                  handleBlur={props.handleBlur}
                  ensembleName={props.values.ensembleName} 
                  isSubmitting={props.isSubmitting} />
                  <ConfirmedOrOnHold setConfirmedOrOnHold={(e) => setConfirmedOrOnHold(e)} confirmedOrOnHold={confirmedOrOnHold} />
                </div>
                <TextInput 
                asHtml='input' 
                label="Concert Title" 
                name="eventTitle" 
                id="concert-title" 
                className=''/>
              <TextInput 
                asHtml='textarea' 
                name="concertProgram" 
                id="concert-program" 
                className='' 
                label="Concert Program"/>              
              <FieldArray name="calls" data-testid="call-field-array">
              {({ insert, remove, push }) => (
                <div  data-testid="calls-array" className='flex flex-col'>
                  {props.values.calls.map((call, index) => (
                    <div className='border p-4 my-4 rounded shadow-sm' key={call.id} data-testid={`call-${index + 1}-div`}>
                      <CallInput setVenue={(venue) => props.setFieldValue(`calls.${index}.venue`, venue)} propsValueVenue={call.venue} id={call.id} index={index} remove={(arg) => remove(arg)}/>
                    </div>
                  ))}
                  <ButtonPrimary
                  id="add-call-btn"
                  className="text-blue-600 hover:text-blue-500 border-blue-600 self-end"
                  text="Add Call"
                  handleClick={() => push({
                    id: uuidv4(),
                    startTime: undefined,
                    endTime: undefined,
                    venue: undefined
                   })} />
                </div> 
              )}
              </FieldArray>
              <TextInput
                optional={true} 
                asHtml='input' 
                label="Dress Code" 
                name="dressCode" 
                id="dress-code" 
                className=''/>
              <TextInput 
                optional={true} 
                asHtml='input' 
                label="Fee" 
                name="fee" 
                className='' 
                id="fee"/>
              <TextInput
                optional={true} 
                asHtml="textarea" 
                label="Additional Information" 
                name="additionalInfo" 
                id="additional-info" 
                className=""/>
              <ButtonPrimary
                isSubmitting={props.isSubmitting.toString() === "true" ? true: false}
                id="create-event-btn" 
                type="submit" 
                className='disabled:bg-blue-100 bg-blue-600 hover:bg-blue-500 text-white w-24 self-end' 
                text="Create"/>
                <div className=' h-8'>
                {Object.keys(props.errors).length > 0 
                && props.submitCount > 0
                && <p className='text-sm text-center text-red-600'>
                    Please revise your form. Errors are stated in red.
                  </p>}
                  </div>
            </form>
          )}
      </Formik>
    </div>
  )
}