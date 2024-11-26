'use client';
import { ErrorMessage, FieldArray, Form, Formik } from 'formik';
import * as Yup from 'yup';
import TextInput from '../../forms/textInput';
import axios from 'axios';
import { getBillingRoute } from '../../billing/api/manage/lib';
import { FaRegQuestionCircle } from "react-icons/fa";
import ValidationError from '../../forms/validationError';
import SubmitButton from '../../forms/submitBtn';
import StatusMessage from '../../forms/statusMessage';

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
          await axios.post('create/api', values).then(async (res) => {
            const checkout = await getBillingRoute(await res.data.id);
            window.location.href = checkout.data.url;
            actions.setStatus("success");
          }).catch((error) => {
            const errorMessage = error.response.data.error || 'An unexpected error occurred.';
            actions.setStatus(errorMessage);
          }).finally(() => {
            actions.setSubmitting(false);
          })
          
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
              <div className='-mb-4 flex flex-row items-center'>
              <label htmlFor='ensembleNames'>Ensemble Names</label>
              <button
              className=' text-sm ml-2 hover:cursor-pointer  w-4 h-4 z-10'  
                onClick={() => alert(
                  "Please list all of your ensemble names. It may be the same as your organisation name.")}
                  >
                    <FaRegQuestionCircle />
                </button>
                </div>
              <FieldArray
                name='ensembleNames'
                render={(arrayHelpers) => (
                  <div className='flex flex-col'>
                    {props.values.ensembleNames.map((j, index) => (
                      <div key={index}>
                        <TextInput
                        disabled={props.isSubmitting}
                          name={`ensembleNames[${index}]`}
                          id={`ensembleNames[${index}]`}
                          label=''
                        />
                        <button
                        disabled={props.isSubmitting}
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
            <SubmitButton disabled={props.isSubmitting} />
            <ValidationError errors={Object.values(props.errors).flat()} />
            <StatusMessage status={props.status} />
          </Form>
        )}
      </Formik>
    </div>
  );
}
