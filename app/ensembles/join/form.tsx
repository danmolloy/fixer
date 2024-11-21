'use client';
import { Form, Formik } from 'formik';
import TextInput from '../../forms/textInput';
import * as Yup from 'yup';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export type JoinEnsembleFormProps = {
  userId: string;
};

export default function JoinEnsembleForm(props: JoinEnsembleFormProps) {
  const { userId } = props;
  const router = useRouter();

  const formSchema = Yup.object().shape({
    accessCode: Yup.string().required('Access code required'),
    userId: Yup.string().required('User ID required'),
  });

  const initialVals = {
    accessCode: '',
    userId: userId,
  };

  const handleSubmit = async (data: { accessCode: string; userId: string }) => {
    return await axios.post('/ensembles/admin/api/join', data).then(() => {
      router.push('/');
    });
  };

  return (
    <div data-testid='join-form'>
      <Formik
        initialValues={initialVals}
        validationSchema={formSchema}
        onSubmit={(values, actions) => {
          handleSubmit(values);
          actions.setSubmitting(false);
        }}
      >
        {(props) => (
          <Form className='p-4'>
            <h1>Join Existing Ensemble</h1>
            <p>Enter the access code sent to your email address.</p>
            <TextInput
              name='accessCode'
              id='access-code-input'
              label='Access Code'
            />
            <button type='submit' className='bg-blue-600 hover:bg-blue-500 text-white px-2 py-1 m-2 rounded shadow-sm'>Submit</button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
