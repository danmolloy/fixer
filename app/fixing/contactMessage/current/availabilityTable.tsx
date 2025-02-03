import { Call, ContactEventCall, ContactMessage, EnsembleContact } from '@prisma/client';
import { DateTime } from 'luxon';
import CurrentContactRow from './contact';
import AvailabilityContactRow from './availabilityCheckContact';
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export type CurrentContactMessagesProps = {
  eventCalls: Call[];
  contacts: (ContactMessage & {
    contact: EnsembleContact;
    //calls: Call[];
    eventCalls: (ContactEventCall & {call: Call})[]
  })[];
  type: 'BOOKING' | 'AVAILABILITY';
};

export default function AvailabilityTable(
  props: CurrentContactMessagesProps
) {
  const { contacts, eventCalls, type } = props;
  const [selectedContacts, setSelectedContacts] = useState<number[]>([]);
  const router = useRouter();

  const typedContacts = contacts.filter((i) =>
    type === 'AVAILABILITY'
      ? i.type === 'AVAILABILITY'
      : i.type === 'BOOKING' || i.type === 'AUTOBOOK'
  );

  const cancelCheck = async () => {
    const check = confirm(`
      Are you sure you want to cancel ${selectedContacts.length} availability check(s)? 
      They will get an alert saying the are not required.`)

    if (check) {
      return await axios
        .post('/fixing/contactMessage/api/updateMany', {
          contactIDs: selectedContacts,
          data: {status: "CANCELLED"}
        })
        .then(() => {
          router.refresh();
          setSelectedContacts([]);
        });
    }
  };

  return (
    <div className='w-full  flex flex-col'>
      <div>
        <button disabled={selectedContacts.length === typedContacts.length} className='m-1 px-2 py-1 rounded border hover:bg-gray-50 disabled:opacity-40 text-sm' onClick={() => setSelectedContacts(typedContacts.map(i => i.id))}>
          Select All
        </button>
        <button disabled={selectedContacts.length === 0} className='m-1 px-2 py-1 rounded border hover:bg-gray-50 disabled:opacity-40 text-sm' onClick={() => setSelectedContacts([])}>
          Deselect All
        </button>
        <button disabled={selectedContacts.length === 0} className='m-1 px-2 py-1 rounded border hover:bg-gray-50 disabled:opacity-40 text-sm' onClick={() => cancelCheck()}>
          Cancel Check
        </button>
      </div>
    <table
      data-testid='current-contacts-table'
      className='my-4 table-auto rounded border'
    >
      <thead data-testid='table-head' className='border bg-slate-50 text-sm'>
        <tr>
          {type !== 'AVAILABILITY' && <th>Queue Number</th>}
          <th></th>
          <th>Name</th>
          <th>Position</th>
          {eventCalls.map((i) => (
            <th data-testid={`${i.id}-col`} key={i.id} className='text-xs'>
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
        {typedContacts.map((i, index) => (
          <AvailabilityContactRow
            selectedContacts={selectedContacts}
            setSelectedContacts={selectedContacts.includes(i.id) 
              ? () => setSelectedContacts(selectedContacts.filter(j => j !== i.id))
              : () => setSelectedContacts([...selectedContacts, i.id])
            }
            numContacts={typedContacts.length}
            index={index + 1}
            key={i.id}
            eventCalls={eventCalls}
            contact={i}
          />
        ))}
      </tbody>
    </table>
    </div>
  );
}
