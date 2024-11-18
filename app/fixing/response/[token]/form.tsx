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
import {
  getDateRange,
} from '../../contactMessage/api/create/functions';
import { DateTime } from 'luxon';
import { responseConfEmail } from '../../../sendGrid/lib';

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
  bookingOrAvailability: string;
  fixerName: string;
};

export default function ResponseForm(props: ResponseFormProps) {
  const { contactMessage, bookingOrAvailability } = props;
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

  const responseSchema = Yup.object().shape({
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
      bookingOrAvailability.toLocaleLowerCase() === 'booking'
    ) {
      confMsg = confirm('Are you sure you want to ACCEPT this offer?');
    } else if (
      values.accepted !== 'true' &&
      bookingOrAvailability.toLocaleLowerCase() === 'booking'
    ) {
      confMsg = confirm('Are you sure you want to DECLINE this offer?');
    } else if (
      values.accepted === 'true' &&
      bookingOrAvailability.toLocaleLowerCase() !== 'booking'
    ) {
      confMsg = confirm(`
        Please confirm you are available for this work. 
        If the fixer requires you, you will get a further offer which you will need to confirm.
        `);
    } else {
      confMsg = confirm('Are you sure you are NOT available for this work?');
    }
    if (confMsg) {
      
      try {
        
        await axios
          .post(`/fixing/contactMessage/api/update`, {
            id: contactMessage.id,
            data: {
              accepted: values.accepted === 'true',
              acceptedDate: new Date(),
              availableFor:
                values.accepted === 'true'
                  ? values.availableFor!.map((i) => Number(i))
                  : [],
            },
          })
          .then(async () => {
            
            const emailData = responseConfEmail({
              dateRange: getDateRange(contactMessage.calls),
              firstName: contactMessage.contact.firstName,
              email: contactMessage.contact.email!,
              ensemble: contactMessage.eventSection.event.ensembleName,
              accepted: values.accepted ? true : false,
              bookingOrAvailability: contactMessage.bookingOrAvailability,
            });
            
            await axios.post(`/sendGrid`, {
              body: {
                emailData: emailData,
                templateID: emailData.templateID,
                emailAddress: emailData.email,
              },
            });
          })
          .then(() => {
            router.refresh();
          });
      } catch (e) {
        alert(`Error: ${e}`);
      }
    }
  };

  return (
    <div data-testid="response-form"  className=' w-screen flex items-center justify-center'>

    <Formik
      validationSchema={responseSchema}
      initialValues={initialVals}
      onSubmit={(values, actions) => {
        actions.setSubmitting(true);
        handleSubmit(values).then(() => {
          actions.setSubmitting(false);

        });

      }}
    >
      {(props) => (
        <Form  className='bg-white shadow my-4 p-1 text-sm border rounded w-[95vw] md:w-2/3 flex flex-col'>
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
            <label htmlFor='false-label' className='flex flex-row items-center '>
              <Field
                id="false-label"
                data-testid="false-radio"
                className='m-2'
                type='radio'
                name='accepted'
                value={'false'}
                label="No, I am not available."
              />
              No, I am not available.
            </label>
            <label htmlFor='true-radio' className='flex flex-row items-center'>
              <Field
              id="true-radio"
                data-testid="true-radio"
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
          <button
            className='disabled:bg-blue-100 m-2 rounded self-center bg-blue-600 px-2 py-1 text-white shadow-sm hover:bg-blue-500'
            disabled={
              (props.isSubmitting.toString() === 'true' 
              || props.values.availableFor.length < 1) &&
              props.values.accepted === 'true'
            }
            type={'submit'}
          >
            Submit
          </button>
        </Form>
      )}
    </Formik>
    </div>

  );
}
