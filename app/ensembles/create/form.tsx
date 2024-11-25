'use client';
import { ErrorMessage, FieldArray, Form, Formik } from 'formik';
import * as Yup from 'yup';
import TextInput from '../../forms/textInput';
import axios from 'axios';
import { getBillingRoute } from '../../billing/api/manage/lib';
import { FaRegQuestionCircle } from "react-icons/fa";
import ValidationError from '../../forms/validationError';
import SubmitButton from '../../forms/submitBtn';

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

  const handleSubmit = async (data: { name: string }) => {
    try {
      const newEnsemble = await axios.post('create/api', data);
      getBillingRoute(await newEnsemble.data.id);
      const response = await getBillingRoute(await newEnsemble.data.id);
      window.location.href = response.data.url;
    } catch (e) {
      throw new Error(e);
    }
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
          </Form>
        )}
      </Formik>
    </div>
  );
}
