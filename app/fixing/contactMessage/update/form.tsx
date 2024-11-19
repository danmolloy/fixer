'use client';
import * as Yup from 'yup';
import { ErrorMessage, Field, FieldArray, Form, Formik } from 'formik';
import { Call, ContactMessage, EnsembleContact, Event } from '@prisma/client';
import TextInput from '../../../forms/textInput';
import axios from 'axios';
import { DateTime } from 'luxon';
import { useRouter } from 'next/navigation';
import { updateOfferEmail } from '../../../sendGrid/lib';

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
    bookingOrAvailability: contact.bookingOrAvailability,
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
      const newData = await axios
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
          const emailData = await updateOfferEmail(newData.data);
          await axios.post(`/sendGrid`, {
            body: {
              emailData: emailData,
              templateID: emailData.templateID,
              emailAddress: emailData.email,
            },
          });
          router.push(`/event/${event.id}`);
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
        <Form className=' flex w-full flex-col py-8 lg:w-2/3 px-2'>
          <h2 className='py-1'>Update Contact Call</h2>
          <p>{event.ensembleName}</p>
          <p>
            {contact.contact.firstName} {contact.contact.lastName} ({instrument}
            )
          </p>
          <Field  className="border my-1 rounded" as='select' name='bookingOrAvailability'>
            <option value='Booking'>To Book</option>
            <option value='Availability'>Availability Check</option>
          </Field>
          <ErrorMessage name='bookingOrAvailability'>
            {(err) => <p className='text-xs text-red-500'>{err}</p>}
          </ErrorMessage>
          <div className='my-2'>
            <p className=''>Calls</p>
            {event.calls.map((i) => (
              <label key={i.id} className='flex flex-row p-1 my-1'>
                <Field
                  checked={props.values.calls.includes(String(i.id))}
                  type='checkbox'
                  name='calls'
                  value={String(i.id)}
                />
                <div className='text-sm ml-1'>
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
            <label className='flex flex-col my-2'>
              Status
              </label>

              <Field className="border rounded my-1" as='select' name='accepted'>
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
                className="m-1"
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
                className="m-1"
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
          <button className='hover:bg-blue-50 px-2 py-1 m-2 rounded border border-blue-600 text-blue-600 ' type='submit'>Submit</button>
        </Form>
      )}
    </Formik>
  );
}
