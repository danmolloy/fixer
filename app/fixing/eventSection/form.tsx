'use client';
import {
  BookingStatus,
  Call,
  EnsembleSection,
  EventSection,
  Orchestration,
} from '@prisma/client';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import TextInput from '../../forms/textInput';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { buttonPrimary } from '../../ensembles/dashboard';
import SubmitButton from '../../forms/submitBtn';
import ValidationError, { extractErrors } from '../../forms/validationError';
import StatusMessage from '../../forms/statusMessage';
import { useEffect, useState } from 'react';
import { DateTime } from 'luxon';

export type CreateEventSectionProps = {
  eventId: number;
  eventCalls: Call[];
  ensembleSections: EnsembleSection[];
  setCreateSection: (arg: boolean) => void;
  ensembleSectionId: undefined | string;
  bookingStatus: BookingStatus;
  //numToBook: number;
  eventSectionId: number | undefined;
  eventSections: (EventSection & { ensembleSection: EnsembleSection })[];
  orchestration: Orchestration[];
};

export default function CreateEventSection(props: CreateEventSectionProps) {
  const {
    eventCalls,
    eventId,
    ensembleSections,
    setCreateSection,
    ensembleSectionId,
    bookingStatus,
    //numToBook,
    eventSectionId,
    eventSections,
    orchestration,
  } = props;
  const [fixedNumToBook, setFixedNumToBook] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    const orchArray = new Array(eventCalls.length)
      .fill(null)
      .map((i, index) => ({
        numRequired:
          orchestration.find((j) => j.callId === eventCalls[index].id)
            ?.numRequired || 0, //numToBook
      }));
    setFixedNumToBook(
      orchArray.every((i) => i.numRequired === orchArray[0].numRequired)
    );
  }, []);

  const formSchema = Yup.object().shape({
    eventId: Yup.number().required('event id required'),
    ensembleSectionId: Yup.string().required('ensemble section id required'),
    bookingStatus: Yup.string().required(),

    orchestration: Yup.array().of(
      Yup.object({
        callId: Yup.number().required(),
        id: Yup.number(),
        numRequired: Yup.number()
          .min(0)
          .max(50)
          .required('number of musicians required'),
      })
    ),
  });

  const initialVals = {
    eventId: eventId,
    ensembleSectionId: ensembleSectionId,
    bookingStatus: bookingStatus,
    orchestration: new Array(eventCalls.length).fill(null).map((i, index) => ({
      callId: eventCalls[index].id,
      id:
        orchestration.find((j) => j.callId === eventCalls[index].id)?.id ||
        undefined,
      numRequired:
        orchestration.find((j) => j.callId === eventCalls[index].id)
          ?.numRequired || 0,
    })),
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
      (await axios
        .post('/fixing/eventSection/api/delete', {
          sectionId: Number(eventSectionId),
        })
        .then(() => {
          setCreateSection(false);
          router.refresh();
        })
        .catch((error) => {
          const errorMessage =
            error.response.data.error || 'An unexpected error occurred.';
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
              actions.setStatus('success');

              setCreateSection(false);
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
            <div className='mb-2 mt-4 flex flex-col'>
              <label htmlFor='num-required'>Num Required</label>
              <Field
                className='m-1 w-32 rounded border p-1 shadow-sm'
                id='num-required'
                name='orchestration[0].numRequired' // Always provide a valid name
                disabled={!fixedNumToBook || props.isSubmitting}
                type='number'
                onChange={(e) => {
                  if (fixedNumToBook) {
                    props.setFieldValue(
                      `orchestration[0].numRequired`,
                      e.target.value
                    );
                    props.setFieldValue(
                      'orchestration',
                      props.values.orchestration.map((i, index) => ({
                        ...i,
                        numRequired: e.target.value, // Ensuring all rows update when fixedNumToBook is true
                      }))
                    );
                  }
                }}
              />
            </div>

            <ErrorMessage name='orchestration[0].numRequired'>
              {(msg) => (
                <div
                  className='p-1 text-sm text-red-600'
                  data-testid='orchestration-error'
                >
                  {msg}
                </div>
              )}
            </ErrorMessage>
            <div className='my-2 mb-4'>
              <label htmlFor='fixed-num-required-checkbox'>
                <input
                  id='fixed-num-required-checkbox'
                  disabled={props.isSubmitting}
                  className='mr-2'
                  type='checkbox'
                  onChange={() => {
                    setFixedNumToBook(!fixedNumToBook);
                    if (!fixedNumToBook) {
                      // If toggling ON, apply the first value to all
                      props.setFieldValue(
                        'orchestration',
                        props.values.orchestration.map((i) => ({
                          ...i,
                          numRequired:
                            props.values.orchestration[0]?.numRequired || '',
                        }))
                      );
                    }
                  }}
                  checked={fixedNumToBook}
                />
                {`${fixedNumToBook ? props.values.orchestration[0].numRequired : '-'} musician(s) for all calls`}
              </label>
              {!fixedNumToBook && (
                <div data-testid='calls-num-required'>
                  {props.values.orchestration.map((i, index) => (
                    <div key={index} className="flex flex-col py-2">
                      <label>
                        {eventCalls.find(j => j.id === i.callId)?.startTime
                          && DateTime.fromJSDate(new Date(eventCalls.find(j => j.id === i.callId)!.startTime)).toFormat("HH:mm dd LLL yyyy")
                          }
                      </label>
                      <Field
                        className='w-60 rounded border p-1'
                        type='number'
                        name={`orchestration[${index}].numRequired`}
                      />
                      <ErrorMessage
                        name={`orchestration[${index}].numRequired`}
                      >
                        {(msg) => (
                          <div className='p-1 text-sm text-red-600'>{msg}</div>
                        )}
                      </ErrorMessage>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div
              role='group'
              aria-labelledby='my-radio-group'
              className='flex flex-col'
            >
              <label>Fixing Status</label>
              <label htmlFor='fixing-active'>
                <Field
                  id='fixing-active'
                  disabled={props.isSubmitting}
                  className='m-1'
                  type='radio'
                  name='bookingStatus'
                  value='ACTIVE'
                />
                Active
              </label>
              <label htmlFor='fixing-inactive'>
                <Field
                  id='fixing-inactive'
                  disabled={props.isSubmitting}
                  className='m-1'
                  type='radio'
                  name='bookingStatus'
                  value='INACTIVE'
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
            <ValidationError errors={extractErrors(props.errors)} />

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
