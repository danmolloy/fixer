import { Call, ContactMessage, EnsembleContact } from '@prisma/client';
import { DateTime } from 'luxon';
import CurrentContactRow from './contact';

export type CurrentContactMessagesProps = {
  eventCalls: Call[];
  contacts: (ContactMessage & {
    contact: EnsembleContact;
    calls: Call[];
  })[];
  bookingOrAvailability: string;
};

export default function CurrentContactMessages(
  props: CurrentContactMessagesProps
) {
  const { contacts, eventCalls, bookingOrAvailability } = props;


  return (
    <table className='table-auto border rounded my-4'>
      <thead className='border bg-slate-50 text-sm'>
        <tr>
          <th>Queue Number</th>
          <th>Name</th>
          <th>Position</th>
          {eventCalls.map((i) => (
            <th key={i.id} className='flex flex-col text-xs'>
              <p>
                {DateTime.fromJSDate(new Date(i.startTime)).toFormat('HH:mm')}
              </p>
              <p>{DateTime.fromJSDate(new Date(i.startTime)).toFormat('DD')}</p>
            </th>
          ))}
          <th>Status</th>
          <th>Options</th>
        </tr>
      </thead>
      <tbody>
        {contacts
          .filter((i) => i.bookingOrAvailability === bookingOrAvailability)
          .map((i, index) => (
            <CurrentContactRow
              numContacts={contacts.length}
              index={index + 1}
              key={i.id}
              eventCalls={eventCalls}
              contact={i}
            />
          ))}
      </tbody>
    </table>
  );
}
