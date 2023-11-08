import { ErrorMessage, Field } from "formik";
import React from "react"
import TextInput from "../../event/createEvent/textInput";
import { instrumentArr } from "../../fixing/fixing";

export default function PersonalInfo() {

  return (
    <div data-testid="personal-info" className="sm:border sm:shadow-sm p-1 sm:p-2 mb-4 rounded flex flex-col items-center w-full md:w-3/4 ">
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
      <div data-testid="preferred-method">Preferred Contact Method</div>
          <div role="group" aria-labelledby="preferred-method">
            <label>
              <Field type="radio" name="preferredMethod" value="textMessage" />
              Text Message
            </label>
            <label>
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

