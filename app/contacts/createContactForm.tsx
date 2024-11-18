import { ErrorMessage, Field, Formik } from 'formik';
import { IoIosClose } from 'react-icons/io';
import TextInput from '../forms/textInput';
import * as Yup from 'yup';
import axios from 'axios';
import { EnsembleContact, EnsembleSection } from '@prisma/client';
import { categories, instrumentSections, rolesArr } from './lib';
import { CreateEnsembleContact } from './api/create/functions';
import { useRouter } from 'next/navigation';
import { phoneRegex } from '../ensembles/[id]/contacts/import/contactInput';

export type CreateContactFormProps = {
  ensembleId: string;
  sections: EnsembleSection[];
  closeForm: () => void;
  contact?: EnsembleContact & { section: EnsembleSection };
};

export type CreateEnsembleContactForm = {
  firstName: string;
  lastName: string;
  section: string;
  role: string;
  ensembleId: string;
  email: string;
  phone: string;
  category: string;
};

export default function CreateContactForm(props: CreateContactFormProps) {
  const { ensembleId, sections, closeForm, contact } = props;
  const router = useRouter();

  const initialValues: CreateEnsembleContactForm = {
    firstName: contact ? contact.firstName : '',
    lastName: contact ? contact.lastName : '',
    section: contact ? contact.section.name : '',
    role: contact ? contact.role : '',
    ensembleId: ensembleId,
    email: contact && contact.email !== null ? contact.email : '',
    phone: contact && contact.phoneNumber !== null ? contact.phoneNumber : '',
    category: contact && contact.category !== null ? contact.category : '',
  };

  const CreateContactSchema = Yup.object().shape({
    firstName: Yup.string().required('first name required'),
    lastName: Yup.string().required('last name required'),
    email: Yup.string().email().required('email required'),
    section: Yup.string().required('section required'),
    phone: Yup.string()
      .matches(
        phoneRegex,
        'number must be international format, i.e. +445504281329'
      )
      .required('phone number required'),
    role: Yup.string().required('role required'),
    category: Yup.string().required('category required'),
  });

  const handleSubmit = async (values: CreateEnsembleContact) => {
    try {
      return contact !== undefined
        ? await axios
            .post('/contacts/api/update', {
              updatedData: { ...values },
              contactId: contact.id,
            })
            .then(() => {
              router.refresh();
            })
        : await axios.post('/contacts/api/create', values).then(() => {
            router.refresh();
          });
    } catch (e) {
      throw new Error(e);
    }
  };

  return (
    <div
      data-testid='create-contact-form'
      className='absolute left-0 w-full items-center backdrop-blur'
    >
      <div className='m-4 flex flex-col rounded border bg-white p-4'>
        <div className='flex w-full flex-row justify-between'>
          <h2>{contact ? `Edit Contact` : `Create Contact`}</h2>
          <button
            data-testid='close-btn'
            onClick={() => closeForm()}
            className='rounded-full p-1 text-2xl hover:bg-slate-100'
          >
            <IoIosClose />
            <p className='hidden'>Close</p>
          </button>
        </div>
        <Formik
          initialValues={initialValues}
          validationSchema={CreateContactSchema}
          onSubmit={(values, actions) => {
            actions.setSubmitting(true);
            const section = {
              name: values.section,
              id:
                sections.find((i) => i.name === values.section)?.id ||
                undefined,
            };
            handleSubmit({ ...values, section: section }).then(() => {
              actions.setSubmitting(false);
              closeForm();
            });
          }}
        >
          {(props) => (
            <form className='flex flex-col' onSubmit={props.handleSubmit}>
              <TextInput label='First Name' id='first-name' name='firstName' />
              <TextInput label='Last Name' id='last-name' name='lastName' />
              <TextInput label='Email' id='email' name='email' type='email' />
              <TextInput label='Phone' id='phone' name='phone' type='phone' />
              <TextInput label='Role' id='role' name='role' />
              <TextInput label='Category' id='category' name='category' />

              <div className='flex flex-col'>
                <label htmlFor='section-select'>Section Select</label>
                <Field
                  id='section-select'
                  as='select'
                  name='section'
                  className='m-1 w-48 rounded border p-1'
                >
                  <option data-testid='section-blank' value={''}>
                    select
                  </option>
                  {instrumentSections.map((i) => (
                    <option
                      data-testid={`section-option-${i.id}`}
                      key={i.id}
                      value={i.name}
                    >
                      {i.name}
                    </option>
                  ))}
                </Field>
                <ErrorMessage name='section'>
                  {(msg) => (
                    <div
                      className='p-1 text-sm text-red-600'
                      data-testid={`section-error`}
                    >
                      {msg}
                    </div>
                  )}
                </ErrorMessage>
              </div>

              <button
                className='m-4 self-center rounded bg-indigo-600 px-2 py-1 text-white shadow hover:bg-indigo-500'
                disabled={props.isSubmitting}
                type='submit'
              >
                Submit
              </button>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
}
