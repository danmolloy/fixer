'use client';
import { ErrorMessage, FieldArray, Form, Formik } from 'formik';
import * as Yup from 'yup';
import TextInput from '../../forms/textInput';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function CreateEnsembleForm(props: { userId: string }) {
  const router = useRouter();
  const { userId } = props;

  const formSchema = Yup.object().shape({
    name: Yup.string().required('Organisation name required'),
    ensembleNames: Yup.array()
      .of(Yup.string().required('Field cannot be left blank'))
      .required('Ensemble name(s) required')
      .min(1, 'You must provide at least one ensemble name.'),
    userId: Yup.string().required('User ID required'),
  });

  const initialVals = {
    name: '',
    ensembleNames: [''],
    userId: userId,
  };

  const handleSubmit = async (data: { name: string }) => {
    return await axios.post('create/api', data).then(() => {
      router.push('/billing');
    });
  };

  return (
    <div data-testid='create-ensemble-form' className='p-4'>
      <Formik
        initialValues={initialVals}
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
              id='name-input'
              label='Organisation Name'
            />
            <div className='my-4'>
              <label htmlFor='ensembleNames'>Ensemble Names</label>
              <FieldArray
                name='ensembleNames'
                render={(arrayHelpers) => (
                  <div className='flex flex-col'>
                    {props.values.ensembleNames.map((j, index) => (
                      <div key={index}>
                        <TextInput
                          name={`ensembleNames[${index}]`}
                          id={`ensembleNames[${index}]`}
                          label=''
                        />
                        <button
                          className='rounded border p-1 text-sm'
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
    </div>
  );
}
