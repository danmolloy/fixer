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
import StatusMessage from '../../../forms/statusMessage';
import ValidationError from '../../../forms/validationError';
import SubmitButton from '../../../forms/submitBtn';

export type ContactMessageFormProps = {
  cancelForm: () => void;
  eventCalls: Call[];
  eventContacts: (ContactMessage & {
    contact: EnsembleContact;
    calls: number[];
    contactMessageId: number | undefined;
  })[];
  eventSectionId: number;
  type: 'BOOKING' | 'AVAILABILITY' | 'AUTOBOOK';
  sectionContacts: EnsembleContact[];
  currentContacts: ContactMessage /* & {contact: EnsembleContact} */[];
  eventId: number;
};

export default function ContactMessageForm(props: ContactMessageFormProps) {
  const {
    currentContacts,
    eventCalls,
    cancelForm,
    sectionContacts,
    eventContacts,
    eventSectionId,
    type,
    eventId,
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
      autoAccepted: false,
    })),
    eventSectionId: eventSectionId,
    type: type,
    strictlyTied: 'true',
    urgent: false,
    eventId: eventId,
  };

  const validationSchema = Yup.object().shape({
    contacts: Yup.array().of(
      Yup.object({
        contactId: Yup.string().required(),
        position: Yup.string().required(),
        playerMessage: Yup.string(),
        calls: Yup.array().of(Yup.string()).min(1),
        autoAccepted: Yup.boolean().required(),
      })
    ),
    eventSectionId: Yup.number().required('Event section ID required'),
    type: Yup.string().required(
      'Availability check/offer to book not clarified'
    ),
    strictlyTied: Yup.boolean().required(),
    urgent: Yup.boolean().required(),
    eventId: Yup.number().required(),
  });

  return (
    <div data-testid='contact-message-form'>
      <Formik
        initialValues={initialVals}
        validationSchema={validationSchema}
        onSubmit={async (values, actions) => {
          //handleSubmit(values);
          //actions.setSubmitting(false);
          //cancelForm();
          actions.setStatus(null);
          await axios
            .post('/fixing/contactMessage/api/create', values)
            .then(() => {
              router.refresh();
              actions.setStatus('success');
            })
            .catch((error) => {
              const errorMessage =
                error.response.data.error || 'An unexpected error occurred.';
              actions.setStatus(errorMessage);
            })
            .finally(() => {
              actions.setSubmitting(false);
              cancelForm();
            });
        }}
      >
        {(props) => (
          <Form>
            {props.values.contacts.length > 0 && (
              <AppendedContacts
                currentCallCount={
                  currentContacts.filter((i) => i.type !== 'AVAILABILITY')
                    .length
                }
                addPlayerMessage={(index, message) =>
                  props.setFieldValue(
                    `contacts.${index}.playerMessage`,
                    message
                  )
                }
                type={props.values.type}
                eventCalls={eventCalls}
                contacts={props.values.contacts}
              />
            )}
            {type === 'AVAILABILITY' && (
              <div
                role='group'
                aria-labelledby='my-radio-group'
                className='flex flex-col'
              >
                <label htmlFor='strictly-tied'>
                  <Field
                    id='strictly-tied'
                    className='m-1'
                    type='radio'
                    name='strictlyTied'
                    value={'true'}
                  />
                  Strictly Tied
                </label>
                <label htmlFor='not-tied'>
                  <Field
                    id='not-tied'
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
              <label htmlFor='urgent-checkbox'>
                <Field
                  id='urgent-checkbox'
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
              <SubmitButton
                disabled={
                  props.values.contacts.length == 0 ||
                  props.isSubmitting ||
                  props.status === 'success'
                }
                status={
                  props.isSubmitting
                    ? 'SUBMITTING'
                    : props.status === 'success'
                      ? 'SUCCESS'
                      : undefined
                }
              />
            </div>
            <StatusMessage status={props.status} />
            <div className=''>
              <div className='mb-2 mt-12 flex w-full flex-col'>
                <h3 className='text-base'>Your List</h3>
                <p className='text-sm text-gray-500'>{`Select musicians to ${type !== 'AVAILABILITY' ? 'book' : 'check availability'}.`}</p>
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
