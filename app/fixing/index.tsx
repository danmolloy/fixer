'use client';
import {
  Call,
  ContactEventCall,
  ContactMessage,
  EmailEvent,
  Ensemble,
  EnsembleContact,
  EnsembleSection,
  EventSection,
  Orchestration,
} from '@prisma/client';
import CreateEventSection from './eventSection/form';
import { useState } from 'react';
import EventSectionIndex from './eventSection';
import axios, { AxiosResponse } from 'axios';
import { TiPlus } from 'react-icons/ti';
import { GrHalt } from 'react-icons/gr';
import { getBillingRoute } from '../billing/api/manage/lib';
import FixingMenu from './menu';
import { IoIosRefresh } from "react-icons/io";
import { mutate } from 'swr';

export type FixingIndexProps = {
  eventId: number;
  ensemble: Ensemble;
  ensembleSections: EnsembleSection[];
  eventSections: (EventSection & {
    orchestration: Orchestration[];
    contacts: (ContactMessage & {
      eventCalls: (ContactEventCall & { call: Call })[];
      contact: EnsembleContact;
      emailEvents: EmailEvent[];
    })[];
    ensembleSection: EnsembleSection & {
      contacts: EnsembleContact[];
    };
  })[];
  eventCalls: Call[];
};

export default function FixingIndex(props: FixingIndexProps) {
  const { eventCalls, eventId, ensembleSections, eventSections, ensemble } =
    props;
  const [createSection, setCreateSection] = useState<boolean>(false);

  const handlePauseClick = async () => {
    const confMsg = 'Are you sure you want to pause all fixing for this event?';

    if (confirm(confMsg)) {
      try {
        return await axios.post('/fixing/eventSection/api/updateMany', {
          eventId: eventId,
          data: {
            bookingStatus: 'INACTIVE',
          },
        });
      } catch (e) {
        throw new Error(e);
      }
    }
  };

  const handleSubscribe = async () => {
    let response: AxiosResponse;
    response = await getBillingRoute(ensemble);
    try {
      if (response.data?.url) {
        window.location.href = response.data.url;
      } else {
        throw new Error('Checkout URL not returned');
      }
    } catch (error) {
      console.error('Error during checkout:', error);
      alert('An error occurred while processing your request.');
    } /* finally {
      setLoading(false);
    } */
  };

  if (
    !ensemble.stripeSubscriptionId ||
    ensemble.stripeSubscriptionId === null
  ) {
    return (
      <div>
        <p>You must subscribe to book players.</p>
        <button onClick={() => handleSubscribe()}>Subscribe</button>
      </div>
    );
  }

  return (
    <div data-testid='fixing-index' className='flex flex-col p-1'>
      <div className='flex w-full flex-row-reverse justify-between'>
        {/* <h2>Fixing</h2> */}
        <FixingMenu
          eventID={String(eventId)}
          fixingActive={
            eventSections.filter((i) => i.bookingStatus === 'ACTIVE').length > 0
          }
          pauseFixing={() => handlePauseClick()}
          createSection={() => setCreateSection(true)}
        />
        {eventSections.length > 0 
        && <button className='flex flex-row p-1 m-1 border rounded hover:bg-slate-50 items-center' onClick={() => mutate(`/event/${eventId}/api/`)}>
              <IoIosRefresh />
              <p className='text-sm ml-1'>Refresh</p>
            </button>}
      </div>

      {eventSections.length === 0 && !createSection ? (
        <div className='mx-2 my-8 flex flex-col items-center justify-center'>
          <h3 className='text-lg font-semibold'>No event sections.</h3>
          <p className='text-sm'>Create a section to get started.</p>
          <button
            className='m-2 flex w-32 flex-row items-center justify-center rounded border p-1 text-sm hover:bg-slate-50'
            onClick={() => setCreateSection(true)}
          >
            Create Section
          </button>
        </div>
      ) : createSection ? (
        <CreateEventSection
          orchestration={[]}
          eventCalls={eventCalls}
          eventSections={eventSections}
          eventSectionId={undefined}
          //numToBook={0}
          bookingStatus='ACTIVE'
          ensembleSectionId={undefined}
          eventId={eventId}
          ensembleSections={ensembleSections}
          setCreateSection={(arg) => setCreateSection(arg)}
        />
      ) : (
        <div className="flex flex-col">
          {eventSections.map((i) => (
          <EventSectionIndex
            eventId={eventId}
            currentContacts={i.contacts}
            sectionContacts={i.ensembleSection.contacts}
            eventCalls={eventCalls}
            eventSections={eventSections}
            ensembleSections={ensembleSections}
            key={i.id}
            section={i}
          />
        ))}
        <button
            className='m-2 self-end mt-4 flex w-32 flex-row items-center justify-center rounded border p-1 text-sm hover:bg-slate-50'
            onClick={() => setCreateSection(true)}
          >
            Add Section
          </button>
        </div>
      )}
    </div>
  );
}
