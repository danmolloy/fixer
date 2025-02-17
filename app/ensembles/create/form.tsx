'use client';
import { ErrorMessage, Field, FieldArray, Form, Formik } from 'formik';
import * as Yup from 'yup';
import TextInput from '../../forms/textInput';
import axios from 'axios';
import { getBillingRoute } from '../../billing/api/manage/lib';
import { FaRegQuestionCircle } from 'react-icons/fa';
import ValidationError from '../../forms/validationError';
import SubmitButton from '../../forms/submitBtn';
import StatusMessage from '../../forms/statusMessage';
import { TiTimes } from 'react-icons/ti';

export default function CreateEnsembleForm(props: { userId: string }) {
  const { userId } = props;

  const formSchema = Yup.object().shape({
    name: Yup.string().required('Organisation name required'),
    ensembleNames: Yup.array()
      .of(Yup.string().required('Ensemble name required'))
      .required('Ensemble name(s) required')
      .min(1, 'You must provide at least one ensemble name.'),
    userId: Yup.string().required('User ID required'),
  });

  const initialVals = {
    name: '',
    ensembleNames: [''],
    userId: userId,
  };

  return (
    <div data-testid='create-ensemble-form' className='p-4'>
      <Formik
        initialValues={initialVals}
        validationSchema={formSchema}
        onSubmit={async (values, actions) => {
          actions.setStatus(null);
          await axios
            .post('create/api', values)
            .then(async (res) => {
              const checkout = await getBillingRoute(await res.data);
              window.location.href = checkout.data.url;
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
          <Form className='flex flex-col'>
            <TextInput
              disabled={props.isSubmitting}
              name={'name'}
              id='name-input'
              label='Organisation Name'
            />
            <div className='my-4'>
              <div className='flex flex-row items-center'>
                <label htmlFor='ensembleNames'>Ensemble Names</label>
                <button
                  className='z-10 ml-2 h-4 w-4 text-sm hover:cursor-pointer'
                  onClick={() =>
                    alert(
                      'Please list all of your ensemble names. It may be the same as your organisation name.'
                    )
                  }
                >
                  <FaRegQuestionCircle />
                </button>
              </div>
              <FieldArray
                name='ensembleNames'
                render={(arrayHelpers) => (
                  <div className='flex flex-col'>
                    {props.values.ensembleNames.map((j, index) => (
                      <div key={index} className='flex flex-col'>
                        <div className='flex flex-row'>
                          <Field
                            disabled={props.isSubmitting}
                            data-testid={`ensembleNames[${index}]`}
                            name={`ensembleNames[${index}]`}
                            id={`ensembleNames[${index}]`}
                            type='text'
                            className='my-1 h-8 w-80 max-w-[60vw] rounded border px-1 shadow-sm'
                          />
                          <button
                            data-testid={`remove-${index}`}
                            disabled={props.isSubmitting}
                            className='m-1 rounded-full border p-2 text-sm hover:bg-slate-50 disabled:opacity-40'
                            onClick={(e) => {
                              e.preventDefault();
                              props.values.ensembleNames.length > 1 &&
                                arrayHelpers.remove(index);
                            }}
                          >
                            <TiTimes />
                          </button>
                        </div>
                        <ErrorMessage name={`ensembleNames[${index}]`}>
                          {(msg) => (
                            <div
                              className='p-1 text-sm text-red-600'
                              data-testid={`${`ensembleNames[${index}]`}-error`}
                            >
                              {msg}
                            </div>
                          )}
                        </ErrorMessage>
                      </div>
                    ))}
                    <button
                      disabled={props.isSubmitting}
                      className='mt-4 w-24 rounded border p-1 text-sm'
                      onClick={(e) => {
                        e.preventDefault();
                        arrayHelpers.push('');
                      }}
                    >
                      Add Name
                    </button>
                  </div>
                )}
              />
            </div>
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
            <ValidationError errors={Object.values(props.errors).flat()} />
            <StatusMessage status={props.status} />
          </Form>
        )}
      </Formik>
    </div>
  );
}
