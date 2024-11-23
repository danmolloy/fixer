import { ErrorMessage, Field, FieldArray, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { TiTimes } from 'react-icons/ti';
import { instrumentSections } from '../../../../contacts/lib';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export type ContactInputProps = {
  contacts: {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    sectionName: string;
    role: string;
    category: string;
  }[];
  ensembleId: string;
};

export const phoneRegex = /^\+[1-9]\d{1,14}$/;

export default function ContactInput(props: ContactInputProps) {
  const { contacts, ensembleId } = props;
  const router = useRouter();

  const contactInputSchema = Yup.object().shape({
    contacts: Yup.array()
      .of(
        Yup.object({
          firstName: Yup.string().required('required'),
          lastName: Yup.string().required('required'),
          email: Yup.string().required('required'),
          phoneNumber: Yup.string()
            .matches(
              phoneRegex,
              'number must be international format, i.e. +445504281329'
            )
            .required('required'),
          sectionName: Yup.string().required('required'),
          role: Yup.string().required('required'),
          category: Yup.string().required('required'),
        })
      )
      .min(1),
    ensembleId: Yup.string().required(),
  });

  const handleSubmit = async (values) => {
    try {
      return await axios
        .post('/contacts/api/create/import', {
          values,
        })
        .then(() => {
          router.push(`/ensembles/${values.ensembleId}`);
        });
    } catch (e) {
      throw new Error(e);
    }
  };

  return (
    <Formik
      initialValues={{
        contacts: contacts,
        ensembleId: ensembleId,
      }}
      validationSchema={contactInputSchema}
      onSubmit={(values, actions) => {
        handleSubmit(values);
        actions.setSubmitting(false);
      }}
    >
      {(props) => (
        <Form data-testid='contact-input-form'>
          <FieldArray
            name='contacts'
            render={({ push, remove }) => (
              <div className='flex flex-col  px-2'>
                <div className='lg:flex lg:flex-col lg:items-center lg:justify-center '>
                  <table className='table-auto text-sm overflow-x-scroll'>
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
                              className='mx-0 rounded border border-black'
                              name={`contacts.${index}.sectionName`}
                              data-testid={`contacts.${index}.sectionName`}
                              as='select'
                            >
                              <option value={''}>select</option>
                              {instrumentSections.map((i) => (
                                <option value={i.name} key={i.id}>
                                  {i.name}
                                </option>
                              ))}
                            </Field>

                            <ErrorMessage
                              className='border'
                              name={`contacts.${index}.sectionName`}
                            >
                              {(e) => (
                                <p className='text-xs text-red-500'>{e}</p>
                              )}
                            </ErrorMessage>
                          </td>
                          <td className='border'>
                            <Field
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
                              disabled={props.values.contacts.length < 2}
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
                    className='m-1 rounded border border-black p-1 text-sm hover:bg-slate-50'
                    onClick={() =>
                      push({
                        firstName: '',
                        lastName: '',
                        email: '',
                        phoneNumber: '',
                        sectionName: '',
                        role: '',
                        category: '',
                      })
                    }
                  >
                    Add Row
                  </button>
                  <button
                    className='m-1 rounded border border-blue-600 p-1 text-sm text-blue-600 hover:bg-blue-50'
                    type='submit'
                  >
                    Submit
                  </button>
                </div>
              </div>
            )}
          />
        </Form>
      )}
    </Formik>
  );
}
