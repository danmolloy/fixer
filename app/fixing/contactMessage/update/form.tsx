'use client';
import * as Yup from 'yup';
import { ErrorMessage, Field, FieldArray, Form, Formik } from 'formik';
import { Call, ContactMessage, EnsembleContact, Event } from '@prisma/client';
import TextInput from '../../../forms/textInput';
import axios from 'axios';
import { DateTime } from 'luxon';
import { useRouter } from 'next/navigation';
import { updateOfferEmail } from '../../../sendGrid/playerLib';
import SubmitButton from '../../../forms/submitBtn';
import ValidationError from '../../../forms/validationError';
import StatusMessage from '../../../forms/statusMessage';

export type UpdateContactMessageProps = {
  contact: ContactMessage & {
    contact: EnsembleContact;
    calls: Call[];
  };
  event: Event & { calls: Call[] };
  instrument: string;
};

export default function UpdateContactMessage(props: UpdateContactMessageProps) {
  const { contact, event, instrument } = props;
  const router = useRouter();

  const initialVals = {
    id: contact.id,
    received: contact.received === true ? 'true' : 'false',
    accepted:
      contact.accepted === true
        ? 'true'
        : contact.accepted === false
          ? 'false'
          : '',
    playerMessage: contact.playerMessage,
    calls: contact.calls.map((i) => String(i.id)),
    type: contact.type,
    offerExpiry: contact.offerExpiry,
    status: contact.status,
    position: contact.position,
    strictlyTied: contact.strictlyTied,
    urgent: contact.urgent,
  };

  const contactSchema = Yup.object().shape({
    received: Yup.boolean().required(), //
    accepted: Yup.boolean().nullable(),
    playerMessage: Yup.string(),
    calls: Yup.array().min(1, 'at least one call must be offered'),
    type: Yup.string().required(),
    //offerExpiry: Yup.number(),
    //status: Yup.string(),
    position: Yup.string().required('player position required'),
    strictlyTied: Yup.boolean(),
    urgent: Yup.boolean(),
  });

  

  return (
    <Formik
      onSubmit={async (values, actions) => {
        //handleSubmit(values);
        //actions.setSubmitting(false);

        actions.setStatus(null);
        actions.setSubmitting(true);
        await axios
          .post('/fixing/contactMessage/api/update', {
            id: contact.id,
            data: {
              received: values.received === 'true' ? true : false,
              accepted:
                values.accepted === 'true'
                  ? true
                  : values.accepted === 'false'
                    ? false
                    : null,
              status: values.accepted === 'true'
              ? "ACCEPTED"
              : values.accepted === 'false'
                ? 'DECLINED'
                : 'AWAITINGREPLY',
              playerMessage: values.playerMessage,
              position: values.position,
              strictlyTied: values.strictlyTied,
              type: values.type,
              urgent: values.urgent,
              calls: {
                connect: values.calls.map((i) => ({ id: Number(i) })),
                disconnect: contact.calls
                  .map((i) => String(i.id))
                  .filter((i) => !values.calls.includes(i))
                  .map((i) => ({
                    id: Number(i),
                  })),
              },
            },
          })
          .then(async (res) => {
            const emailData = await updateOfferEmail(res.data);
            await axios.post(`/sendGrid`, {
              body: {
                emailData: emailData,
                templateID: emailData.templateID,
                emailAddress: emailData.email,
              },
            });
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
    >
      {(props) => (
        <Form className='flex w-full flex-col px-2 py-8 lg:w-2/3'>
          <h2 className='py-1'>Update Contact Call</h2>
          <p>{event.ensembleName}</p>
          <p>
            {contact.contact.firstName} {contact.contact.lastName} ({instrument}
            )
          </p>
          <Field
            disabled={props.isSubmitting}
            className='my-1 rounded border'
            as='select'
            name='type'
          >
            <option value='BOOKING'>To Book</option>
            <option value='AVAILABILITY'>Availability Check</option>
            <option value="AUTOBOOK">Auto-Book</option>
          </Field>
          <ErrorMessage name='type'>
            {(err) => <p className='text-xs text-red-500'>{err}</p>}
          </ErrorMessage>
          <div className='my-2'>
            <p className=''>Calls</p>
            {event.calls.map((i) => (
              <label key={i.id} className='my-1 flex flex-row p-1'>
                <Field
                  disabled={props.isSubmitting}
                  checked={props.values.calls.includes(String(i.id))}
                  type='checkbox'
                  name='calls'
                  value={String(i.id)}
                />
                <div className='ml-1 text-sm'>
                  <p>
                    {DateTime.fromJSDate(new Date(i.startTime)).toFormat(
                      'HH:mm'
                    )}
                  </p>
                  <p>
                    {DateTime.fromJSDate(new Date(i.startTime)).toFormat('DD')}
                  </p>
                </div>
              </label>
            ))}
            <ErrorMessage name='calls'>
              {(err) => <p className='text-xs text-red-500'>{err}</p>}
            </ErrorMessage>
          </div>
          <div className=''>
            <label className='my-2 flex flex-col'>Status</label>

            <Field
              disabled={props.isSubmitting}
              className='my-1 rounded border'
              as='select'
              name='accepted'
            >
              <option value='true'>Accepted</option>
              <option value='false'>Declined</option>
              <option value={''}>Not responded</option>
            </Field>
            <ErrorMessage name='accepted'>
              {(err) => <p className='text-xs text-red-500'>{err}</p>}
            </ErrorMessage>
          </div>

          <div className='my-2'>
            <label>
              <Field
                disabled={props.isSubmitting}
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
              disabled={props.isSubmitting || props.status === "success"} 
              status={props.isSubmitting ? 'SUBMITTING': props.status === "success" ? "SUCCESS" : undefined} />
          <ValidationError errors={Object.values(props.errors).flat()} />
          <StatusMessage status={props.status} />
        </Form>
      )}
    </Formik>
  );
}
