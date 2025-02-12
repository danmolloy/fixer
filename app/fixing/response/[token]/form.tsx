'use client';
import {
  Call,
  ContactEventCall,
  ContactEventCallStatus,
  ContactMessage,
  ContactMessageStatus,
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
import { useState } from 'react';

export type ResponseFormProps = {
  contactMessage: ContactMessage & {
    contact: EnsembleContact;
    eventSection: EventSection & {
      ensembleSection: EnsembleSection;
      event: Event & { fixer: User };
    };
    eventCalls: (ContactEventCall & {call: Call})[]
    //calls: Call[];
  };
  type: 'BOOKING' | 'AVAILABILITY' | 'AUTOBOOK';
  fixerName: string;
};

export default function ResponseForm(props: ResponseFormProps) {
  const { contactMessage, type } = props;
  const router = useRouter();
  const [accepted, setAccepted] = useState<boolean | null>(null);

  const initialVals: {
    status: ContactMessageStatus;
    eventCalls: {
      status: ContactEventCallStatus;
      callId: number;
    }[]
  } = {
    status: contactMessage.status,
    eventCalls: contactMessage.eventCalls.filter(c => c.status === "OFFERING" || c.status === "CHECKING").map(c => ({
      status: c.status,
      callId: c.callId
    })),
   
  };

  const responseSchema =Yup.object().shape({
          status: Yup.string().required(''),
          eventCalls: Yup.array().of(Yup.object().shape({
            status: Yup.string(),
            callId: Yup.number(),
          })),
         
        })
      

  const handleSubmit = async (values: {
    status: ContactMessageStatus;
    eventCalls: {
      status: ContactEventCallStatus;
      callId: number;
    }[]
  }) => {
    let confMsg: boolean;


    if (values.eventCalls.filter(c => c.status ==="AVAILABLE").length !== values.eventCalls.length && !contactMessage.strictlyTied) {
      confMsg = confirm(`
        Are you sure you are availble for the following? If the fixer requires you, you will get a further offer which you will need to confirm.
        ${values.eventCalls
          .filter((c) => c.status === "AVAILABLE")
          .map(
            (i) =>
              `\n${DateTime.fromJSDate(new Date(contactMessage.eventCalls.find(c => c.callId == i.callId)!.call.startTime)).toFormat('HH:mm DD')}`
          )}
        `);
    } else if (values.eventCalls.filter(c => c.status ==="ACCEPTED").length === values.eventCalls.length) {
      confMsg = confirm('Are you sure you want to ACCEPT this offer?');
    } else if (values.eventCalls.filter(c => c.status ==="DECLINED").length === values.eventCalls.length) {
      confMsg = confirm('Are you sure you want to DECLINE this offer?');
    } else if (values.eventCalls.filter(c => c.status ==="AVAILABLE").length === values.eventCalls.length) {
      confMsg = confirm(`
        Please confirm you are available for this work. 
        If the fixer requires you, you will get a further offer which you will need to confirm.
        `);
    } else {
      confMsg = confirm('Are you sure you are NOT available for this work?');
    }
    if (confMsg !== false) {
      return await axios
        .post(`/fixing/contactMessage/api/update`, {
          id: contactMessage.id,
          eventCalls: values.eventCalls,
          data: {
            status: "RESPONDED",
            acceptedDate: new Date(),
            /* availableFor:
              values.status === 'AVAILABLE'
                ? values.availableFor!.map((i) => Number(i))
                : [], */
          },
        })
        .then(async () => {
          const emailData = await responseConfEmail({
            token: contactMessage.token,
            dateRange: getDateRange(contactMessage.eventCalls.map(c => c.call)),
            firstName: contactMessage.contact.firstName,
            email: contactMessage.contact.email!,
            ensemble: contactMessage.eventSection.event.ensembleName,
            status:  values.eventCalls.filter(c => c.status === (values.eventCalls[0].status)).length !== values.eventCalls.length? "MIXED" : "RESPONDED",
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
              if (
                values.status === 'ACCEPTED' 
              ) {
                router.push(
                  `/fixing/response/${contactMessage.token}/?accepted=true`
                );
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
              <div>
              {contactMessage.strictlyTied === true 
              ? <p className='m-2 text-gray-500'>
              This work is strictly tied.
            </p>
                : <p className='m-2 text-gray-500'>
                This work is not strictly tied.
              </p>}</div>
              <label
                htmlFor='false-input'
                className='flex flex-row items-center'
              >
                <Field
                  disabled={props.isSubmitting}
                  id='false-input'
                  data-testid='false-radio'
                  className='m-2'
                  type='radio'
                  name='status'
                  value={'DECLINED'}
                  label='No, I am not available.'
                  checked={accepted === false}

                  onChange={() => {
                    setAccepted(false);
                    props.setFieldValue('eventCalls', props.values.eventCalls.map(c => ({
                    ...c,
                    status: "DECLINED"
                  })))}}
                />
                No, I am not available.
              </label>
              <label
                htmlFor='true-radio'
                className='flex flex-row items-center'
              >
                <Field
                  checked={accepted === true}
                  disabled={props.isSubmitting}
                  id='true-radio'
                  data-testid='true-radio'
                  className='m-2'
                  type='radio'
                  name='status'
                  value={contactMessage.type === "AVAILABILITY" ? 'AVAILABLE' : "ACCEPTED"}
                  onChange={() => {
                    setAccepted(!accepted);
                    props.setFieldValue('eventCalls', props.values.eventCalls.map(c => ({
                    ...c,
                    status: c.status === "CHECKING" ? "AVAILABLE" : "ACCEPTED"
                  })));
                }}
                />
                {(contactMessage.type === "BOOKING" && contactMessage.strictlyTied === true) ? 
                'Yes, I accept this work.'
                : contactMessage.strictlyTied === true
                  ? 'Yes, I am available'
                      : `I am available for all/some calls`
/*                       : `I am available for ${props.values.eventCalls.filter(c => c.status === "AVAILABLE").length} call(s)` */}
              </label>

              <ErrorMessage name='status'>
                {(e) => <p className='text-xs text-red-500'>{e}</p>}
              </ErrorMessage>
            </div>
            {props.values.eventCalls.filter(c => c.status === "AVAILABLE").length > 0 &&
              contactMessage.strictlyTied === false && (
                <div data-testid="call-checkboxes">
                  {props.values.eventCalls.map((i, index) => (
                    <label
                      key={i.callId}
                      className='m-1 flex flex-row items-center text-xs'
                    >
                      <Field
                        disabled={props.isSubmitting}
                        checked={props.values.eventCalls[index].status === "AVAILABLE"}
                        className='m-1'
                        type='checkbox'
                        value={"AVAILABLE"}
                        data-testid={`${props.values.eventCalls[index].callId}-checkbox`}
                        //name={`eventCalls[${index}].status`}
                        onChange={() => props.setFieldValue(`eventCalls[${index}].status`, props.values.eventCalls[index].status === "AVAILABLE" ? "DECLINED" : "AVAILABLE")}
                      />
                      <p>
                        {DateTime.fromJSDate(new Date(contactMessage.eventCalls.find(c => c.callId === i.callId)!.call.startTime)).toFormat(
                          'HH:mm DD'
                        )}
                      </p>
                    </label>
                  ))}
                  <ErrorMessage name='eventCalls'>
                    {(err) => <p>{err}</p>}
                  </ErrorMessage>
                  {props.values.eventCalls.filter(c => c.status === "AVAILABLE").length < 1 && (
                    <p className='text-xs text-red-600'>
                      You must be available for at least one call.
                    </p>
                  )}
                </div>
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
            {/* <ValidationError errors={Object.values(props.errors).flat()} /> */}
            <StatusMessage status={props.status} />
          </Form>
        )}
      </Formik>
    </div>
  );
}
