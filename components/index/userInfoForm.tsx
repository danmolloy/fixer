import { ErrorMessage, Field, Formik } from "formik";
import React from "react";
import TextInput from "../createEvent/textInput";
import { instrumentArr } from "../fixing/fixing";
import ButtonPrimary from "./buttonPrimary";
import * as Yup from 'yup';

export default function UserInfoForm() {

  const UserSchema = Yup.object().shape({
    firstName: Yup.string().required("First name required"),
    lastName: Yup.string().required("Last name required"),
    email: Yup.string().required("Email required"),
    instrument: Yup.string().required('Select instrument'),
    newInstrument: Yup.string().when("instrument", {
      is: "other",
      then: (schema) => schema.required("Instrument name required"),
    }),
  })

  return (
    <div className="sm:border sm:shadow-sm p-1 sm:p-2 mb-4 rounded flex flex-col items-center w-full md:w-3/4 self-center">
      <h1>Your details</h1>
      <Formik 
        initialValues={{ 
          firstName: '',
          lastName: '',
          email: '',
          instrument: "", 
          newInstrument: '',
        }}
        validationSchema={UserSchema}
        onSubmit={(values, actions) => {
          const sumbmitObj = {
            name: `${values.firstName} ${values.lastName}`,
            email: values.email,
            instrument: values.instrument === "other" ? values.newInstrument : values.instrument
          }
          alert(sumbmitObj)
           actions.setSubmitting(false);
        
       }}>
        {props => (
          <form className="flex flex-col w-full lg:w-2/3 " onSubmit={props.handleSubmit}>
            <TextInput 
              asHtml='input' 
              label="First Name" 
              name="firstName" 
              id="first-name" 
              className=''/>
            <TextInput 
              asHtml='input' 
              label="Last Name" 
              name="lastName" 
              id="last-name" 
              className=''/>
            <TextInput 
              asHtml='input' 
              label="Email" 
              name="email" 
              id="email-input" 
              className=''/>
            <Field as="select" name="instrument" className="border shadow-sm p-1 rounded w-1/2 sm:w-1/3">
              <option value={null}>Select instrument</option>
              {instrumentArr.map(i => (
                <option value={i} key={i}>
                {i}
            </option>
          ))}
            <option value={"other"}>Other</option>
          </Field>
          <ErrorMessage name={"instrument"}>
            { msg => <div className="p-1 text-red-600 text-sm" data-testid={`instrument-error`}>{msg}</div> }
          </ErrorMessage>
          {props.values.instrument === "other" 
          && <TextInput 
          asHtml='input' 
          label="Instrument Name" 
          name="newInstrument" 
          id="new-instrument" 
          className=''/>}
              <ButtonPrimary
                id="create-event-btn" 
                type="submit" 
                className='bg-blue-600 hover:bg-blue-500 text-white w-24 self-end' 
                text="Submit"/>
          </form>
        )}
      </Formik>
    </div>
  )
}