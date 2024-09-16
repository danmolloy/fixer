'use client';
import { Ensemble } from '@prisma/client';
import axios from 'axios';
import { ErrorMessage, FieldArray, Form, Formik } from 'formik';
import TextInput from '../../forms/textInput';
import * as Yup from 'yup';
import { useRouter } from 'next/navigation';

export type UpdateEnsembleProps = {
  ensemble: Ensemble;
};

export default function UpdateEnsembleForm(props: UpdateEnsembleProps) {
  const { ensemble } = props;
  const router = useRouter();

  const formSchema = Yup.object().shape({
    name: Yup.string().required('Ensemble name required'),
    ensembleNames: Yup.array()
      .of(Yup.string())
      .required('Ensemble name(s) required')
      .min(1, 'You must provide at least one ensemble name.'),
  });

  const initialVals = {
    name: ensemble.name,
    ensembleNames: ensemble.ensembleNames,
    ensembleId: ensemble.id,
  };

  const handleSubmit = async (data: { name: string }) => {
    return await axios.post('update/api', data).then(() => {
      router.push('/ensembles');
    });
  };

  const handleDelete = async () => {
    return (
      confirm(`Are you sure you want to delete ${ensemble.name}?`) &&
      (await axios
        .post('/ensembles/delete', { ensembleId: ensemble.id })
        .then(() => {
          router.push('/ensembles');
        }))
    );
  };

  return (
    <div data-testid='update-ensemble-form' className='p-4'>
      <Formik
        initialValues={initialVals}
        validationSchema={formSchema}
        onSubmit={(values, actions) => {
          handleSubmit(values);
          actions.setSubmitting(false);
        }}
      >
        {(props) => (
          <Form>
            <TextInput name={'name'} id='name-input' label='Ensemble Name' />
            <div>
              <label htmlFor='ensembleNames'>Ensemble Names</label>
              <FieldArray
                name='ensembleNames'
                render={(arrayHelpers) => (
                  <div className=''>
                    {props.values.ensembleNames.map((j, index) => (
                      <div key={index}>
                        <TextInput
                          name={`ensembleNames[${index}]`}
                          id={`ensembleNames[${index}]`}
                          label=''
                        />
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            props.values.ensembleNames.length > 1 &&
                              arrayHelpers.remove(index);
                          }}
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        arrayHelpers.push('');
                      }}
                    >
                      Add
                    </button>
                  </div>
                )}
              />
              <ErrorMessage name='ensembleNames'>
                {(e) => <p className='text-sm text-red-500'>{e}</p>}
              </ErrorMessage>
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
      <button onClick={() => handleDelete()}>Delete</button>
    </div>
  );
}
