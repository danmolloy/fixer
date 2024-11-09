import { Call, ContactMessage, EnsembleContact } from '@prisma/client';
import { ErrorMessage, Field, FieldArray, Form, Formik } from 'formik';
import DiaryContact from '../diaryContact';
import AppendedContacts from './appendedContacts';
import * as Yup from 'yup';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import HelpMessage from '../../../layout/helpMessage';
import { buttonPrimary } from '../../../ensembles/dashboard';
import DiaryContacts from './diaryContacts';

export type ContactMessageFormProps = {
  cancelForm: () => void;
  eventCalls: Call[];
  eventContacts: (ContactMessage & {
    contact: EnsembleContact;
    calls: number[];
    contactMessageId: number | undefined;
  })[];
  eventSectionId: number;
  bookingOrAvailability: string;
  sectionContacts: EnsembleContact[];
  currentContacts: ContactMessage /* & {contact: EnsembleContact} */[];
};

export default function ContactMessageForm(props: ContactMessageFormProps) {
  const {
    currentContacts,
    eventCalls,
    cancelForm,
    sectionContacts,
    eventContacts,
    eventSectionId,
    bookingOrAvailability,
  } = props;
  const router = useRouter();
  const [filterCategories, setFilterCategories] = useState<string[]>(
    Array.from(new Set(sectionContacts.map((i) => i.category))).filter(
      (i) => i !== null
    )
  );

  const initialVals = {
    contacts: eventContacts.map((i) => ({
      contactId: i.contactId,
      contactMessageId: i.contactMessageId,
      position: i.contact.role,
      name: `${i.contact.firstName} ${i.contact.lastName}`,
      playerMessage: i.playerMessage,
      calls: i.calls,
    })),
    eventSectionId: eventSectionId,
    bookingOrAvailability: bookingOrAvailability,
    strictlyTied: 'true',
    urgent: false,
  };

  const validationSchema = Yup.object().shape({
    contacts: Yup.array().of(
      Yup.object({
        contactId: Yup.string().required(),
        position: Yup.string().required(),
        playerMessage: Yup.string(),
        calls: Yup.array().of(Yup.string()).min(1),
      })
    ),
    eventSectionId: Yup.number().required('Event section ID required'),
    bookingOrAvailability: Yup.string().required(
      'Availability check/offer to book not clarified'
    ),
    strictlyTied: Yup.boolean().required(),
    urgent: Yup.boolean().required(),
  });

  const handleSubmit = async (data) => {
    return await axios
      .post('/fixing/contactMessage/api/create', data)
      .then(() => {
        router.refresh();
      });
  };

  return (
    <div data-testid='contact-message-form'>
      <Formik
        initialValues={initialVals}
        validationSchema={validationSchema}
        onSubmit={(values, actions) => {
          handleSubmit(values);
          actions.setSubmitting(false);
        }}
      >
        {(props) => (
          <Form>
            {props.values.contacts.length > 0 && (
              <AppendedContacts
                currentCallCount={
                  currentContacts.filter(
                    (i) =>
                      i.bookingOrAvailability.toLocaleLowerCase() == 'booking'
                  ).length
                }
                addPlayerMessage={(index, message) =>
                  props.setFieldValue(
                    `contacts.${index}.playerMessage`,
                    message
                  )
                }
                bookingOrAvailability={props.values.bookingOrAvailability}
                eventCalls={eventCalls}
                contacts={props.values.contacts}
              />
            )}
            {bookingOrAvailability.toLocaleLowerCase() !== 'booking' && (
              <div
                role='group'
                aria-labelledby='my-radio-group'
                className='flex flex-col'
              >
                <label>
                  <Field
                    className='m-1'
                    type='radio'
                    name='strictlyTied'
                    value={'true'}
                  />
                  Strictly Tied
                </label>
                <label>
                  <Field
                    className='m-1'
                    type='radio'
                    name='strictlyTied'
                    value={'false'}
                  />
                  Not Tied
                </label>
                <ErrorMessage name='strictlyTied'>
                  {(e) => <p className='text-xs text-red-500'>{e}</p>}
                </ErrorMessage>
              </div>
            )}
            <div>
              <label>
                <Field
                  checked={props.values.urgent}
                  className='m-1'
                  type='checkbox'
                  name='urgent'
                />
                Mark as urgent
              </label>
            </div>
            <div className='mb-2 mt-6 flex w-full flex-row justify-between'>
              <button
                className='m-1 rounded border px-2 py-1 text-sm hover:bg-gray-50'
                onClick={(e) => {
                  e.preventDefault();
                  cancelForm();
                }}
              >
                Cancel
              </button>
              <button
                disabled={props.values.contacts.length == 0}
                className='m-1 rounded bg-indigo-500 px-2 py-1 text-sm text-white hover:bg-indigo-600 disabled:opacity-40'
                type='submit'
              >
                Submit
              </button>
            </div>
            <div className=''>
              <div className='mb-2 mt-12 flex w-full flex-col'>
                <h3 className='text-base'>Your List</h3>
                <p className='text-sm text-gray-500'>{`Select musicians to ${bookingOrAvailability.toLocaleLowerCase() === 'booking' ? 'book' : 'check availability'}.`}</p>
              </div>

              <DiaryContacts
                eventCalls={eventCalls}
                currentContacts={currentContacts}
                appendedContacts={props.values.contacts}
                sectionContacts={sectionContacts}
              />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
