import {
  Call,
  ContactMessage,
  EnsembleContact,
  EnsembleSection,
  EventSection,
} from '@prisma/client';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import CreateEventSection from './form';
import EventSectionContacts from '../contactMessage';

export type EventSectionProps = {
  section: EventSection & { ensembleSection: EnsembleSection };
  ensembleSections: EnsembleSection[];
  eventSections: (EventSection & { ensembleSection: EnsembleSection })[];
  sectionContacts: EnsembleContact[];
  eventCalls: Call[];
  currentContacts: (ContactMessage & {
    contact: EnsembleContact;
    calls: Call[];
  })[];
};

export default function EventSectionIndex(props: EventSectionProps) {
  const {
    eventCalls,
    sectionContacts,
    section,
    ensembleSections,
    eventSections,
    currentContacts,
  } = props;
  const router = useRouter();
  const [updateSection, setUpdateSection] = useState<boolean>(false);

  const handleDelete = async () => {
    return (
      confirm(`Are you sure you want to delete this section?`) &&
      (await axios.post('/fixing/eventSection/api/delete', {
        sectionId: section.id,
      }))
    );
  };

  return (
    <div
      data-testid={`${section.id}-event-section`}
      className='m-2 rounded border p-2'
    >
      {updateSection ? (
        <CreateEventSection
          eventSections={eventSections}
          eventSectionId={section.id}
          eventId={section.eventId}
          ensembleSections={ensembleSections}
          bookingStatus={section.bookingStatus}
          numToBook={section.numToBook}
          setCreateSection={(arg) => setUpdateSection(arg)}
          ensembleSectionId={section.ensembleSection.id}
        />
      ) : (
        <div>
          <div className='flex flex-row justify-between'>
            <h2>{section.ensembleSection.name}</h2>
            <div>
              <button
                className='mx-1 rounded border border-red-500 px-2 py-1 text-sm text-red-500 hover:bg-red-50'
                data-testid='delete-section'
                onClick={() => handleDelete()}
              >
                Delete
              </button>
            </div>
          </div>
          <div className='flex flex-row items-center'>
            <p className='text-sm'>Booking {section.numToBook} player(s)</p>
            <button
              className='mx-1 rounded border p-1 text-xs hover:bg-gray-50'
              onClick={() => setUpdateSection(true)}
            >
              Change
            </button>
          </div>
        </div>
      )}
      <EventSectionContacts
        currentContacts={currentContacts}
        eventCalls={eventCalls}
        eventSectionId={section.id}
        sectionContacts={sectionContacts}
      />
    </div>
  );
}
