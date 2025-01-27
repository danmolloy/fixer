import { Call, ContactMessage, EnsembleContact } from '@prisma/client';
import axios from 'axios';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { DateTime } from 'luxon';
import { useRouter } from 'next/navigation';
import * as Yup from 'yup';
import SubmitButton from '../../../../forms/submitBtn';

export type UpdateContactEventCallsProps = {
  contact: ContactMessage & {
    contact: EnsembleContact;
    calls: Call[];
  };
  eventCalls: Call[];
};

export default function UpdateContactEventCalls(
  props: UpdateContactEventCallsProps
) {
  const { contact, eventCalls } = props;
  const router = useRouter();

  const initialVals = {
    calls: contact.calls.map((i) => String(i.id)),
    contactMessageId: contact.id,
  };

  const validationSchema = Yup.object().shape({
    contactMessageId: Yup.string().required(),
    calls: Yup.array().of(Yup.number()) /* .min(1),  */,
  });

  const handleSubmit = async (data) => {
    return await axios
      .post('/fixing/contactMessage/api/update/eventCalls', data)
      .then(() => {
        router.refresh();
      });
  };

  return (
    <Formik
      initialValues={initialVals}
      validationSchema={validationSchema}
      onSubmit={async (values, actions) => {
        if (
          values.calls.length < 1 &&
          contact.calls
            .map((i) => String(i.id))
            .filter((i) => values.calls.includes(i)).length < 1
        ) {
          return alert(
            'This player will no longer have any calls offered, which is not a valid action. If you wish to remove them from the event, delete them from the list.'
          );
        }
        /* handleSubmit({
          contactMessageId: values.contactMessageId,
          calls: {
            connect: values.calls.map((i) => ({ id: Number(i) })),
            disconnect: contact.calls
              .map((i) => String(i.id))
              .filter((i) => !values.calls.includes(i))
              .map((i) => ({
                id: Number(i),
              })),
          },
        });
        actions.setSubmitting(false); */

        actions.setStatus(null);
        await axios
          .post('/fixing/contactMessage/api/update/eventCalls', {
            contactMessageId: values.contactMessageId,
            calls: {
              connect: values.calls.map((i) => ({ id: Number(i) })),
              disconnect: contact.calls
                .map((i) => String(i.id))
                .filter((i) => !values.calls.includes(i))
                .map((i) => ({
                  id: Number(i),
                })),
            },
          })
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
          });
      }}
    >
      {(props) => (
        <Form
          data-testid='update-event-calls'
          className='mx-1 my-2 flex flex-col p-1'
        >
          <p className='font-semibold'>Calls:</p>

          {eventCalls.map((i) => (
            <label key={i.id} className='m-1 flex flex-row text-xs'>
              <Field
                checked={
                  props.values.calls
                    .map((j) => String(j))
                    .includes(String(i.id))
                    ? true
                    : false
                }
                className='m-1'
                type='checkbox'
                value={String(i.id)}
                name={`calls`}
              />
              <div className='flex flex-col'>
                <p>
                  {DateTime.fromJSDate(new Date(i.startTime)).toFormat('HH:mm')}
                </p>
                <p>
                  {DateTime.fromJSDate(new Date(i.startTime)).toFormat('DD')}
                </p>
              </div>
            </label>
          ))}
          <ErrorMessage name='calls'>{(err) => <p>{err}</p>}</ErrorMessage>
          {props.values.calls.length < 1 && (
            <p className='text-xs text-red-600'>
              At least one call must be offered.
            </p>
          )}
          <SubmitButton
            disabled={
              JSON.stringify(initialVals.calls.map((i) => String(i))) ===
                JSON.stringify(props.values.calls.map((i) => String(i))) ||
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
        </Form>
      )}
    </Formik>
  );
}
