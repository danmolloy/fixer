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
import Link from 'next/link';
import SectionMenu from './sectionMenu';
import SectionViewSelect from './viewSelect';

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
  const [callType, setCallType] = useState<'BOOKING' | 'AVAILABILITY'>(
    'BOOKING'
  );
  const [editContacts, setEditContacts] = useState<boolean>(false);

  return (
    <div
      data-testid={`${section.id}-event-section`}
      className='mx-1 my-4 rounded border p-2'
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
          <div className='flex w-full flex-row justify-between'>
            <h2>
              {section.ensembleSection.name}
              <span
                className={` ${section.bookingStatus !== 'ACTIVE' && 'text-amber-500'} text-sm`}
              >
                {' '}
                Booking {section.bookingStatus}
              </span>
            </h2>
            <SectionMenu
              editSection={() => setUpdateSection(true)}
              addToList={() => setEditContacts(true)}
            />
          </div>
          <div className='flex flex-col justify-between'>
            <div className='flex flex-row items-center'>
              <p className='ml-1 text-sm'>
                Booking {section.numToBook} player(s)
              </p>
            </div>
            <SectionViewSelect
              availabilityCheckCount={
                currentContacts.filter((i) => i.type === 'AVAILABILITY').length
              }
              selectedView={callType}
              setSelectedView={(arg) => setCallType(arg)}
              disabled={editContacts}
            />
          </div>
        </div>
      )}
      <EventSectionContacts
        editContacts={editContacts}
        setEditContacts={(arg) => setEditContacts(arg)}
        type={callType}
        currentContacts={currentContacts}
        eventCalls={eventCalls}
        eventSectionId={section.id}
        sectionContacts={sectionContacts}
      />
    </div>
  );
}
