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
import { TiPlus } from 'react-icons/ti';
import { GrHalt } from 'react-icons/gr';

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
    const confMsg = 'Are you sure you want to pause all fixing for this event?';

    if (confirm(confMsg)) {
      try {
        return await axios.post('/fixing/eventSection/api/updateMany', {
          eventId: eventId,
          data: {
            bookingStatus: 'inactive',
          },
        });
      } catch (e) {
        throw new Error(e);
      }
    }
  };

  return (
    <div data-testid='fixing-index' className='flex flex-col p-4'>
      <div className='flex w-full flex-row justify-between'>
        <h2>Musicians</h2>
        <div className='flex flex-col items-center justify-center'>
          {eventSections.filter((i) => i.bookingStatus === 'active').length >
          0 ? (
            <button
              onClick={() => handlePauseClick()}
              className='m-2 flex w-full flex-row items-center justify-start rounded border border-red-600 p-1 text-center text-sm text-red-600 hover:bg-red-50'
            >
              <GrHalt />
              <p className='ml-1 flex w-full justify-center'>Pause Fixing</p>
            </button>
          ) : (
            <div className='m-1 flex flex-col text-center'>
              {eventSections.length > 0 && (
                <p className='text-sm text-amber-600'>No fixing active.</p>
              )}
            </div>
          )}

          <button
            className='m-2 flex w-full flex-row items-center rounded border border-blue-600 p-1 text-sm text-blue-600 hover:bg-blue-50'
            onClick={() => setCreateSection(true)}
          >
            <TiPlus />
            <p className='ml-1'>Create section</p>
          </button>
        </div>
      </div>

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
