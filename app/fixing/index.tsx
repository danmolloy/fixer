'use client';
import {
  Call,
  ContactMessage,
  EnsembleContact,
  EnsembleSection,
  EventSection,
} from '@prisma/client';
import CreateEventSection from './eventSection/form';
import { useState } from 'react';
import EventSectionIndex from './eventSection';
import axios from 'axios';

export type FixingIndexProps = {
  eventId: number;
  ensembleSections: EnsembleSection[];
  eventSections: (EventSection & {
    contacts: (ContactMessage & {
      contact: EnsembleContact;
      calls: Call[];
    })[];
    ensembleSection: EnsembleSection & {
      contacts: EnsembleContact[];
    };
  })[];
  eventCalls: Call[];
};

export default function FixingIndex(props: FixingIndexProps) {
  const { eventCalls, eventId, ensembleSections, eventSections } = props;
  const [createSection, setCreateSection] = useState<boolean>(false);

  const handlePauseClick = async () => {
    const confMsg = "Are you sure you want to pause all fixing for this event?"

    if (confirm(confMsg)) {
      try {
        return await axios.post("/fixing/eventSection/api/updateMany", {eventId: eventId, data: {
          bookingStatus: "inactive"
        }});

      }
      catch(e) {
        throw new Error(e);
      }
    }
  }

  return (
    <div data-testid='fixing-index' className='flex flex-col p-4'>
      <div className='flex w-full flex-row justify-between'>
        <h2>Musicians</h2>
        <button
          className='rounded border p-1 text-sm hover:bg-gray-50'
          onClick={() => setCreateSection(true)}
        >
          Create section
        </button>
      </div>
      {eventSections.filter(i => (
            i.bookingStatus === "active"
          )).length > 0 
          ? <button 
            onClick={() => handlePauseClick()} 
            className='p-1 m-2 text-white bg-red-500 hover:bg-red-400 sm:w-1/2 rounded w-60 self-center'>
            Pause All Fixing
          </button> 
          : <div className='flex flex-col text-center my-4'>
              {eventSections.length > 0 
              && <p className='text-lg font-semibold'>No fixing currently active.</p>}
            </div>}
      {eventSections.length === 0 && !createSection ? (
        <div className='mx-2 my-8 flex flex-col items-center justify-center'>
          <h3 className='text-lg font-semibold'>No event sections.</h3>
          <p className='text-sm'>Click Create section to get started.</p>
        </div>
      ) : createSection ? (
        <CreateEventSection
          eventSections={eventSections}
          eventSectionId={undefined}
          numToBook={0}
          bookingStatus='active'
          ensembleSectionId={undefined}
          eventId={eventId}
          ensembleSections={ensembleSections}
          setCreateSection={(arg) => setCreateSection(arg)}
        />
      ) : (
        eventSections.map((i) => (
          <EventSectionIndex
            currentContacts={i.contacts}
            sectionContacts={i.ensembleSection.contacts}
            eventCalls={eventCalls}
            eventSections={eventSections}
            ensembleSections={ensembleSections}
            key={i.id}
            section={i}
          />
        ))
      )}

    </div>
  );
}
