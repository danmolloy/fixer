'use client';
import { Formik, Field, Form, FormikHelpers } from 'formik';
import { Session } from 'next-auth';
import TextInput from '../../forms/textInput';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import * as Yup from 'yup';
import { buttonPrimary } from '../../ensembles/dashboard';
import { phoneRegex } from '../../ensembles/[id]/contacts/import/contactInput';
import SubmitButton from '../../forms/submitBtn';
import ValidationError from '../../forms/validationError';

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
        onSubmit={(vals,actions) => {
          return axios.post('update/api', vals).then(() => {
            //router.push('/');
            router.refresh();
            //setSubmitStatus("Successfully updated!")
            actions.setSubmitting(false)

          }).catch(function (error) {
              router.refresh();
              console.log(error);
              actions.setSubmitting(false)

            });
        }}
      >
        {(props) => (
          <Form>
            <TextInput disabled={props.isSubmitting} name='firstName' id='firstName' label='First Name' />
            <TextInput disabled={props.isSubmitting} name='lastName' id='lastName' label='Last Name' />
            <TextInput
            disabled={props.isSubmitting}
              name='mobileNumber'
              id='mobileNumber'
              label='Mobile Number'
              type='tel'
            />
            <TextInput disabled={props.isSubmitting} name='email' id='email' label='Email' type='email' />
            <SubmitButton disabled={props.isSubmitting} />
          </Form>
        )}
      </Formik>
    </div>
  );
}
