import { ErrorMessage, Field, FieldArray, Formik } from 'formik'
import { useSession } from 'next-auth/react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import * as Yup from 'yup';
import { AiOutlineClose } from 'react-icons/ai';
import TextInput from './textInput';
import { TextField, RadioGroup, Autocomplete, ToggleButtonGroup } from 'formik-mui';
import { Button, FormControl, FormControlLabel, FormLabel, Radio, ToggleButton } from '@mui/material';
import { useState } from 'react';
import React from 'react';
import CallInput from './callInput';

const options = [{ title: 'The Shawshank Redemption', year: 1994 }]

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
    <div data-testid="create-event-form" className='w-screen flex flex-col items-center'>

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
          await handleSubmit(values);
          actions.setSubmitting(false);
        }}>
          {(props) => (
            <form id="fixing-form" className='fix-form' onSubmit={props.handleSubmit}>
              <TextInput multiline={false} label="Concert Title" name="concertTitle" title="Concert Title" id="concert-title" className='input-box'/>

              <Field component={ToggleButtonGroup} type="checkbox" name="confirmedOrOnHold" exclusive value={confirmedOrOnHold} className="flex flex-col w-1/3 p-2" data-testid={`confirm-or-hold-toggle-group`}>
                <ToggleButton value="confirmed" onClick={e => setConfirmedOrOnHold("confirmed")} data-testid={`confirmed-toggle`}>Confirmed</ToggleButton>
                <ToggleButton value="onHold" onClick={e => setConfirmedOrOnHold("onHold")} data-testid={`on-hold-toggle`}>On Hold</ToggleButton>
                <ErrorMessage name={`confirmedOrOnHold`}>
                    { msg => <div className="form-error" data-testid={`create-form-error-confirm-on-hold`}>{msg}</div> }
                </ErrorMessage>
              </Field>
              <div>
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
                    component={TextField}
                    label="Ensemble Name"
                    data-testid="other-ensemble-input"
                    className='input-box'
                    type="text"
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
              </div>
              
              <TextInput multiline={true} name="concertProgram" title="Concert Program" id="concert-program" className='input-box-multiline' label="Concert Program"/>              
              <FieldArray name="calls" data-testid="call-field-array">
              {({ insert, remove, push }) => (
                <div  data-testid="calls-array">
                  {props.values.calls.map((call, index) => (
                    <div className='call-div' key={call.id} data-testid={`call-${index + 1}-div`}>
                      <CallInput id={call.id} index={index} remove={(arg) => remove(arg)}/>
                    </div>
                  ))}
                  <Button
                  variant="contained"
                  type="button"
                  data-testid="add-call-btn"
                  className="add-call-btn"
                  color="primary"
                  onClick={() => push({
                    id: uuidv4(),
                    startTime: undefined,
                    endTime: undefined,
                    venue: undefined
                   })}
                >
                  Add Call
                </Button>
                </div> 
              )}
              </FieldArray>
              
              <TextInput multiline={false} label="Dress Code" name="dressCode" title="Dress Code" id="dress-code" className='input-box'/>
              <TextInput multiline={false} label="Fee" name="fee" className='input-box' title="Fee" id="fee"/>
              <TextInput multiline={true} label="Additional Information" name="additionalInfo" title="Additional Information" id="additional-info" className="input-box-multiline"/>
              <Button data-testid="create-event-btn" type="submit" className='submit-btn' color="primary" variant="contained">Create</Button>
            </form>
          )}
      </Formik>
    </div>
  )
}