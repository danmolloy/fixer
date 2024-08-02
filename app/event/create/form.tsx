'use client'
import { ErrorMessage, Field, FieldArray, Formik } from 'formik'
import { v4 as uuidv4 } from 'uuid';
import * as Yup from 'yup';
import TextInput from '../../forms/textInput';
import { useState } from 'react';
import React from 'react';
import CallInput from './callInput';
import ButtonPrimary from '../../forms/buttonPrimary';
import ConfirmedOrOnHold from './confirmedOrOnHold';
import { EnsembleAdmin, Prisma, Ensemble } from '@prisma/client';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export type EventWithCallsAndEnsemble = Prisma.EventGetPayload<{
  include: {
    calls: true,
    ensemble: true
  }
}>


export type CreateEventFormProps = {
  adminEnsembleList: (EnsembleAdmin & {ensemble: Ensemble})[]
  initialValues?: EventWithCallsAndEnsemble
  userId: string
  userName: string
  createOrUpdate: "Create"|"Update"
}

export const formatDate = (dateStr) => {
  //const date = new Date(new Date(dateStr).toLocaleString());
  const date = new Date(dateStr);
  return date.toISOString().slice(0, 10) + "T" + date.toUTCString().slice(17,22);
};


export default function CreateEventForm(props: CreateEventFormProps) {
  const { createOrUpdate, adminEnsembleList, initialValues, userId, userName } = props
  const router = useRouter()


  const EventSchema = Yup.object().shape({
    fixerName: Yup.string().required("Fixer name required"),
    fixerId: Yup.string().required("Fixer ID required"),
    id: Yup.string(),
    confirmedOrOnHold: Yup.string().required("Event confirmation status required"),
    ensembleName: Yup.string().required('Ensemble name required'),
    ensembleId: Yup.string().required('Select ensemble'),
    eventTitle: Yup.string().required('Event title required'),
    concertProgram: Yup.string().required('Concert program required'),
    calls: Yup.array().of(Yup.object({
      id: Yup.string(),
      startTime: Yup.string().required("Call start time required"),
      endTime: Yup.string().required("Call end time required"),
      venue: Yup.string().required("Venue required"),
      info: Yup.string(),
    })), 
    dressCode: Yup.string(),
    fee: Yup.string(),
    additionalInfo: Yup.string(),
  })


  
  return (
    <div data-testid="create-event-form" className='sm:border sm:shadow-sm p-1 sm:p-2 sm:my-8 my-4 rounded flex flex-col items-center w-full md:w-3/4 '>
      <Formik 
        initialValues={{
          fixerName: userName,
          fixerId: userId,
          id: initialValues ? initialValues.id : "",
          confirmedOrOnHold: initialValues ? initialValues.confirmedOrOnHold : "",
          ensembleName: initialValues ? initialValues.ensembleName : (adminEnsembleList.length === 1 && adminEnsembleList[0].ensemble.ensembleNames.length === 1) ? adminEnsembleList[0].ensemble.ensembleNames[0] : "",
          ensembleId: initialValues ? initialValues.ensembleId : adminEnsembleList.length === 1 ? adminEnsembleList[0].ensembleId : "",
          eventTitle: initialValues ? initialValues.eventTitle :"", 
          concertProgram: initialValues ? initialValues.concertProgram : "",
          calls: initialValues
          ? initialValues.calls.map(i => ({
            id: i.id,
            startTime: formatDate(i.startTime),
            endTime: formatDate(i.endTime),
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

          actions.setSubmitting(true);
          if ( createOrUpdate === "Update") {
            axios.post("/event/update/api", values).then((res) => {
              router.push(`/event/${res.data.event.id}`)
              
            }).catch(e => {
              actions.setSubmitting(false);
            })
          } else {
            axios.post("create/api", values).then((res) => {
              router.push(`/event/${res.data.id}`)
              
            }).catch(e => {
              actions.setSubmitting(false);
            })
          }


          
        }}>
          {(props) => (
            <form id="fixing-form" className='flex flex-col w-full lg:w-2/3 py-8' onSubmit={props.handleSubmit}>
              
              <div>
                <h1>{createOrUpdate} Event</h1>
              </div>
              <div className='flex flex-col sm:items-center w-full sm:flex-row '>
                <div>
              <label htmlFor='ensembleId' id="ensembleName" className="font-medium">Organisation
            
              <Field
              data-testid="org-select" as="select" name="ensembleId" 
                onChange={(e) => {
                  props.setFieldValue("ensembleName", ""); 
                  props.setFieldValue("ensembleId", e.target.value)}}>
                <option value={""}>Select Organisation</option>
                 {adminEnsembleList.map(i => (
                  <option key={i.ensembleId} value={i.ensembleId} >{i.ensemble.name}</option>
                 ))}
                </Field>
                <ErrorMessage name={`ensembleId`}>
          { msg => <div className="text-red-600 text-xs ml-4 -mt-1" data-testid={`ensembleId-error`}>{msg}</div> }
        </ErrorMessage>
        </label>
                </div>
                <div aria-labelledby="ensembleName" role="group" className="flex flex-col py-1" >

                <p id="ensembleName" className="font-medium">Ensemble Name</p>
                {adminEnsembleList.find(i => i.ensembleId === props.values.ensembleId)?.ensemble.ensembleNames.map(j => (
                  <label key={j} className="py-1">
                  <Field
                  className="mr-2"
                  type="radio"
                  name="ensembleName"
                  value={j}
                  disabled={props.isSubmitting}/>
                  {j}
                </label>
                ))}
                <ErrorMessage name={`ensembleName`}>
          { msg => <div className="text-red-600 text-xs ml-4 -mt-1" data-testid={`ensembleId-error`}>{msg}</div> }
        </ErrorMessage>
                </div>
                  <ConfirmedOrOnHold />
                </div>
                <TextInput 
                asHtml='input' 
                label="Event Title" 
                name="eventTitle" 
                id="event-title" 
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
                      <CallInput call={call}  setVenue={(venue) => props.setFieldValue(`calls.${index}.venue`, venue)} propsValueVenue={call.venue} id={call.id} index={index} remove={(arg) => remove(arg)}/>
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
                handleClick={() => {}}
                isSubmitting={props.isSubmitting.toString() === "true" ? true: false}
                id="create-event-btn" 
                type="submit" 
                className='disabled:bg-blue-100 bg-blue-600 hover:bg-blue-500 text-white w-24 self-end' 
                text="Submit"/>
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