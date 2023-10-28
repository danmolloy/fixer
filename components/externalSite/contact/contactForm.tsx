import { Form, Formik } from "formik";
import * as Yup from "yup";
import TextInput from "../../event/createEvent/textInput";


export default function ContactForm () {

  const formSchema = Yup.object().shape({
    firstName: Yup.string().required("First name required"),
    lastName: Yup.string().required("Last name required"),
    email: Yup.string().email().required("Email required"),
    phone: Yup.number().required("Contact number required"),
    message: Yup.string().required("Message required")
  })

  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: ""
  }

  const handleSubmit = (data) => {
    alert(data)
  }

  return (
    <div className="p-4">
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
        <TextInput name={"firstName"} id={"firstName-input"} label={"First Name"} max={"30"}/>
        <TextInput name={"lastName"} id={"lasttName-input"} label={"Last Name"} max={"30"}/>
        <TextInput name={"email"} id={"email-input"} label={"Email"} max={"45"}/>
        <TextInput name={"phone"} id={"phone-input"} label={"Phone"} max={"15"}/>
        <TextInput name={"message"} id={"message-input"} label={"Message"} asHtml="textarea" className="py-1 h-32" max={"300"}/>
        <button type="submit" className="w-24 self-end bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white px-2 py-1 rounded shadow">
          Submit
        </button>
      </Form>
    )}
    </Formik>
    </div>
  )
}