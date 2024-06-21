'use client'
import { Formik, Field, Form, FormikHelpers } from 'formik';
import { Session } from "next-auth";
import TextInput from '../../forms/textInput';
import axios from 'axios';
import { useRouter } from 'next/navigation'

export type UpdateUserFormProps = {
  session: Session
}

export default function UpdateUserForm(props: UpdateUserFormProps) {
  const { session } = props;
  const router = useRouter()

  const initialVals = {
    firstName: session.user.firstName,
    lastName: session.user.lastName,
    mobileNumber: session.user.mobileNumber,
    email: session.user.email,
    id: session.user.id,
    //ensembles: session.user.admins,
  }

  return (
    <div>
      <h1>Update User</h1>
      <Formik 
        initialValues={initialVals} 
        onSubmit={async (vals) => {
          return await axios.post("update/api", vals).then(() => {
            router.push("/")
            //setSubmitStatus("Successfully updated!")
          })
            .catch(function (error) {
              router.refresh()
              console.log(error);
            });
        }}>
        <Form>
          <TextInput name="firstName" id="firstName" label="First Name" />
          <TextInput name="lastName" id="lastName" label="Last Name" />
          <TextInput name="mobileNumber" id="mobileNumber" label="Mobile Number" type="tel" />
          <TextInput name="email" id="email" label="Email" type='email' />
          <button type="submit">Submit</button>
        </Form>
      </Formik>
    </div>
  )
}