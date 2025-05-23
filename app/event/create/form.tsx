'use client';
import { ErrorMessage, Field, FieldArray, Formik } from 'formik';
import { v4 as uuidv4 } from 'uuid';
import * as Yup from 'yup';
import TextInput from '../../forms/textInput';
import React from 'react';
import CallInput from './callInput';
import ButtonPrimary from '../../forms/buttonPrimary';
import GigStatus from './gigStatus';
import { EnsembleAdmin, Prisma, Ensemble, User } from '@prisma/client';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import SubmitButton from '../../forms/submitBtn';
import StatusMessage from '../../forms/statusMessage';
import { DateTime } from 'luxon';

export type EventWithCallsAndEnsemble = Prisma.EventGetPayload<{
  include: {
    calls: true;
    ensemble: true;
  };
}>;

export type CreateEventFormProps = {
  ensembleList: (Ensemble & {
    admin: (EnsembleAdmin & {
      user: User;
    })[];
  })[];
  initialValues?: EventWithCallsAndEnsemble;
  userId: string;
  userName: string;
  createOrUpdate: 'Create' | 'Update';
};

const toLocalInputFormat = (utcDate: Date | string) => {
 return DateTime.fromJSDate(new Date(utcDate)).setZone('local').toFormat("yyyy-MM-dd'T'HH:mm");
}

export default function CreateEventForm(props: CreateEventFormProps) {
  const { createOrUpdate, ensembleList, initialValues, userId, userName } =
    props;
  const router = useRouter();

  const EventSchema = Yup.object().shape({
    createOrUpdate: Yup.string().required(),
    updateMessage: Yup.string().when('createOrUpdate', {
      is: 'Update',
      then: (schema) =>
        schema.required(
          'Required: message to players explaining what has been changed'
        ),
    }),
    fixerId: Yup.string().required('Fixer selection required'),
    id: Yup.string(),
    status: Yup.string().required('Event confirmation status required'),
    ensembleName: Yup.string().required('Ensemble name required'),
    ensembleId: Yup.string().required('Select ensemble'),
    eventTitle: Yup.string().required('Event title required'),
    concertProgram: Yup.string().required('Concert program required'),
    calls: Yup.array().of(
      Yup.object({
        id: Yup.string(),
        startTime: Yup.string().required('Call start time required'),
        endTime: Yup.string().required('Call end time required'),
        venue: Yup.string().required('Venue required'),
        info: Yup.string(),
      })
    ),
    dressCode: Yup.string(),
    fee: Yup.string(),
    additionalInfo: Yup.string(),
    adminAccess: Yup.array().of(Yup.string()),
  });

  return (
    <div
      data-testid='create-event-form'
      className='my-4 flex w-full flex-col items-center rounded p-1 sm:my-8 sm:p-2 md:w-3/4'
    >
      <Formik
        initialValues={{
          createOrUpdate: createOrUpdate,
          updateMessage: '',
          fixerId: userId,
          id: initialValues ? initialValues.id : '',
          status: initialValues ? initialValues.status : '',
          ensembleName: initialValues
            ? initialValues.ensembleName
            : ensembleList.length === 1 &&
                ensembleList[0].ensembleNames.length === 1
              ? ensembleList[0].ensembleNames[0]
              : '',
          ensembleId: initialValues
            ? initialValues.ensembleId
            : ensembleList.length === 1
              ? ensembleList[0].id
              : '',
          eventTitle: initialValues ? initialValues.eventTitle : '',
          concertProgram: initialValues ? initialValues.concertProgram : '',
          calls: initialValues
            ? initialValues.calls.sort((a, b) =>
                  Number(DateTime.fromJSDate(new Date(a.startTime))) -
                  Number(DateTime.fromJSDate(new Date(b.startTime)))).map((i) => ({
                id: i.id,
                startTime: toLocalInputFormat(i.startTime),
                endTime: toLocalInputFormat(i.endTime),
                venue: i.venue,
              }))
            : [
                {
                  id: uuidv4(),
                  startTime: '',
                  endTime: '',
                  venue: '',
                  info: '',
                },
              ],
          dressCode: initialValues ? initialValues.dressCode : '',
          fee: initialValues ? initialValues.fee : '',
          additionalInfo: initialValues ? initialValues.additionalInfo : '',
          adminAccess: initialValues ? initialValues.adminAccess : [],
        }}
        validationSchema={EventSchema}
        onSubmit={async (values, actions) => {
          actions.setStatus(null);
          const formattedCalls = values.calls.map(c => ({
            id: c.id,
            startTime: DateTime.fromISO(c.startTime, { zone: 'Europe/London' }).toUTC().toISO(),
            endTime: DateTime.fromISO(c.endTime, { zone: 'Europe/London' }).toUTC().toISO(),
            venue: c.venue,
          }))
          await axios
            .post(
              createOrUpdate === 'Update' ? '/event/update/api' : 'create/api',
              {
                ...values,
                calls: formattedCalls
              }
            )
            .then((res: any) => {
              actions.setStatus('success');
              router.push(`/event/${res.data.id}`);
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
          <form
            id='fixing-form'
            className='flex w-full flex-col py-8 lg:w-2/3'
            onSubmit={props.handleSubmit}
          >
            <div>
              <h1>{createOrUpdate} Event</h1>
            </div>
            <div className='flex w-full flex-col'>
              <div className='flex flex-col'>
                <label
                  htmlFor='ensembleId'
                  id='ensembleName'
                  className='my-1 flex flex-col font-medium'
                >
                  Organisation
                  <Field
                    disabled={props.isSubmitting}
                    className='rounded border p-1'
                    data-testid='org-select'
                    as='select'
                    name='ensembleId'
                    onChange={(e) => {
                      props.setFieldValue('ensembleName', '');
                      props.setFieldValue('ensembleId', e.target.value);
                      ensembleList.find((i) => i.id === e.target.value)
                        ?.ensembleNames.length === 1 &&
                        props.setFieldValue(
                          'ensembleName',
                          ensembleList.find((i) => i.id === e.target.value)
                            ?.ensembleNames[0]
                        );
                    }}
                  >
                    <option value={''}>Select Organisation</option>
                    {ensembleList.map((i) => (
                      <option key={i.id} value={i.id}>
                        {i.name}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage name={`ensembleId`}>
                    {(msg) => (
                      <div
                        className='ml-4 mt-1 text-xs text-red-600'
                        data-testid={`ensembleId-error`}
                      >
                        {msg}
                      </div>
                    )}
                  </ErrorMessage>
                </label>
              </div>
              <div
                aria-labelledby='ensembleName'
                role='group'
                className='flex flex-col py-1'
              >
                <p id='ensembleName' className='font-medium'>
                  Ensemble Name
                </p>
                {ensembleList
                  .find((i) => i.id === props.values.ensembleId)
                  ?.ensembleNames.map((j) => (
                    <label key={j} className='py-1'>
                      <Field
                        className='mr-2'
                        type='radio'
                        name='ensembleName'
                        value={j}
                        disabled={props.isSubmitting}
                      />
                      {j}
                    </label>
                  ))}
                <ErrorMessage name={`ensembleName`}>
                  {(msg) => (
                    <div
                      className='-mt-1 ml-4 text-xs text-red-600'
                      data-testid={`ensembleId-error`}
                    >
                      {msg}
                    </div>
                  )}
                </ErrorMessage>
              </div>

              <div className='flex flex-col'>
                <label
                  htmlFor='fixerSelect'
                  id='fixerSelect'
                  className='my-1 flex flex-col font-medium'
                >
                  Fixer
                  <Field
                    disabled={props.isSubmitting}
                    className='rounded border p-1'
                    data-testid='fixed-select'
                    as='select'
                    name='fixerId'
                    onChange={(e) => {
                      props.setFieldValue('fixerId', e.target.value);
                      e.target.value !== '' &&
                        !props.values.adminAccess.includes(e.target.id) &&
                        ensembleList
                          .find((i) => i.id === props.values.ensembleId)
                          ?.admin.find((i) => i.userId)?.accessType ===
                          'RESTRICTED' &&
                        props.setFieldValue('adminAccess', [
                          ...props.values.adminAccess,
                          e.target.value,
                        ]);
                    }}
                  >
                    <option value={''}>Select Fixer</option>
                    {ensembleList
                      .find((i) => i.id === props.values.ensembleId)
                      ?.admin.map((i) => (
                        <option key={i.id} value={i.userId}>
                          {`${i.user.firstName} ${i.user.lastName}`}
                        </option>
                      ))}
                  </Field>
                  <ErrorMessage name={`fixerId`}>
                    {(msg) => (
                      <div
                        className='ml-4 mt-1 text-xs text-red-600'
                        data-testid={`fixerId-error`}
                      >
                        {msg}
                      </div>
                    )}
                  </ErrorMessage>
                </label>
              </div>
              <div className='flex flex-col'>
                <label>Additional Admin Access</label>
                {ensembleList
                  .find((i) => i.id === props.values.ensembleId)
                  ?.admin.filter((admin) => admin.accessType === 'RESTRICTED')
                  .map((i) => (
                    <label key={i.id}>
                      {`${i.user.firstName} ${i.user.lastName}`}
                      <Field
                        className='ml-1'
                        name={'adminAccess'}
                        value={i.userId}
                        checked={props.values.adminAccess.includes(i.userId)}
                        type='checkbox'
                      />
                    </label>
                  ))}
              </div>

              <GigStatus disabled={props.isSubmitting} />
            </div>
            <TextInput
              disabled={props.isSubmitting}
              asHtml='input'
              label='Event Title'
              name='eventTitle'
              id='event-title'
              className=''
            />
            <TextInput
              disabled={props.isSubmitting}
              asHtml='textarea'
              name='concertProgram'
              id='concert-program'
              className=''
              label='Concert Program'
            />
            <FieldArray name='calls' data-testid='call-field-array'>
              {({ insert, remove, push }) => (
                <div data-testid='calls-array' className='flex flex-col'>
                  {props.values.calls.map((call, index) => (
                    <div
                      className='my-4 rounded border p-4 shadow-sm'
                      key={call.id}
                      data-testid={`call-${index + 1}-div`}
                    >
                      <CallInput
                        disabled={props.isSubmitting}
                        call={call}
                        id={call.id}
                        index={index}
                        remove={(arg) => remove(arg)}
                      />
                    </div>
                  ))}
                  <ButtonPrimary
                    disabled={props.isSubmitting}
                    id='add-call-btn'
                    className='self-end border-blue-600 text-blue-600 hover:text-blue-500'
                    text='Add Call'
                    handleClick={() =>
                      push({
                        id: uuidv4(),
                        startTime: '',
                        endTime: '',
                        venue: '',
                      })
                    }
                  />
                </div>
              )}
            </FieldArray>
            <TextInput
              disabled={props.isSubmitting}
              optional={true}
              asHtml='input'
              label='Dress Code'
              name='dressCode'
              id='dress-code'
              className=''
            />
            <TextInput
              disabled={props.isSubmitting}
              optional={true}
              asHtml='input'
              label='Fee'
              name='fee'
              className=''
              id='fee'
            />
            <TextInput
              disabled={props.isSubmitting}
              optional={true}
              asHtml='textarea'
              label='Additional Information'
              name='additionalInfo'
              id='additional-info'
              className=''
            />
            {createOrUpdate === 'Update' && (
              <TextInput
                disabled={props.isSubmitting}
                optional={false}
                asHtml='textarea'
                label='Update Message to Players'
                name='updateMessage'
                id='update-message'
                className=''
              />
            )}
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
            <div className='h-8'>
              {Object.keys(props.errors).length > 0 &&
                props.submitCount > 0 && (
                  <p className='text-center text-sm text-red-600'>
                    Please revise your form. Errors are stated in red.
                  </p>
                )}
            </div>
            <StatusMessage status={props.status} />
          </form>
        )}
      </Formik>
    </div>
  );
}
