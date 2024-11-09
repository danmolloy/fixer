'use client';
import * as Yup from 'yup';
import { ErrorMessage, Field, FieldArray, Form, Formik } from 'formik';
import { Call, ContactMessage, EnsembleContact, Event } from '@prisma/client';
import TextInput from '../../../forms/textInput';
import axios from 'axios';
import { DateTime } from 'luxon';
import { useRouter } from 'next/navigation';

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
    recieved: contact.recieved,
    accepted:
      contact.accepted === true
        ? 'true'
        : contact.accepted === false
          ? 'false'
          : '',
    playerMessage: contact.playerMessage,
    calls: contact.calls.map((i) => String(i.id)),
    bookingOrAvailability: contact.bookingOrAvailability,
    offerExpiry: contact.offerExpiry,
    status: contact.status,
    position: contact.position,
    strictlyTied: contact.strictlyTied,
    urgent: contact.urgent,
  };

  const contactSchema = Yup.object().shape({
    recieved: Yup.boolean().required(), //
    accepted: Yup.boolean().nullable(),
    playerMessage: Yup.string(),
    calls: Yup.array().min(1),
    bookingOrAvailability: Yup.string().required(),
    //offerExpiry: Yup.number(),
    //status: Yup.string(),
    position: Yup.string(),
    strictlyTied: Yup.boolean(),
    urgent: Yup.boolean(),
  });

  const handleSubmit = async (values) => {
    try {
      await axios
        .post('/fixing/contactMessage/api/update', {
          id: contact.id,
          data: {
            recieved: values.recieved,
            accepted:
              values.accepted === 'true'
                ? true
                : values.accepted === 'false'
                  ? false
                  : null,
            playerMessage: values.playerMessage,
            //offerExpiry: values.offerExpiry,
            position: values.position,
            strictlyTied: values.strictlyTied,
            bookingOrAvailability: values.bookingOrAvailability,
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
        .then(() => {
          router.push(`/event/${event.id}`);
        });
    } catch (e) {
      throw new Error(e);
    }
  };

  return (
    <Formik
      onSubmit={(values) => {
        handleSubmit(values);
      }}
      validationSchema={contactSchema}
      initialValues={initialVals}
    >
      {(props) => (
        <Form>
          <h2>Update Contact Call</h2>
          <p>{event.ensembleName}</p>
          <p>
            {contact.contact.firstName} {contact.contact.lastName} ({instrument}
            )
          </p>
          <Field as='select' name='bookingOrAvailability'>
            <option value='Booking'>To Book</option>
            <option value='Availability'>Availability Check</option>
          </Field>
          <ErrorMessage name='bookingOrAvailability'>
            {(err) => <p className='text-xs text-red-500'>{err}</p>}
          </ErrorMessage>
          <div>
            <p>Calls</p>
            {event.calls.map((i) => (
              <label key={i.id}>
                <div>
                  <p>
                    {DateTime.fromJSDate(new Date(i.startTime)).toFormat(
                      'HH:mm'
                    )}
                  </p>
                  <p>
                    {DateTime.fromJSDate(new Date(i.startTime)).toFormat('DD')}
                  </p>
                </div>
                <Field
                  checked={props.values.calls.includes(String(i.id))}
                  type='checkbox'
                  name='calls'
                  value={String(i.id)}
                />
              </label>
            ))}
            <ErrorMessage name='calls'>
              {(err) => <p className='text-xs text-red-500'>{err}</p>}
            </ErrorMessage>
          </div>
          <div>
            <label>
              Status
              <Field as='select' name='accepted'>
                <option value='true'>Accepted</option>
                <option value='false'>Declined</option>
                <option value={''}>Awaiting Response</option>
              </Field>
            </label>
            <ErrorMessage name='accepted'>
              {(err) => <p className='text-xs text-red-500'>{err}</p>}
            </ErrorMessage>
          </div>
          <div>
            <label>
              <Field
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
            id='player-position-input'
            label='Position'
            name='position'
          />
          <TextInput
            id='player-message-input'
            label='Message to Player'
            name='playerMessage'
          />
          <button type='submit'>Submit</button>
        </Form>
      )}
    </Formik>
  );
}
