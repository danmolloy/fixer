import { ErrorMessage, FieldArray, Formik } from 'formik'
import { v4 as uuidv4 } from 'uuid';
import * as Yup from 'yup';
import TextInput from './textInput';
import { useState } from 'react';
import React from 'react';
import CallInput from './callInput';
import ButtonPrimary from "../index/buttonPrimary"
import EnsembleRadioGroup from './ensembleRadioGroup';
import ConfirmedOrOnHold from './confirmedOrOnHold';


interface CreateEventFormProps {
  handleSubmit: (vals: any) => void
  initialValues: any
  session: {
    user: {
      name: string
      email: string
      image: string
    }
    expires: string
  }
}

export default function CreateEventForm(props: CreateEventFormProps) {
  const { handleSubmit, initialValues, session } = props

  const [confirmedOrOnHold, setConfirmedOrOnHold] = useState('')



  const EventSchema = Yup.object().shape({
    fixer: Yup.object({
      name: Yup.string().required("Fixer name required"),
      email: Yup.string().required("Fixer email required"),
  }),
    id: Yup.string(),
    confirmedOrOnHold: Yup.string().required("Required"),
    ensemble: Yup.string().required('Select ensemble'),
    ensembleName: Yup.string().when("ensemble", {
      is: "Other",
      then: (schema) => schema.required("Ensemble name required"),
    }),
    eventTitle: Yup.string().required('Required'),
    concertProgram: Yup.string().required('Required'),
    calls: Yup.array().of(Yup.object({
      id: Yup.string().required(),
      startTime: Yup.string().required("Required"),
      endTime: Yup.string().required("Required"),
      venue: Yup.string().required("Venue required"),
    })), 
    dressCode: Yup.string().required('Required'),
    fee: Yup.string().required('Required'),
    additionalInfo: Yup.string(),
  })

  
  return (
    <div data-testid="create-event-form" className='border shadow-sm p-2 mb-4 rounded flex flex-col items-center w-full md:w-3/4 '>

      <Formik 
        initialValues={{
          fixer: {
            name: session.user?.name,
            email: session.user?.email
          }, 
          id: initialValues ? initialValues.id : "",
          confirmedOrOnHold: initialValues ? initialValues.confirmedOrOnHold : "",
          ensemble: initialValues ? "Other" : "",
          ensembleName: initialValues ? initialValues.ensembleName :"", 
          eventTitle: initialValues ? initialValues.eventTitle :"", 
          concertProgram: initialValues ? initialValues.concertProgram : "",
          calls: initialValues
          ? initialValues.calls.map(i => ({
            id: i.id,
            startTime: i.startTime.slice(0, -8),
            endTime: i.endTime.slice(0, -8),
            venue: i.venue,
          }))
          : [{
            id: uuidv4(),
            startTime: "",
            endTime: "",
            venue: "",
          }],
          dressCode: initialValues ? initialValues.dressCode : "",
          fee: initialValues ? initialValues.fee : "",
          additionalInfo: initialValues ? initialValues.additionalInfo : "",
        }}
        validationSchema={EventSchema}
        onSubmit={async(values, actions) => {
          if (values.ensemble === "Other") {
            values.ensemble = values.ensembleName
          }
          handleSubmit(values);
          actions.setSubmitting(false);
        }}>
          {(props) => (
            <form id="fixing-form" className='flex flex-col w-full lg:w-2/3 ' onSubmit={props.handleSubmit}>
              <ErrorMessage name={"fixer"}>
                { msg => <div className="p-1 text-red-600 text-sm" data-testid={`fixer-error`}>{msg}</div> }
              </ErrorMessage>
              <ErrorMessage name={"fixer.name"}>
                { msg => <div className="p-1 text-red-600 text-sm" data-testid={`fixer-error`}>{msg}</div> }
              </ErrorMessage>
              <div className='flex flex-col sm:items-center w-full sm:flex-row'>
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
                      <CallInput id={call.id} index={index} remove={(arg) => remove(arg)}/>
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
                asHtml='input' 
                label="Dress Code" 
                name="dressCode" 
                id="dress-code" 
                className=''/>
              <TextInput 
                asHtml='input' 
                label="Fee" 
                name="fee" 
                className='' 
                id="fee"/>
              <TextInput 
                asHtml="textarea" 
                label="Additional Information" 
                name="additionalInfo" 
                id="additional-info" 
                className=""/>
              <ButtonPrimary
                
                id="create-event-btn" 
                type="submit" 
                className='bg-blue-600 hover:bg-blue-500 text-white w-24 self-end' 
                text="Create"/>
            </form>
          )}
      </Formik>
    </div>
  )
}

{/* <Field component={ToggleButtonGroup} type="checkbox" name="confirmedOrOnHold" exclusive value={confirmedOrOnHold} className="flex flex-col w-1/2 p-2" data-testid={`confirm-or-hold-toggle-group`}>
                <ToggleButton value="confirmed" onClick={e => setConfirmedOrOnHold("confirmed")} data-testid={`confirmed-toggle`}>Confirmed</ToggleButton>
                <ToggleButton value="onHold" onClick={e => setConfirmedOrOnHold("onHold")} data-testid={`on-hold-toggle`}>On Hold</ToggleButton>
                <ErrorMessage name={`confirmedOrOnHold`}>
                    { msg => <div className="form-error" data-testid={`create-form-error-confirm-on-hold`}>{msg}</div> }
                </ErrorMessage>
              </Field> */}
              {/* <div>
                <FormLabel id="ensemble">Ensemble</FormLabel>
                <Field aria-labelledby="ensemble" label="Ensemble" component={RadioGroup} name="ensemble" data-testid="ensemble-radio-fieldset">
                  <FormControlLabel 
                  value="BBC Symphony Orchestra"
                  control={<Radio disabled={props.isSubmitting} />}
                  label="BBC Symphony Orchestra"
                  disabled={props.isSubmitting}/>

                  <FormControlLabel 
                  value="London Symphony Orchestra"
                  control={<Radio disabled={props.isSubmitting} />}
                  label="London Symphony Orchestra"
                  disabled={props.isSubmitting}/>
                  <div className='flex flex-row'>
                  <FormControlLabel 
                  data-testid="other-ensemble-radio"
                  value="Other"
                  control={<Radio disabled={props.isSubmitting} />}
                  label="Other"
                  disabled={props.isSubmitting}/>
                  {props.values.ensemble === "Other" 
                  && <Field
                    asHtml='input'
                    label="Ensemble Name"
                    id="other-ensemble-input"
                    className='border shadow-sm p-2 rounded '
                    placeholder="Ensemble Name"
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    value={props.values.ensembleName}
                    name="ensembleName"
                  /> }
                  </div>
                  
                </Field>
                <ErrorMessage name={`ensemble`}>
                    { msg => <div className="form-error" data-testid={`create-form-error-ensemble`}>{msg}</div> }
                  </ErrorMessage>
              </div> */}