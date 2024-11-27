'use client';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import TextInput from '../forms/textInput';
import axios from 'axios';
import SubmitButton from '../forms/submitBtn';
import ValidationError from '../forms/validationError';
import StatusMessage from '../forms/statusMessage';

export default function ContactForm() {
  const formSchema = Yup.object().shape({
    name: Yup.string().required('name required'),
    email: Yup.string().email().required('email required'),
    message: Yup.string().required('message required'),
  });

  const initialValues = {
    name: '',
    email: '',
    message: '',
  };

  return (
    <div data-testid='contact-form' className='w-full p-4'>
      <Formik
        initialValues={initialValues}
        validationSchema={formSchema}
        onSubmit={async (values, actions) => {
          actions.setStatus(null);
          await axios
            .post('/sendGrid', {
              body: {
                emailData: {
                  subject: 'New Message from GigFix',
                  bodyText: `Dear GigFix Admin,
                <br /><br />
                You have received the following contact form message from ${values.name}:
                <br /><br />
                ${values.message}
                <br /><br />
                End of Message
                <br /><br />
                Reply email: ${values.email}
                <br /><br />
                Kind regards,
                GigFix`,
                },
                templateID: 'd-2b2e84b23956415ba770e7c36264bef9',
                emailAddress: process.env.FROM_EMAIL,
              },
            })
            .then(() => {
              actions.setStatus('success');
            })
            .catch((error) => {
              const errorMessage =
                error.response.data.error || 'An unexpected error occurred.';
              actions.setStatus(errorMessage);
            })
            .finally(() => {
              actions.setSubmitting(false);
            });
        }}
      >
        {(props) => (
          <Form className='flex w-full flex-col p-2'>
            <TextInput
              disabled={props.isSubmitting}
              name={'name'}
              id={'name-input'}
              label={'Name'}
              max={'30'}
            />
            <TextInput
              disabled={props.isSubmitting}
              name={'email'}
              id={'email-input'}
              type='email'
              label={'Email'}
              max={'45'}
            />
            <div className='flex flex-col'>
              <label htmlFor='msg-text' className='form-label'>
                Message{' '}
                {/* <span className='text-sm text-gray-400'>Optional</span> */}
              </label>
              <Field
                disabled={props.isSubmitting}
                multiline='6'
                maxLength='500'
                rows='4'
                component='textarea'
                id='msg-text'
                className='rounded-md border p-1 text-black shadow-sm'
                type='textarea'
                name='message'
              />
              <div className='h-6'>
                {props.values.message.length > 0 && (
                  <p className='mx-2 self-center text-sm opacity-40'>{`${props.values.message.length}/500`}</p>
                )}

                <ErrorMessage name='message'>
                  {(msg) => <div className='text-sm text-red-500'>{msg}</div>}
                </ErrorMessage>
              </div>
            </div>
            <SubmitButton disabled={props.isSubmitting} />
            <ValidationError errors={Object.values(props.errors)} />
            <StatusMessage status={props.status} />
          </Form>
        )}
      </Formik>
    </div>
  );
}
