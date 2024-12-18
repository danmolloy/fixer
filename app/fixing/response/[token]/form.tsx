'use client';
import {
  Call,
  ContactMessage,
  EnsembleContact,
  EnsembleSection,
  Event,
  EventSection,
  User,
} from '@prisma/client';
import axios from 'axios';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useRouter } from 'next/navigation';
import * as Yup from 'yup';
import { getDateRange } from '../../contactMessage/api/create/functions';
import { DateTime } from 'luxon';
import { responseConfEmail } from '../../../sendGrid/playerLib';
import SubmitButton from '../../../forms/submitBtn';
import ValidationError from '../../../forms/validationError';
import StatusMessage from '../../../forms/statusMessage';

export type ResponseFormProps = {
  contactMessage: ContactMessage & {
    contact: EnsembleContact;
    eventSection: EventSection & {
      ensembleSection: EnsembleSection;
      event: Event & { fixer: User };
    };
    calls: Call[];
  };
  accepted: boolean | null;
  type: "BOOKING"|"AVAILABILITY"|"AUTOBOOK"
  fixerName: string;
};

export default function ResponseForm(props: ResponseFormProps) {
  const { contactMessage, type } = props;
  const router = useRouter();

  const initialVals: {
    accepted: string;
    availableFor: string[];
  } = {
    accepted: '',
    availableFor:
      contactMessage.availableFor.length > 1
        ? contactMessage.availableFor.map((i) => String(i))
        : contactMessage.calls.map((i) => String(i.id)),
  };

  const responseSchema =
    type === 'AVAILABILITY'
      ? Yup.object().shape({
          accepted: Yup.string().required(''),
          availableFor: Yup.array()
            .of(Yup.string())
            .when('accepted', {
              is: 'true',
              then: (schema) =>
                schema.min(
                  1,
                  'If indicating you are available, you must select at least one call.'
                ),
              otherwise: (schema) => schema.min(0),
            }),
        })
      : Yup.object().shape({
          accepted: Yup.string().required(''),
          availableFor: Yup.array().of(Yup.string()),
        });

  const handleSubmit = async (values: {
    accepted: string;
    availableFor: string[];
  }) => {
    let confMsg: boolean;
    if (values.accepted === 'true' && !contactMessage.strictlyTied) {
      confMsg = confirm(`
        Are you sure you are availble for the following?
        ${contactMessage.calls
          .filter((i) => values.availableFor.includes(String(i.id)))
          .map(
            (i) =>
              `\n${DateTime.fromJSDate(new Date(i.startTime)).toFormat('HH:mm DD')}`
          )}
        `);
    } else if (
      values.accepted === 'true' &&
      type !== "AVAILABILITY"
    ) {
      confMsg = confirm('Are you sure you want to ACCEPT this offer?');
    } else if (
      values.accepted !== 'true' &&
      type !== "AVAILABILITY"
    ) {
      confMsg = confirm('Are you sure you want to DECLINE this offer?');
    } else if (
      values.accepted === 'true' &&
      type === "AVAILABILITY"
    ) {
      confMsg = confirm(`
        Please confirm you are available for this work. 
        If the fixer requires you, you will get a further offer which you will need to confirm.
        `);
    } else {
      confMsg = confirm('Are you sure you are NOT available for this work?');
    }
    if (confMsg) {
      return await axios
        .post(`/fixing/contactMessage/api/update`, {
          id: contactMessage.id,
          data: {
            accepted: values.accepted === 'true',
            status: (values.accepted === 'true' && values.availableFor.length === contactMessage.calls.length) 
              ?  "AVAILABLE" 
              : values.accepted === 'true' 
              ? "MIXED" : "DECLINED",
            acceptedDate: new Date(),
            availableFor:
              values.accepted === 'true'
                ? values.availableFor!.map((i) => Number(i))
                : [],
          },
        })
        .then(async () => {
          const emailData = await responseConfEmail({
            token: contactMessage.token,
            dateRange: getDateRange(contactMessage.calls),
            firstName: contactMessage.contact.firstName,
            email: contactMessage.contact.email!,
            ensemble: contactMessage.eventSection.event.ensembleName,
            accepted: values.accepted ? true : false,
            status:  (values.accepted === 'true' && contactMessage.type !== "AVAILABILITY") 
            ? "ACCEPTED"
            : (values.accepted === 'true' && values.availableFor.length === contactMessage.calls.length) 
              ?  "AVAILABLE" 
              : values.accepted === 'true' 
              ? "MIXED" : "DECLINED",
            type: contactMessage.type,
          });

          await axios.post(`/sendGrid`, {
            body: {
              emailData: emailData,
              templateID: emailData.templateID,
              emailAddress: emailData.email,
            },
          });
        });
    }
  };

  return (
    <div
      data-testid='response-form'
      className='flex w-screen items-center justify-center'
    >
      <Formik
        validationSchema={responseSchema}
        initialValues={initialVals}
        onSubmit={(values, actions) => {
          actions.setSubmitting(true);
          handleSubmit(values)
            .then(() => {
              if (values.accepted === 'true' && contactMessage.type !== "AVAILABILITY") {
                router.push(`/fixing/response/${contactMessage.token}/?accepted=true`);
              } else {
                router.push(`/fixing/response/${contactMessage.token}`);
              }
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

          actions.setStatus(null);
        }}
      >
        {(props) => (
          <Form className='my-4 flex w-[95vw] flex-col rounded border bg-white p-1 text-sm shadow md:w-2/3'>
            <div
              role='group'
              aria-labelledby='my-radio-group'
              className='flex flex-col'
            >
              <h3 className='m-2 font-semibold'>Your Response</h3>
              <p className='m-2 text-gray-500'>
                This work is {contactMessage.strictlyTied === false && 'not '}
                strictly tied.
              </p>
              <label
                htmlFor='false-label'
                className='flex flex-row items-center'
              >
                <Field
                  disabled={props.isSubmitting}
                  id='false-label'
                  data-testid='false-radio'
                  className='m-2'
                  type='radio'
                  name='accepted'
                  value={'false'}
                  label='No, I am not available.'
                />
                No, I am not available.
              </label>
              <label
                htmlFor='true-radio'
                className='flex flex-row items-center'
              >
                <Field
                  disabled={props.isSubmitting}
                  id='true-radio'
                  data-testid='true-radio'
                  className='m-2'
                  type='radio'
                  name='accepted'
                  value={'true'}
                />
                {contactMessage.strictlyTied === true
                  ? 'Yes, I am available'
                  : props.values.accepted !== 'true'
                    ? 'I am available for all/some of this work'
                    : props.values.availableFor.length ===
                        contactMessage.calls.length
                      ? `I am available for all calls`
                      : `I am available for ${props.values.availableFor.length} call(s)`}
              </label>

              <ErrorMessage name='accepted'>
                {(e) => <p className='text-xs text-red-500'>{e}</p>}
              </ErrorMessage>
            </div>
            {props.values.accepted === 'true' &&
              contactMessage.strictlyTied === false && (
                <div>
                  {contactMessage.calls.map((i) => (
                    <label
                      key={i.id}
                      className='m-1 flex flex-row items-center text-xs'
                    >
                      <Field
                        disabled={props.isSubmitting}
                        checked={
                          props.values.availableFor.includes(String(i.id))
                            ? true
                            : false
                        }
                        className='m-1'
                        type='checkbox'
                        value={String(i.id)}
                        name={`availableFor`}
                      />
                      <p>
                        {DateTime.fromJSDate(new Date(i.startTime)).toFormat(
                          'HH:mm DD'
                        )}
                      </p>
                    </label>
                  ))}
                  <ErrorMessage name='availableFor'>
                    {(err) => <p>{err}</p>}
                  </ErrorMessage>
                  {props.values.availableFor.length < 1 && (
                    <p className='text-xs text-red-600'>
                      You must be available for at least one call.
                    </p>
                  )}
                </div>
              )}
            <SubmitButton 
              disabled={props.isSubmitting || props.status === "success"} 
              status={props.isSubmitting ? 'SUBMITTING': props.status === "success" ? "SUCCESS" : undefined} />
            <ValidationError errors={Object.values(props.errors).flat()} />
            <StatusMessage status={props.status} />
          </Form>
        )}
      </Formik>
    </div>
  );
}
