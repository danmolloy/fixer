import { ErrorMessage, Field, Formik } from 'formik';
import { IoIosClose } from 'react-icons/io';
import TextInput from '../forms/textInput';
import * as Yup from 'yup';
import axios from 'axios';
import { EnsembleContact, EnsembleSection } from '@prisma/client';
import { categories, instrumentSections, rolesArr } from './lib';
import { CreateEnsembleContact } from './api/create/functions';

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
    phone: Yup.string().required('phone number required'),
    role: Yup.string().required('role required'),
    category: Yup.string().required('category required'),
  });

  const handleSubmit = async (values: CreateEnsembleContact) => {
    return contact !== undefined
      ? await axios.post('/contacts/api/update', { ...values, id: contact.id })
      : await axios.post('/contacts/api/create', values);
  };

  return (
    <div
      data-testid='create-contact-form'
      className='absolute w-full items-center backdrop-blur'
    >
      <div className='m-4 flex flex-col rounded border bg-white p-4'>
        <div className='flex w-full flex-row justify-between'>
          <h2>Create Contact</h2>
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
              <label htmlFor='role-select'>Role</label>
              <Field
                id='role-select'
                as='select'
                name='role'
                className='m-1 w-48 rounded border p-1'
              >
                <option value={''}>select</option>

                {rolesArr.map((i) => (
                  <option
                    data-testid={`role-option-${i.id}`}
                    key={i.id}
                    value={i.name}
                  >
                    {i.name}
                  </option>
                ))}
              </Field>
              <ErrorMessage name='role'>
                {(msg) => (
                  <div
                    className='p-1 text-sm text-red-600'
                    data-testid={`role-error`}
                  >
                    {msg}
                  </div>
                )}
              </ErrorMessage>
              <label htmlFor='category-select'>Category</label>
              <Field
                id='category-select'
                as='select'
                name='category'
                className='m-1 w-48 rounded border p-1'
              >
                <option value={''}>select</option>
                {categories.map((i) => (
                  <option
                    data-testid={`category-option-${i.id}`}
                    key={i.id}
                    value={i.name}
                  >
                    {i.name}
                  </option>
                ))}
              </Field>
              <ErrorMessage name='category'>
                {(msg) => (
                  <div
                    className='p-1 text-sm text-red-600'
                    data-testid={`category-error`}
                  >
                    {msg}
                  </div>
                )}
              </ErrorMessage>

              <div>
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

              {/* 
                  <div className="mt-4">
                    <p id="section-radio">Section</p>
          <div role="group" aria-labelledby="section-radio" className="flex  flex-col">
            <label className="m-2">
              <Field type="radio" name="section.option" value="select" />
              Select section
            </label>
            {props.values.section.option === "select" && 
                <>
                <label htmlFor="section-select" className="text-sm">Choose section</label>
                <Field as="select" name="section.id" className="border p-1 m-1 rounded w-48">
                  <option value={undefined}>select</option>
                {sections.map(i => (
                  <option key={i.id} value={i.id}>{i.name}</option>))}
                </Field>
                  <ErrorMessage name="section.id">
                    {msg => <div className="p-1 text-red-600 text-sm" data-testid={`instrument-error`}>{msg}</div> }
                  </ErrorMessage>
                  </>}
            <label className="m-2">
              <Field type="radio" onClick={() => props.setFieldValue("section.id", undefined)} name="section.option" value="create" />
              Create section
            </label>
            {props.values.section.option === "create" &&
            <div className="flex flex-col">
            <TextInput label="Section Name" id="section-name" name="section.name" />
            <label htmlFor="instrument-select" className=" text-sm">Section Instrument</label>
            <Field as="select" name="section.instrument" className="border p-1 m-1 rounded w-48">
              <option value={""}>select</option>
              {instrumentSections.map(i => (
                <option key={i.id} value={i.name}>{i.name}</option>
              ))}

                </Field>
            <ErrorMessage name="section.instrument">
              {msg => <div className="p-1 text-red-600 text-sm" data-testid={`instrument-error`}>{msg}</div> }
            </ErrorMessage>
            </div>
            }
          </div>
</div>       */}
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
