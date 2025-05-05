import {
  Call,
  ContactEventCall,
  ContactMessage,
  EmailEvent,
  EnsembleContact,
  EnsembleSection,
  EventSection,
  Orchestration,
} from '@prisma/client';
import { useState } from 'react';
import CreateEventSection from './form';
import EventSectionContacts from '../contactMessage';
import SectionMenu from './sectionMenu';
import SectionViewSelect from './viewSelect';
import OrchestrationSummary from './orchestration';
import ToggleSwitch from '../../forms/toggle';
import axios from 'axios';

export type EventSectionProps = {
  section: EventSection & {
    ensembleSection: EnsembleSection;
    orchestration: Orchestration[];
  };
  ensembleSections: EnsembleSection[];
  eventSections: (EventSection & { ensembleSection: EnsembleSection })[];
  sectionContacts: EnsembleContact[];
  eventCalls: Call[];
  currentContacts: (ContactMessage & {
    eventCalls: (ContactEventCall & { call: Call })[];
    contact: EnsembleContact;
    emailEvents: EmailEvent[];
  })[];
  eventId: number;
};

export default function EventSectionIndex(props: EventSectionProps) {
  const {
    eventCalls,
    sectionContacts,
    section,
    ensembleSections,
    eventSections,
    currentContacts,
    eventId,
  } = props;
  const [updateSection, setUpdateSection] = useState<boolean>(false);
  const [callType, setCallType] = useState<'BOOKING' | 'AVAILABILITY'>(
    'BOOKING'
  );
  const [editContacts, setEditContacts] = useState<boolean>(false);
  const [hideDeclined, setHideDeclined] = useState<boolean>(false);


  const setBookingStatus = async () => {
    const confirmMsg = `Are you sure you want to ${section.bookingStatus === "ACTIVE" ? 'deactivate' : 'activate'} fixing for this section?`
    if (confirm(confirmMsg)) {
      return await axios.post('/fixing/eventSection/api/update', {
        bookingStatus: section.bookingStatus === "ACTIVE" ? "INACTIVE": "ACTIVE",
        eventSectionId: section.id,
      });
    }
  }

  return (
    <div
      data-testid={`${section.id}-event-section`}
      className=' mt-4 rounded border border-collapse'
    >
      {updateSection ? (
        <CreateEventSection
          orchestration={section.orchestration}
          eventCalls={eventCalls}
          eventSections={eventSections}
          eventSectionId={section.id}
          eventId={section.eventId}
          ensembleSections={ensembleSections}
          bookingStatus={section.bookingStatus}
          setCreateSection={(arg) => setUpdateSection(arg)}
          ensembleSectionId={section.ensembleSection.id}
        />
      ) : (
        <div className="p-1">
          <div className='flex w-full flex-row justify-between'>
            <h2>
              {section.ensembleSection.name[0] + section.ensembleSection.name.slice(1).toLocaleLowerCase()}
              
            </h2>

            <SectionMenu
              editSection={() => setUpdateSection(true)}
              addToList={() => setEditContacts(true)}
            />
          </div>
          <div className='flex flex-row justify-start items-center'>
            <ToggleSwitch enabled={section.bookingStatus === 'ACTIVE'} disabled={false} setEnabled={() => setBookingStatus()}/>
          <p
                className={` ${section.bookingStatus !== 'ACTIVE' && 'text-amber-500'} text-sm`}
              >
                {' '}
                Booking {section.bookingStatus.toLocaleLowerCase()}
              </p>
            {/* <div className='flex flex-row items-center'>
              
              <OrchestrationSummary
                eventCalls={eventCalls}
                orchestration={section.orchestration}
              />
            </div> */}
            
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
      )}
      <label className='flex flex-row items-center text-sm'>
              <input
                checked={hideDeclined}
                type='checkbox'
                className='m-1 mr-2'
                onChange={() => setHideDeclined(!hideDeclined)}
              />
              Hide declined
            </label>
      <EventSectionContacts
        orchestration={section.orchestration}
        eventId={eventId}
        editContacts={editContacts}
        setEditContacts={(arg) => setEditContacts(arg)}
        type={callType}
        currentContacts={
          hideDeclined
            ? currentContacts.filter(
                (contact) =>
                  !contact.eventCalls
                    .map((e) => e.status)
                    .includes('DECLINED') 
                    || contact.eventCalls
                    .map((e) => e.status)
                    .includes('ACCEPTED') 
              )
            : currentContacts
        }
        eventCalls={eventCalls}
        eventSectionId={section.id}
        sectionContacts={sectionContacts}
      />
    </div>
  );
}
