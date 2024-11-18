'use client';
import { Formik, Field, Form, FormikHelpers } from 'formik';
import { Session } from 'next-auth';
import TextInput from '../../forms/textInput';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import * as Yup from 'yup';
import { buttonPrimary } from '../../ensembles/dashboard';
import { phoneRegex } from '../../ensembles/[id]/contacts/import/contactInput';

export type UpdateUserFormProps = {
  session: Session;
};

export default function UpdateUserForm(props: UpdateUserFormProps) {
  const { session } = props;
  const router = useRouter();

  const initialVals = {
    firstName: session.user.firstName ? session.user.firstName : '',
    lastName: session.user.lastName ? session.user.lastName : '',
    mobileNumber: session.user.mobileNumber ? session.user.mobileNumber : '',
    email: session.user.email ? session.user.email : '',
    id: session.user.id,
    //ensembles: session.user.admins,
  };
  const formSchema = Yup.object().shape({
    firstName: Yup.string().required('first name required').min(1),
    lastName: Yup.string().required('last name required'),
    mobileNumber: Yup.string()
      .matches(
        phoneRegex,
        'number must be international format, i.e. +445504281329'
      )
      .required('mobile number required'),
    email: Yup.string().required('email address required'),
  });

  return (
    <div data-testid='user-form' className='flex flex-col p-4'>
      <div>
        <h1>Update User</h1>
        {(!session.user.firstName ||
          !session.user.lastName ||
          !session.user.mobileNumber ||
          !session.user.email) && (
          <p className='my1-1'>We just need a few more details from you.</p>
        )}
      </div>

      <Formik
        validationSchema={formSchema}
        initialValues={initialVals}
        onSubmit={async (vals) => {
          return await axios.post('update/api', vals).then(() => {
            router.push('/');
            //setSubmitStatus("Successfully updated!")
          });
          /* .catch(function (error) {
              router.refresh();
              console.log(error);
            }); */
        }}
      >
        {(props) => (
          <Form>
            <TextInput name='firstName' id='firstName' label='First Name' />
            <TextInput name='lastName' id='lastName' label='Last Name' />
            <TextInput
              name='mobileNumber'
              id='mobileNumber'
              label='Mobile Number'
              type='tel'
            />
            <TextInput name='email' id='email' label='Email' type='email' />
            <button
              className={
                'mx-4 flex flex-row items-center self-end rounded border px-2 py-1 text-sm text-black hover:bg-gray-50'
              }
              type='submit'
            >
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
