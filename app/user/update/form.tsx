'use client';
import { Formik, Field, Form, FormikHelpers } from 'formik';
import { Session } from 'next-auth';
import TextInput from '../../forms/textInput';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import * as Yup from 'yup';
import { phoneRegex } from '../../ensembles/[id]/contacts/import/contactInput';
import SubmitButton from '../../forms/submitBtn';
import StatusMessage from '../../forms/statusMessage';
import { NoSession } from '../../signin/auth';

export type UpdateUserFormProps = {
  session: Session | null;
};

export default function UpdateUserForm(props: UpdateUserFormProps) {
  const { session } = props;
  const router = useRouter();

  if (!session) {
    return <NoSession />;
  }

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
        onSubmit={async (vals, actions) => {
          actions.setStatus(null);
          await axios
            .post('update/api', vals)
            .then(() => {
              router.replace('/');
              actions.setStatus('success');
            })
            .catch((error) => {
              const errorMessage =
                error.data.error || 'An unexpected error occurred.';
              actions.setStatus(errorMessage);
            })
            .finally(() => {
              actions.setSubmitting(false);
            });
        }}
      >
        {(props) => (
          <Form>
            <TextInput
              disabled={props.isSubmitting}
              name='firstName'
              id='firstName'
              label='First Name'
            />
            <TextInput
              disabled={props.isSubmitting}
              name='lastName'
              id='lastName'
              label='Last Name'
            />
            <TextInput
              disabled={props.isSubmitting}
              name='mobileNumber'
              id='mobileNumber'
              label='Mobile Number'
              type='tel'
            />
            <TextInput
              disabled={props.isSubmitting}
              name='email'
              id='email'
              label='Email'
              type='email'
            />
            <SubmitButton
              disabled={props.isSubmitting || props.status === 'success'}
              status={
                props.isSubmitting
                  ? 'SUBMITTING'
                  : props.status === 'success'
                    ? 'SUCCESS'
                    : undefined
              }
            />
            <StatusMessage status={props.status} />
          </Form>
        )}
      </Formik>
    </div>
  );
}
