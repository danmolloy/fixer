'use client';
import axios from 'axios';
import { Field, Form, Formik } from 'formik';
import { useRouter } from 'next/navigation';
import * as Yup from 'yup';
import TextInput from '../../../forms/textInput';
import { EnsembleAdmin, User } from '@prisma/client';
import ValidationError, { extractErrors } from '../../../forms/validationError';
import SubmitButton from '../../../forms/submitBtn';
import StatusMessage from '../../../forms/statusMessage';

export type InviteAdminFormProps = {
  admin: EnsembleAdmin & {
    user: User
  }

};

export default function UpdateAdminForm(props: InviteAdminFormProps) {
  const { admin } = props;
  const router = useRouter();

  const formSchema = Yup.object().shape({
    adminId: Yup.string().required('admin id required'),
    positionTitle: Yup.string().required('position title required'),
    accessType: Yup.string().required('choose access type'),
  });

  const initialVals = {
    adminId: admin.id,
    positionTitle: admin.positionTitle,
    accessType: admin.accessType,
  };

  return (
    <div
    data-testid='create-contact-form'
    className=' w-full items-center backdrop-blur'
  >
<div data-testid="update-admin-form" className='m-4 flex flex-col rounded  bg-white p-4'>
          <h2>Update Admin User</h2>
          <Formik
        initialValues={initialVals}
        validationSchema={formSchema}
        onSubmit={async (values, actions) => {
          actions.setSubmitting(true);
          actions.setStatus(null);
          await axios
            .post('/ensembles/admin/api/update', values)
            .then(() => {
              router.push(`/ensembles/${admin.ensembleId}`);
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
          <Form className='p-2'>
                      <h3 className='font-semibold'>{`${admin.user.firstName} ${admin.user.lastName}`}</h3>

            <TextInput
              disabled={props.isSubmitting}
              label='Position Title'
              id='position-title-input'
              name='positionTitle'
            />
            <div id='access-radio-group'>Access Type</div>
            <div
              className='flex flex-col'
              role='group'
              aria-labelledby='access-radio-group'
            >
              <label>
                <Field
                  disabled={props.isSubmitting}
                  type='radio'
                  name='accessType'
                  value='RESTRICTED'
                  className="m-1"
                />
                Restricted
              </label>
              <label>
                <Field
                  disabled={props.isSubmitting}
                  type='radio'
                  name='accessType'
                  value='FULL'
                  className="m-1"
                />
                Full
              </label>
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
    </div>
    </div>
  );
}
