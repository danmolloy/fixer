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
  bookingOrAvailability: string;
  editContacts: boolean;
  setEditContacts: (arg: boolean) => void;
};

export default function EventSectionContacts(props: EventSectionContactsProps) {
  const {
    editContacts,
    setEditContacts,
    bookingOrAvailability,
    currentContacts,
    eventSectionId,
    sectionContacts,
    eventCalls,
  } = props;

  return (
    <div data-testid='event-section-contacts' className='my-2 flex flex-col'>
      {currentContacts.filter(
        (i) => i.bookingOrAvailability === bookingOrAvailability
      ).length === 0 && editContacts === false ? (
        <div className='my-4 flex w-full flex-col items-center'>
          <p className='font-medium'>
            No{' '}
            {bookingOrAvailability.toLowerCase() === 'availability'
              ? 'availability checks'
              : 'booking calls'}{' '}
            made.
          </p>
          <p className='text-sm'>Click Edit Contacts to get started.</p>
        </div>
      ) : currentContacts.filter(
          (i) => i.bookingOrAvailability === bookingOrAvailability
        ).length > 0 ? (
        <CurrentContactMessages
          bookingOrAvailability={bookingOrAvailability}
          eventCalls={eventCalls}
          contacts={currentContacts}
        />
      ) : null}
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
