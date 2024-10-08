'use client';
import { EnsembleSection, EventSection } from '@prisma/client';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import TextInput from '../../forms/textInput';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { buttonPrimary } from '../../ensembles/dashboard';

export type CreateEventSectionProps = {
  eventId: number;
  ensembleSections: EnsembleSection[];
  setCreateSection: (arg: boolean) => void;
  ensembleSectionId: undefined | string;
  bookingStatus: string;
  numToBook: number;
  eventSectionId: number | undefined;
  eventSections: (EventSection & { ensembleSection: EnsembleSection })[];
};

export default function CreateEventSection(props: CreateEventSectionProps) {
  const {
    eventId,
    ensembleSections,
    setCreateSection,
    ensembleSectionId,
    bookingStatus,
    numToBook,
    eventSectionId,
    eventSections,
  } = props;
  const router = useRouter();

  const formSchema = Yup.object().shape({
    eventId: Yup.number().required('event id required'),
    ensembleSectionId: Yup.string().required('ensemble section id required'),
    bookingStatus: Yup.string().required(),
    numToBook: Yup.number()
      .min(0)
      .max(50)
      .required('number of musicians required'),
  });

  const initialVals = {
    eventId: eventId,
    ensembleSectionId: ensembleSectionId,
    bookingStatus: bookingStatus,
    numToBook: numToBook,
  };

  const handleSubmit = async (vals) => {
    if (eventSectionId !== undefined) {
      return await axios
        .post('/fixing/eventSection/api/update', {
          ...vals,
          eventSectionId: eventSectionId,
        })
        .then(() => {
          router.refresh();
          setCreateSection(false);
        });
    } else {
      return await axios
        .post('/fixing/eventSection/api/create', vals)
        .then(() => {
          router.refresh();
          setCreateSection(false);
        });
    }
  };

  return (
    <div data-testid='create-event-section'>
      <Formik
        initialValues={initialVals}
        onSubmit={(values, actions) => {
          handleSubmit(values);
          actions.setSubmitting(false);
        }}
        validationSchema={formSchema}
      >
        {(props) => (
          <Form className='m-2 flex flex-col rounded border p-2'>
            <h3 className='my-2'>
              {ensembleSections.find((i) => i.id === ensembleSectionId)?.name ||
                'Create new section'}
            </h3>
            {ensembleSectionId === undefined && (
              <div className='flex flex-col'>
                <label htmlFor='ensembleSectionId'>Section</label>
                <Field
                  className='my-1 w-60 rounded border p-1 shadow-sm'
                  as='select'
                  name='ensembleSectionId'
                  data-testid='section-select'
                >
                  <option value={''}>select section</option>
                  {ensembleSections
                    .filter(
                      (i) =>
                        !eventSections
                          .map((j) => j.ensembleSectionId)
                          .includes(i.id)
                    )
                    .map((i) => (
                      <option key={i.id} value={i.id}>
                        {i.name}
                      </option>
                    ))}
                </Field>
                <ErrorMessage name={'ensembleSectionId'}>
                  {(msg) => (
                    <div
                      className='p-1 text-sm text-red-600'
                      data-testid={`$ensembleSectionId-error`}
                    >
                      {msg}
                    </div>
                  )}
                </ErrorMessage>
              </div>
            )}
            <TextInput
              className='w-60'
              type='number'
              name='numToBook'
              id='numtobook-input'
              label='Num to Book'
            />
            <div className='my-4 flex flex-row'>
              <button
                className={buttonPrimary}
                onClick={(e) => {
                  e.preventDefault();
                  setCreateSection(false);
                }}
              >
                Cancel
              </button>
              <button
                className='rounded bg-indigo-500 px-2 py-1 text-sm text-white hover:bg-indigo-600'
                type='submit'
              >
                Submit
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
