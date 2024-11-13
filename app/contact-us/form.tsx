'use client';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import TextInput from '../forms/textInput';
import axios from 'axios';

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

  const handleSubmit = async (data) => {
    await axios.post("/sendGrid", {
      body: {
        emailData: {
          subject: "New Message from GigFix",
          bodyText: `Dear GigFix Admin,
          <br /><br />
          You have recieved the following contact form message from ${data.name}:
          <br /><br />
          ${data.message}
          <br /><br />
          End of Message
          <br /><br />
          Reply email: ${data.email}
          <br /><br />
          Kind regards,
          GigFix`,
        },
        templateID: 'd-2b2e84b23956415ba770e7c36264bef9',
        emailAddress: process.env.FROM_EMAIL,
      }})
  };

  return (
    <div data-testid='contact-form' className='p-4'>
      <Formik
        initialValues={initialValues}
        validationSchema={formSchema}
        onSubmit={(values, actions) => {
          handleSubmit(values);
          actions.setSubmitting(false);
        }}
      >
        {(props) => (
          <Form className='flex flex-col'>
            <TextInput
              name={'name'}
              id={'name-input'}
              label={'Name'}
              max={'30'}
            />
            <TextInput
              name={'email'}
              id={'email-input'}
              type='email'
              label={'Email'}
              max={'45'}
            />
            <div className='flex flex-col'>
              <label htmlFor='msg-text' className='form-label '>
                Message{' '}
                {/* <span className='text-sm text-gray-400'>Optional</span> */}
              </label>
              <Field
                multiline='6'
                maxLength='500'
                rows='4'
                component='textarea'
                id='msg-text'
                className='w-full rounded-md border p-1 lg:w-[60vw] text-black shadow-sm'
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
            <button
              type='submit'
              className='w-24 self-end rounded bg-blue-600 px-2 py-1 text-white shadow hover:bg-blue-500 '
            >
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
