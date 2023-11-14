import { ErrorMessage, Field, Formik } from "formik";
import React from "react";
import TextInput from "../event/createUpdate/textInput";
import { instrumentArr } from "../fixing/fixing";
import ButtonPrimary from "./buttonPrimary";
import * as Yup from 'yup';

export type userInfoObj = {
  userId: string
  name: string
  email: string
  instrument: string
}

interface UserInfoProps {
  userSession: any
  handleSubmit: (vals: userInfoObj) => void
}

export default function UserInfoForm(props: UserInfoProps) { 
  const { userSession, handleSubmit } = props;

  const UserSchema = Yup.object().shape({
    userId: Yup.string().required("User ID required"),
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
          userId: userSession.user.id,
          firstName: userSession.user.name ? userSession.user.name : '',
          lastName: userSession.user.name ? userSession.user.name : '',
          email: userSession.user.email ? userSession.user.email : '',
          instrument: userSession.user.instrument ? userSession.user.instrument : '', 
          newInstrument: '',
        }}
        validationSchema={UserSchema}
        onSubmit={(values, actions) => {
          const sumbmitObj: userInfoObj = {
            userId: values.userId,
            name: `${values.firstName} ${values.lastName}`,
            email: values.email,
            instrument: values.instrument === "other" ? values.newInstrument : values.instrument
          }
          handleSubmit(sumbmitObj)
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
              asHtml='email' 
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