import { ErrorMessage, Field, FieldArray, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { TiTimes } from 'react-icons/ti';
import { instrumentSections } from '../../../../contacts/lib';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import ValidationError from '../../../../forms/validationError';
import SubmitButton from '../../../../forms/submitBtn';
import StatusMessage from '../../../../forms/statusMessage';
import { EnsembleSection } from '@prisma/client';

export type ContactInputProps = {
  contacts: {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    sectionId: string;
    role: string;
    category: string;
  }[];
  ensembleId: string;
  sections: EnsembleSection[];
};

export const phoneRegex = /^\+[1-9]\d{1,14}$/;

export default function ContactInput(props: ContactInputProps) {
  const { contacts, ensembleId, sections } = props;
  const router = useRouter();

  const contactInputSchema = Yup.object().shape({
    contacts: Yup.array()
      .of(
        Yup.object({
          firstName: Yup.string().required('first name required'),
          lastName: Yup.string().required('last name required'),
          email: Yup.string().required('email required'),
          phoneNumber: Yup.string()
            .matches(
              phoneRegex,
              'number must be international format, i.e. +445504281329'
            )
            .required('phone number required'),
          sectionId: Yup.string().required('section required'),
          role: Yup.string().required('role required'),
          category: Yup.string().required('category required'),
        })
      )
      .min(1),
    ensembleId: Yup.string().required('ensemble ID required. Contact GigFix.'),
  });

  return (
    <Formik
      initialValues={{
        contacts: contacts,
        ensembleId: ensembleId,
      }}
      validationSchema={contactInputSchema}
      onSubmit={async (values, actions) => {
        actions.setSubmitting(true);
        actions.setStatus(null);
        await axios
          .post('/contacts/api/create/import', {
            values,
          })
          .then(() => {
            router.push(`/ensembles/${values.ensembleId}`);
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
        <Form data-testid='contact-input-form'>
          <FieldArray
            name='contacts'
            render={({ push, remove }) => (
              <div className='flex flex-col px-2'>
                <div className='lg:flex lg:flex-col lg:items-center lg:justify-center'>
                  <table className='table-auto overflow-x-scroll text-sm'>
                    <thead>
                      <tr data-testid='table-head-row'>
                        <th className='border'>First Name</th>
                        <th className='border'>Last Name</th>
                        <th className='border'>Email</th>
                        <th className='border'>Phone Number</th>
                        <th className='border'>Role</th>
                        <th className='border'>Section</th>
                        <th className='border'>Category</th>
                        <th className='border'></th>
                      </tr>
                    </thead>

                    <tbody data-testid='table-body'>
                      {props.values.contacts.map((i, index) => (
                        <tr className='border' key={index}>
                          <td className='border'>
                            <Field
                              disabled={props.isSubmitting}
                              className='mx-0 rounded border border-black'
                              name={`contacts.${index}.firstName`}
                              data-testid={`contacts.${index}.firstName`}
                            />
                            <ErrorMessage
                              className='mx-0 rounded border border-black'
                              name={`contacts.${index}.firstName`}
                            >
                              {(e) => (
                                <p className='text-xs text-red-500'>{e}</p>
                              )}
                            </ErrorMessage>
                          </td>
                          <td className='border'>
                            <Field
                              disabled={props.isSubmitting}
                              data-testid={`contacts.${index}.lastName`}
                              className='mx-0 rounded border border-black'
                              name={`contacts.${index}.lastName`}
                            />
                            <ErrorMessage name={`contacts.${index}.lastName`}>
                              {(e) => (
                                <p className='text-xs text-red-500'>{e}</p>
                              )}
                            </ErrorMessage>
                          </td>
                          <td className='border'>
                            <Field
                              disabled={props.isSubmitting}
                              className='mx-0 rounded border border-black'
                              name={`contacts.${index}.email`}
                              data-testid={`contacts.${index}.email`}
                            />
                            <ErrorMessage name={`contacts.${index}.email`}>
                              {(e) => (
                                <p className='text-xs text-red-500'>{e}</p>
                              )}
                            </ErrorMessage>
                          </td>
                          <td className='border'>
                            <Field
                              disabled={props.isSubmitting}
                              className='mx-0 rounded border border-black'
                              name={`contacts.${index}.phoneNumber`}
                              data-testid={`contacts.${index}.phoneNumber`}
                            />
                            <ErrorMessage
                              name={`contacts.${index}.phoneNumber`}
                            >
                              {(e) => (
                                <p className='text-xs text-red-500'>{e}</p>
                              )}
                            </ErrorMessage>
                          </td>
                          <td className='border'>
                            <Field
                              disabled={props.isSubmitting}
                              className='mx-0 rounded border border-black'
                              name={`contacts.${index}.role`}
                              data-testid={`contacts.${index}.role`}
                            />
                            <ErrorMessage name={`contacts.${index}.role`}>
                              {(e) => (
                                <p className='text-xs text-red-500'>{e}</p>
                              )}
                            </ErrorMessage>
                          </td>
                          <td className='flex flex-col items-start border'>
                            <Field
                              disabled={props.isSubmitting}
                              className='mx-0 rounded border border-black'
                              name={`contacts.${index}.sectionId`}
                              data-testid={`contacts.${index}.sectionId`}
                              as='select'
                            >
                              <option value={''}>select</option>
                              {sections.map((i) => (
                                <option value={i.id} key={i.id}>
                                  {i.name}
                                </option>
                              ))}
                            </Field>
                            <ErrorMessage
                              className='border'
                              name={`contacts.${index}.sectionId`}
                            >
                              {(e) => (
                                <p className='text-xs text-red-500'>{e}</p>
                              )}
                            </ErrorMessage>
                          </td>
                          <td className='border'>
                            <Field
                              disabled={props.isSubmitting}
                              className='mx-0 rounded border border-black'
                              name={`contacts.${index}.category`}
                              data-testid={`contacts.${index}.category`}
                            />
                            <ErrorMessage name={`contacts.${index}.category`}>
                              {(e) => (
                                <p className='text-xs text-red-500'>{e}</p>
                              )}
                            </ErrorMessage>
                          </td>
                          <td className='border'>
                            <button
                              data-testid={`contacts.${index}.remove`}
                              className='disabled:opacity-40'
                              disabled={
                                props.values.contacts.length < 2 ||
                                props.isSubmitting
                              }
                              onClick={() => remove(index)}
                            >
                              <TiTimes />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {props.errors.contacts && (
                  <p className='text-center text-xs'>
                    Missing fields are stated in red in the table.
                  </p>
                )}
                <div className='flex flex-row items-center justify-between'>
                  <button
                    disabled={props.isSubmitting}
                    className='m-1 rounded border border-black p-1 text-sm hover:bg-slate-50'
                    onClick={() =>
                      push({
                        firstName: '',
                        lastName: '',
                        email: '',
                        phoneNumber: '',
                        sectionId: '',
                        role: '',
                        category: '',
                      })
                    }
                  >
                    Add Row
                  </button>
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
                </div>
                <StatusMessage status={props.status} />
              </div>
            )}
          />
        </Form>
      )}
    </Formik>
  );
}
