'use client';
import { Form, Formik } from 'formik';
import TextInput from '../../forms/textInput';
import * as Yup from 'yup';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { TiTimes } from 'react-icons/ti';
import ValidationError from '../../forms/validationError';
import SubmitButton from '../../forms/submitBtn';
import SubmissionError from '../../forms/statusMessage';
import StatusMessage from '../../forms/statusMessage';

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

  return (
    <div data-testid='join-form'>
      <Formik
        initialValues={initialVals}
        validationSchema={formSchema}
        onSubmit={async (values, actions) => {
          actions.setStatus(null);
          actions.setSubmitting(true);

          await axios
            .post('/ensembles/admin/api/join', values)
            .then(() => {
              router.push('/');
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
          <Form className='p-4'>
            <h1>Join Existing Ensemble</h1>
            <p>Enter the access code sent to your email address.</p>
            <TextInput
              disabled={props.isSubmitting}
              name='accessCode'
              id='access-code-input'
              label='Access Code'
            />
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
            <ValidationError errors={Object.values(props.errors)} />
            <StatusMessage status={props.status} />
          </Form>
        )}
      </Formik>
    </div>
  );
}
