'use client'
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import TextInput from "../forms/textInput";

export default function ContactForm () {

  const formSchema = Yup.object().shape({
    name: Yup.string().required("name required"),
    email: Yup.string().email().required("email required"),
    message: Yup.string().required("message required")
  })

  const initialValues = {
    name: "",
    email: "",
    message: ""
  }

  const handleSubmit = (data) => {
    alert(data)
  }

  return (
    <div data-testid="contact-form" className="p-4">
    <Formik
    initialValues={initialValues}
    validationSchema={formSchema}
    onSubmit={(values, actions) => {
      handleSubmit(values)
      actions.setSubmitting(false);
    }}
  >
    {props => (
      <Form className="flex flex-col">
        <h2>Contact us</h2>
        <TextInput name={"name"} id={"name-input"} label={"Name"} max={"30"}/>
        <TextInput name={"email"} id={"email-input"} type="email" label={"Email"} max={"45"}/>
        <div>
          <label htmlFor='msg-text' className="form-label ">Message {/* <span className='text-sm text-gray-400'>Optional</span> */}</label>
          <Field 
          multiline="6"
          maxLength="500"
          rows="4"
          component="textarea"
            id="msg-text" 
            className=" text-black border border-zinc-400 rounded-md w-full p-1 "
            type="textarea"
            name="message"/>
            <div className="h-6">
            {props.values.message.length > 0 && <p className='self-center text-sm mx-2 opacity-40'>{`${props.values.message.length}/500`}</p>}

          <ErrorMessage name="message">
            { msg => <div className="text-sm text-red-500">{msg}</div> }
          </ErrorMessage>
          </div>
          </div>        
          <button type="submit" className="w-24 self-end bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white px-2 py-1 rounded shadow">
          Submit
        </button>
      </Form>
    )}
    </Formik>
    </div>
  )
}