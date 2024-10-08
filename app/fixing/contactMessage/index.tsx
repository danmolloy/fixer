import { useState } from 'react';
import ContactMessageForm from './form';
import { Call, ContactMessage, EnsembleContact } from '@prisma/client';
import CurrentContactMessages from './current';

export type EventSectionContactsProps = {
  eventSectionId: number;
  sectionContacts: EnsembleContact[];
  eventCalls: Call[];
  currentContacts: (ContactMessage & {
    contact: EnsembleContact;
    calls: Call[];
  })[];
};

export default function EventSectionContacts(props: EventSectionContactsProps) {
  const { currentContacts, eventSectionId, sectionContacts, eventCalls } =
    props;
  const [editContacts, setEditContacts] = useState<boolean>(false);
  const [bookingOrAvailability, setBookingOrAvailability] =
    useState<string>('Booking');

  return (
    <div data-testid='event-section-contacts' className='my-2 flex flex-col'>
      <select
        className='w-48 self-center rounded border p-1'
        data-testid='status-select'
        disabled={editContacts}
        onChange={(e) => setBookingOrAvailability(e.target.value)}
      >
        <option value='Booking'>Booking</option>
        <option value='Availability'>Availability</option>
      </select>
      <CurrentContactMessages
        bookingOrAvailability={bookingOrAvailability}
        eventCalls={eventCalls}
        contacts={currentContacts}
      />
      {!editContacts && (
        <button
          className='my-2 self-end rounded border px-2 py-1 text-sm'
          onClick={() => setEditContacts(!editContacts)}
        >
          Edit Contacts
        </button>
      )}
      {editContacts && (
        <ContactMessageForm
          currentContacts={currentContacts}
          eventCalls={eventCalls}
          cancelForm={() => setEditContacts(false)}
          eventContacts={[]}
          eventSectionId={eventSectionId}
          bookingOrAvailability={bookingOrAvailability}
          sectionContacts={sectionContacts}
        />
      )}
    </div>
  );
}
