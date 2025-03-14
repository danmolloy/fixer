'use client';
import { Ensemble } from '@prisma/client';
import axios from 'axios';
import { ErrorMessage, FieldArray, Form, Formik } from 'formik';
import TextInput from '../../forms/textInput';
import * as Yup from 'yup';
import { useRouter } from 'next/navigation';
import SubmitButton from '../../forms/submitBtn';
import ValidationError, { extractErrors } from '../../forms/validationError';
import StatusMessage from '../../forms/statusMessage';
import { TiTimes } from 'react-icons/ti';

export type UpdateEnsembleProps = {
  ensemble: Ensemble;
};

export default function UpdateEnsembleForm(props: UpdateEnsembleProps) {
  const { ensemble } = props;
  const router = useRouter();

  const formSchema = Yup.object().shape({
    name: Yup.string().required('Organisation name required'),
    ensembleNames: Yup.array()
      .of(Yup.string().required('Ensemble name required'))
      .required('Ensemble name(s) required')
      .min(1, 'You must provide at least one ensemble name.'),
  });

  const initialVals = {
    name: ensemble.name,
    ensembleNames: ensemble.ensembleNames,
    ensembleId: ensemble.id,
  };

  const handleDelete = async () => {
    return (
      confirm(`Are you sure you want to delete ${ensemble.name}?`) &&
      (await axios
        .post('/ensembles/delete', { ensembleId: ensemble.id })
        .then(() => {
          router.push('/');
        }))
    );
  };

  return (
    <div data-testid='update-ensemble-form' className='p-4'>
      <Formik
        initialValues={initialVals}
        validationSchema={formSchema}
        onSubmit={async (values, actions) => {
          actions.setStatus(null);
          await axios
            .post('update/api', values)
            .then(() => {
              router.push(`/ensembles/${ensemble.id}`);
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
          <Form>
            <TextInput
              disabled={props.isSubmitting}
              name={'name'}
              id='name-input'
              label='Ensemble Name'
            />
            <div className='mb-4'>
              <label htmlFor='ensembleNames'>Ensemble Names</label>
              <FieldArray
                name='ensembleNames'
                render={(arrayHelpers) => (
                  <div className=''>
                    {props.values.ensembleNames.map((j, index) => (
                      <div key={index} className='flex flex-row justify-start items-start'>
                        <TextInput
                          disabled={props.isSubmitting}
                          name={`ensembleNames[${index}]`}
                          id={`ensembleNames[${index}]`}
                          label=''
                        />
                        <button
                          className='m-1 rounded-full border p-1 text-sm hover:bg-slate-50 disabled:opacity-40'
                          disabled={props.isSubmitting}
                          onClick={(e) => {
                            e.preventDefault();
                            props.values.ensembleNames.length > 1 &&
                              arrayHelpers.remove(index);
                          }}
                        >
                          <TiTimes />
                        </button>
                      </div>
                    ))}
                    <button
                    className="my-2 w-24 rounded border p-1 text-sm"
                      disabled={props.isSubmitting}
                      onClick={(e) => {
                        e.preventDefault();
                        arrayHelpers.push('');
                      }}
                    >
                      Add name
                    </button>
                  </div>
                )}
              />
              <ErrorMessage name='ensembleNames'>
                {(e) => <p className='text-sm text-red-500'>{e}</p>}
              </ErrorMessage>
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
            <ValidationError errors={extractErrors(props.errors)} />
            <StatusMessage status={props.status} />
          </Form>
        )}
      </Formik>
      <button onClick={() => handleDelete()} className='text-red-500 border border-red-500 p-2 rounded'>Delete Ensemble</button>
    </div>
  );
}
