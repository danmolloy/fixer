import { ErrorMessage, Field } from "formik";
import React from "react"
import TextInput from "../../event/createUpdate/textInput";
import { instrumentArr } from "../../fixing/fixing";

export default function PersonalInfo() {

  return (
    <div data-testid="personal-info" className="  p-1 my-4 flex flex-col items-center w-full ">
      <h2>Personal Information</h2>
      <TextInput 
      name="firstName" 
      label="First Name"
      id="first-name-input"/>
      <TextInput 
      name="lastName" 
      label="Surname"
      id="surname-input"/>
      <TextInput 
      type="email"
      name="email" 
      label="Email"
      id="email-input"/>
      <TextInput
      type="tel" 
      name="mobileNumber" 
      label="Mobile Number"
      id="mobile-input"/>
          <div role="group" aria-labelledby="preferred-method" className="flex flex-col py-4 w-full">
          <div data-testid="preferred-method" className="font-medium">Preferred Contact Method</div>
            <label className="my-1">
              <Field type="radio" name="preferredMethod" value="textMessage" />
              Text Message
            </label>
            <label className="my-1">
              <Field type="radio" name="preferredMethod" value="whatsApp" />
              WhatsApp
            </label>
          </div>
          <ErrorMessage name={"preferredMethod"}>
          { msg => <div className="p-1 text-red-600 text-sm" data-testid={`preferred-contact-error`}>{msg}</div> }
        </ErrorMessage>
   </div>
  )
}

