'use client';
import { EnsembleSection, EventSection } from '@prisma/client';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import TextInput from '../../forms/textInput';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { buttonPrimary } from '../../ensembles/dashboard';
import SubmitButton from '../../forms/submitBtn';
import ValidationError from '../../forms/validationError';
import StatusMessage from '../../forms/statusMessage';

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
      return await axios.post('/fixing/eventSection/api/update', {
        ...vals,
        eventSectionId: eventSectionId,
      });
    } else {
      return await axios.post('/fixing/eventSection/api/create', vals);
    }
  };

  const handleDelete = async () => {
    return (
      confirm(`Are you sure you want to delete this section?`) &&
      (await axios.post('/fixing/eventSection/api/delete', {
        sectionId: Number(eventSectionId),
      }))
    );
  };

  return (
    <div
      data-testid='create-event-section'
      className='m-2 flex flex-col rounded border p-2'
    >
      <Formik
        initialValues={initialVals}
        onSubmit={async (values, actions) => {
          actions.setStatus(null);

          await handleSubmit(values)
            .then(() => {
              actions.setStatus("success");

              //setCreateSection(false);
            })
            .catch((error) => {
              const errorMessage =
                error.response.data.error || 'An unexpected error occurred.';
              actions.setStatus(errorMessage);
            })
            .finally(() => {
              actions.setSubmitting(false);
              router.refresh();

            });
        }}
        validationSchema={formSchema}
      >
        {(props) => (
          <Form className=''>
            <h3 className='my-2'>
              {ensembleSections.find((i) => i.id === ensembleSectionId)?.name ||
                'Create new section'}
            </h3>
            {ensembleSectionId === undefined && (
              <div className='flex flex-col'>
                <label htmlFor='ensembleSectionId'>Section</label>
                <Field
                  disabled={props.isSubmitting}
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
              disabled={props.isSubmitting}
              className='w-60'
              type='number'
              name='numToBook'
              id='numtobook-input'
              label='Num to Book'
            />
            <div
              role='group'
              aria-labelledby='my-radio-group'
              className='flex flex-col'
            >
              <label>Fixing Status</label>
              <label>
                <Field
                  disabled={props.isSubmitting}
                  className='m-1'
                  type='radio'
                  name='bookingStatus'
                  value='active'
                />
                Active
              </label>
              <label>
                <Field
                  disabled={props.isSubmitting}
                  className='m-1'
                  type='radio'
                  name='bookingStatus'
                  value='inactive'
                />
                Inactive
              </label>
            </div>
            <div className='my-4 flex flex-row items-center'>
              <button
                disabled={props.isSubmitting}
                className={`h-8 rounded border px-2 py-1 text-sm hover:bg-slate-50 disabled:opacity-40`}
                onClick={(e) => {
                  e.preventDefault();
                  setCreateSection(false);
                }}
              >
                Cancel
              </button>
              <SubmitButton 
              disabled={props.isSubmitting || props.status === "success"} 
              status={props.isSubmitting ? 'SUBMITTING': props.status === "success" ? "SUCCESS" : undefined} />
            </div>
            <ValidationError errors={Object.values(props.errors)} />
            <StatusMessage status={props.status} />
          </Form>
        )}
      </Formik>
      {ensembleSections.find((i) => i.id === ensembleSectionId)?.name && (
        <button
          className='mx-1 w-32 rounded border border-red-500 py-1 text-sm text-red-500 hover:bg-red-50'
          data-testid='delete-section'
          onClick={() => handleDelete()}
        >
          Delete Section
        </button>
      )}
    </div>
  );
}
