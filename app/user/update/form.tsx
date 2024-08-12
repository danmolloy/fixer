'use client'
import { Formik, Field, Form, FormikHelpers } from 'formik';
import { Session } from "next-auth";
import TextInput from '../../forms/textInput';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import * as Yup from "yup";
import { buttonPrimary } from '../../ensembles/dashboard';

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
  const formSchema = Yup.object().shape({
    firstName: Yup.string().required("first name required"),
    lastName: Yup.string().required("last name required"),
    mobileNumber: Yup.string().required("mobile number required"),
    email: Yup.string().required("email address required"),

  })

  return (
    <div data-testid="user-form" className='flex flex-col  p-4'>
      <h1>Update User</h1>
      <Formik 
        validationSchema={formSchema}
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
          <button className={"py-1 px-2 mx-4 rounded text-sm flex flex-row items-center hover:bg-gray-50 text-black border self-end"} type="submit">Submit</button>
        </Form>
      </Formik>
    </div>
  )
}