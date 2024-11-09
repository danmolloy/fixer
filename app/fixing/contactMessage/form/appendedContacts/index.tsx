import { Call } from '@prisma/client';
import { FieldArray } from 'formik';
import { DateTime } from 'luxon';
import AppendedContactRow from './contactRow';
import HelpMessage from '../../../../layout/helpMessage';

export type AppendedContactsProps = {
  contacts: {
    contactId: string;
    contactMessageId: number | undefined;
    name: string;
    playerMessage: string | null;
    calls: number[];
  }[];
  eventCalls: Call[];
  bookingOrAvailability: string;
  addPlayerMessage: (index: number, message: string) => void;
  currentCallCount: number;
};

export default function AppendedContacts(props: AppendedContactsProps) {
  const {
    currentCallCount,
    addPlayerMessage,
    contacts,
    eventCalls,
    bookingOrAvailability,
  } = props;

  return (
    <div>
      {/* <h3>Contacts to Call</h3> */}
      <table className='my-4 w-full border'>
        <thead className='border-b bg-slate-50 text-sm'>
          <tr>
            <th>Queue Number</th>
            <th>Name</th>
            <th className=''>Position</th>
            {eventCalls.map((i) => (
              <th key={i.id} className='flex flex-col text-xs'>
                <p>
                  {DateTime.fromJSDate(new Date(i.startTime)).toFormat('HH:mm')}
                </p>
                <p>
                  {DateTime.fromJSDate(new Date(i.startTime)).toFormat('DD')}
                </p>
              </th>
            ))}
            <th>Options</th>
          </tr>
        </thead>
        <FieldArray name='contacts'>
          {({ remove, swap }) => (
            <tbody className=''>
              {contacts.length === 0 ? (
                <tr>
                  <td colSpan={4 + eventCalls.length} className='h-2'>
                    <div className='flex items-center justify-center text-center'>
                      <HelpMessage
                        head='No appended contacts.'
                        additional='Select from your diary contacts below.'
                      />
                    </div>
                  </td>
                </tr>
              ) : (
                contacts.map((i, index) => (
                  <AppendedContactRow
                    currentCallCount={currentCallCount}
                    addPlayerMessage={(index, message) =>
                      addPlayerMessage(index, message)
                    }
                    bookingOrAvailability={bookingOrAvailability}
                    key={i.contactId}
                    numContacts={contacts.length}
                    swap={(a, b) => swap(a, b)}
                    remove={() => remove(index)}
                    contact={i}
                    index={index}
                    eventCalls={eventCalls}
                  />
                ))
              )}
            </tbody>
          )}
        </FieldArray>
      </table>
    </div>
  );
}
