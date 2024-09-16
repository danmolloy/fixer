'use client';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import TextInput from '../forms/textInput';

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

  const handleSubmit = (data) => {
    alert(data);
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
            <h2>Contact us</h2>
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
            <div>
              <label htmlFor='msg-text' className='form-label'>
                Message{' '}
                {/* <span className='text-sm text-gray-400'>Optional</span> */}
              </label>
              <Field
                multiline='6'
                maxLength='500'
                rows='4'
                component='textarea'
                id='msg-text'
                className='w-full rounded-md border border-zinc-400 p-1 text-black'
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
              className='w-24 self-end rounded bg-indigo-600 px-2 py-1 text-white shadow hover:bg-indigo-700 active:bg-indigo-800'
            >
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
