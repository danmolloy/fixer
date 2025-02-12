'use client';
import * as Yup from 'yup';
import { ErrorMessage, Field, FieldArray, Form, Formik } from 'formik';
import { Call, ContactEventCall, ContactEventCallStatus, ContactMessage, EnsembleContact, Event } from '@prisma/client';
import TextInput from '../../../forms/textInput';
import axios from 'axios';
import { DateTime } from 'luxon';
import { useRouter } from 'next/navigation';
import { updateOfferEmail } from '../../../sendGrid/playerLib';
import SubmitButton from '../../../forms/submitBtn';
import ValidationError from '../../../forms/validationError';
import StatusMessage from '../../../forms/statusMessage';
import prisma from '../../../../client';

export type UpdateContactMessageProps = {
  contact: ContactMessage & {
    contact: EnsembleContact;
    eventCalls: (ContactEventCall & {
      call: Call
    })[]
  };
  event: Event & { calls: Call[] };
  instrument: string;
};

export default function UpdateContactMessage(props: UpdateContactMessageProps) {
  const { contact, event, instrument } = props;
  const router = useRouter();

  const initialVals = {
    id: contact.id,
    playerMessage: contact.playerMessage,
    //calls: contact.calls.map((i) => String(i.id)),
    eventCalls: contact.eventCalls.map(c => ({
      status: c.status,
      callId: c.callId
    })),
    type: contact.type,
    offerExpiry: contact.offerExpiry,
    status: contact.status,
    position: contact.position,
    strictlyTied: contact.strictlyTied,
    urgent: contact.urgent,
  };

  const contactSchema = Yup.object().shape({
    playerMessage: Yup.string().nullable(),
    calls: Yup.array().min(1, 'at least one call must be offered'),
    eventCalls: Yup.array().of(Yup.object().shape({
      callId: Yup.number(),
      status: Yup.string()
    })).min(1),
    type: Yup.string().required(),
    //offerExpiry: Yup.number(),
    status: Yup.string(),
    position: Yup.string().required('player position required'),
    strictlyTied: Yup.boolean(),
    urgent: Yup.boolean(),
  });

  return (
    <div data-testid="update-form">
    <Formik
      onSubmit={async (values, actions) => {
        
        actions.setStatus(null);
        actions.setSubmitting(true);
        await axios
          .post('/fixing/contactMessage/api/update', {
            id: contact.id,
            eventCalls: values.eventCalls,
            data: {
              status: values.status,
              playerMessage: values.playerMessage,
              position: values.position,
              strictlyTied: (values.type === "BOOKING" || values.type === "AUTOBOOK") ? true : values.strictlyTied,
              type: values.type,
              urgent: values.urgent,
            },
          })
          .then(async (res) => {
            /* const emailData = await updateOfferEmail(res.data);

            await axios.post(`/sendGrid`, {
              body: {
                emailData: emailData,
                templateID: emailData.templateID,
                emailAddress: emailData.email,
              },
            }); */
            router.push(`/event/${event.id}`);
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
      validationSchema={contactSchema}
      initialValues={initialVals}
      initialErrors={{}}
    >
      {(props) => (
        <Form  className='flex w-full flex-col px-2 py-8 lg:w-2/3'>
          <h2 className='py-1'>Update Contact Call</h2>
          <p>{event.ensembleName}</p>
          <p>
            {contact.contact.firstName} {contact.contact.lastName} ({instrument}
            )
          </p>
          <Field
            data-testid="type-select"
            disabled={props.isSubmitting}
            className='my-1 rounded border'
            as='select'
            name='type'
          >
            <option value='BOOKING'>To Book</option>
            <option value='AVAILABILITY'>Availability Check</option>
            <option value='AUTOBOOK'>Auto-Book</option>
          </Field>
          <ErrorMessage name='type'>
            {(err) => <p className='text-xs text-red-500'>{err}</p>}
          </ErrorMessage>
          <div className='my-2'>
            <p className=''>Calls</p>
            {contact.eventCalls.map((i, index) => (
              <label key={i.callId} className='my-1 flex flex-row p-1'>
                <div data-testid={i.callId} className='ml-1 text-sm'>
                  <p>
                    {DateTime.fromJSDate(new Date(i.call.startTime)).toFormat(
                      'HH:mm'
                    )}
                  </p>
                  <p>
                    {DateTime.fromJSDate(new Date(i.call.startTime)).toFormat('DD')}
                  </p>
                </div>
                <select
                  data-testid={`${i.callId}-select`}
                  disabled={props.isSubmitting}
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  name={`eventCalls[${index}].status`}
                  value={props.values.eventCalls[index].status}
                >
                  <option value="">Select status</option>
  <option value="TOOFFER" disabled={props.values.type === "AVAILABILITY"}>TOOFFER</option>
  <option value="OFFERING" disabled={props.values.type === "AVAILABILITY"}>OFFERING</option>
  <option value="ACCEPTED" disabled={props.values.type === "AVAILABILITY"} >ACCEPTED</option>
  <option value="DECLINED">DECLINED</option>
  <option value="TOCHECK" disabled={props.values.type !== "AVAILABILITY"}>TOCHECK</option>
  <option value="CHECKING" disabled={props.values.type !== "AVAILABILITY"}>CHECKING</option>
  <option value="AVAILABLE" disabled={props.values.type !== "AVAILABILITY"}>AVAILABLE</option>
                </select>
                
              </label>
            ))}
            <ErrorMessage name='calls'>
              {(err) => <p className='text-xs text-red-500'>{err}</p>}
            </ErrorMessage>
          </div>
          <div className=''>
            <label className='my-2 flex flex-col'>Status</label>

            <Field
              data-testid="message-status"
              disabled={props.isSubmitting}
              className='my-1 rounded border'
              as='select'
              name='status'
            >
  <option value="RESPONDED" disabled={props.values.type === "AUTOBOOK"}>Responded</option>
  <option value="NOTCONTACTED" disabled={false}>Not Contacted</option>
  <option value="AWAITINGREPLY" disabled={props.values.type === "AUTOBOOK"}>Awaiting Reply</option>
  <option value="FINDINGDEP" disabled={props.values.type === "AVAILABILITY"}>Finding Dep</option>
 
              <option
                disabled={props.values.type !== 'AVAILABILITY'}
                value='AVAILABLE'
              >
                Available
              </option>
              <option
                disabled={props.values.type === 'AVAILABILITY'}
                value='AUTOBOOKED'
              >
                Auto-Booked
              </option>
              
            </Field>
            <ErrorMessage name='status'>
              {(err) => <p className='text-xs text-red-500'>{err}</p>}
            </ErrorMessage>
          </div>

          <div className='my-2'>
            <label>
              <Field
                disabled={props.isSubmitting || props.values.type === "AUTOBOOK" || props.values.type === "BOOKING"}
                className='m-1'
                checked={props.values.strictlyTied}
                type='checkbox'
                name='strictlyTied'
              />
              Strictly Tied
            </label>
            <ErrorMessage name='strictlyTied'>
              {(err) => <p className='text-xs text-red-500'>{err}</p>}
            </ErrorMessage>
          </div>
          <div>
            <label>
              <Field
                disabled={props.isSubmitting}
                className='m-1'
                checked={props.values.urgent}
                type='checkbox'
                name='urgent'
              />
              Urgent
            </label>
            <ErrorMessage name='urgent'>
              {(err) => <p className='text-xs text-red-500'>{err}</p>}
            </ErrorMessage>
          </div>
          <TextInput
            disabled={props.isSubmitting}
            id='player-position-input'
            label='Position'
            name='position'
          />
          <TextInput
            disabled={props.isSubmitting}
            id='player-message-input'
            label='Message to Player'
            name='playerMessage'
          />
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
          <ValidationError errors={Object.values({
            playerMessage: props.errors.playerMessage as string,
            type: props.errors.type as string,
            status: props.errors.status as string,
            position: props.errors.position as string,
            strictlyTied: props.errors.strictlyTied as string,
            urgent: props.errors.urgent as string,
            eventCalls: props.errors.eventCalls as string,
            }).flat()} /> 
          <StatusMessage status={props.status} />
        </Form>
      )}
    </Formik>
    </div>

  );
}
