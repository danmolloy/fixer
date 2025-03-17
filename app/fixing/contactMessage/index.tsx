import ContactMessageForm from './form';
import {
  Call,
  ContactEventCall,
  ContactMessage,
  EmailEvent,
  EnsembleContact,
  Orchestration,
} from '@prisma/client';
import CurrentContactMessages from './current';

export type EventSectionContactsProps = {
  orchestration: Orchestration[];
  eventSectionId: number;
  sectionContacts: EnsembleContact[];
  eventCalls: Call[];
  currentContacts: (ContactMessage & {
    eventCalls: (ContactEventCall & { call: Call })[];
    contact: EnsembleContact;
    emailEvents: EmailEvent[];
  })[];
  type: 'BOOKING' | 'AVAILABILITY';
  editContacts: boolean;
  setEditContacts: (arg: boolean) => void;
  eventId: number;
};

export default function EventSectionContacts(props: EventSectionContactsProps) {
  const {
    orchestration,
    editContacts,
    setEditContacts,
    currentContacts,
    eventSectionId,
    sectionContacts,
    eventCalls,
    type,
    eventId,
  } = props;

  return (
    <div data-testid='event-section-contacts' className='my-2 flex flex-col'>
      {currentContacts.filter((i) =>
        type === 'AVAILABILITY'
          ? i.type === 'AVAILABILITY'
          : i.type === 'BOOKING' || i.type === 'AUTOBOOK'
      ).length === 0 && editContacts === false ? (
        <div className='my-4 flex w-full flex-col items-center'>
          <p className='font-medium'>
            No{' '}
            {type === 'AVAILABILITY' ? 'availability checks' : 'booking calls'}{' '}
            made.
          </p>
          <p className='text-sm'>Add contacts to get started.</p>
          <button
            onClick={() => setEditContacts(true)}
            className='mt-4 rounded border p-1 text-sm hover:bg-slate-50'
          >
            Add Contacts
          </button>
        </div>
      ) : currentContacts.filter((i) =>
          type === 'AVAILABILITY'
            ? i.type === 'AVAILABILITY'
            : i.type === 'BOOKING' || i.type === 'AUTOBOOK'
        ).length > 0 ? (
        <CurrentContactMessages
          orchestration={orchestration}
          type={type}
          eventCalls={eventCalls}
          contacts={currentContacts}
        />
      ) : null}
      {editContacts && (
        <ContactMessageForm
          eventId={eventId}
          currentContacts={currentContacts}
          eventCalls={eventCalls}
          cancelForm={() => setEditContacts(false)}
          eventContacts={[]}
          eventSectionId={eventSectionId}
          type={type}
          sectionContacts={sectionContacts}
        />
      )}
    </div>
  );
}
