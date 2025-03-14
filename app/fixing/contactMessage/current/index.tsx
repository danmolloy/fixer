import {
  Call,
  ContactEventCall,
  ContactMessage,
  EmailEvent,
  EnsembleContact,
  Orchestration,
} from '@prisma/client';
import { DateTime } from 'luxon';
import CurrentContactRow from './contact';
import AvailabilityTable from './availabilityTable';

export type CurrentContactMessagesProps = {
  orchestration: Orchestration[]
  eventCalls: Call[];
  contacts: (ContactMessage & {
    eventCalls: (ContactEventCall & { call: Call })[];
    contact: EnsembleContact;
    emailEvents: EmailEvent[];
  })[];
  type: 'BOOKING' | 'AVAILABILITY';
};

export default function CurrentContactMessages(
  props: CurrentContactMessagesProps
) {
  const { contacts, eventCalls, type, orchestration } = props;

  const typedContacts = contacts.filter((i) =>
    type === 'AVAILABILITY'
      ? i.type === 'AVAILABILITY'
      : i.type === 'BOOKING' || i.type === 'AUTOBOOK'
  );

  return type === 'AVAILABILITY' ? (
    <AvailabilityTable eventCalls={eventCalls} contacts={contacts} />
  ) : (
    <table
      data-testid='current-contacts-table'
      className='my-4 table-auto rounded border'
    >
      <thead data-testid='table-head' className='border bg-slate-50 text-sm'>
        <tr>
          <th>Queue Number</th>
          <th>Name</th>
          <th>Position</th>
          {eventCalls.map((i) => (
            <th data-testid={`${i.id}-col`} key={i.id} className='text-xs'>
              <p>
                {DateTime.fromJSDate(new Date(i.startTime)).toFormat('HH:mm')}
              </p>
              <p>{DateTime.fromJSDate(new Date(i.startTime)).toFormat('DD')}</p>
              <p>{contacts.filter(c => c.type !== "AVAILABILITY" && c.eventCalls.filter(j => j.status === "ACCEPTED" &&j.callId === i.id).map(j => j.callId).includes(i.id)).length}/{orchestration.find(o => o.callId === i.id)?.numRequired || 0} Booked</p>
            </th>
          ))}
          <th>Status</th>
          <th>Options</th>
        </tr>
      </thead>
      <tbody>
        {typedContacts.map((i, index) => (
          <CurrentContactRow
            numContacts={typedContacts.length}
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
