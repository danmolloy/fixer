'use client';
import {
  Call,
  ContactEventCall,
  ContactMessage,
  EmailEvent,
  Ensemble,
  EnsembleContact,
  EnsembleSection,
  Event,
  EventSection,
  Orchestration,
  User,
} from '@prisma/client';
import EventHeader from './eventHeader';
import EventInfo from './eventInfo';
import { useRef, useState } from 'react';
import EventMenu from './menu';
//import OrchestraList from './orchestraList';
import FixingIndex from '../../fixing';
import FullRunIndex from './fullRun';
import EventViewSelect from './viewSelect';
import dynamic from 'next/dynamic';

const DynamicOrchestraList = dynamic(() => import('./orchestraList'), {
  ssr: false,
});

export type EventInfoTableProps = {
  event: Event & {
    calls: Call[];
    fixer: User;
  };
  calls: Call[];
  ensemble: Ensemble & {
    sections: EnsembleSection[];
  };
  contacts: (ContactMessage & {
    contact: EnsembleContact;
    eventCalls: ContactEventCall[]
  })[];
  sections: (EventSection & {
    orchestration: Orchestration[];
    contacts: (ContactMessage & {
      emailEvents: EmailEvent[];
      eventCalls: (ContactEventCall & { call: Call })[];
      contact: EnsembleContact;
      //calls: Call[];
    })[];
    ensembleSection: EnsembleSection & {
      contacts: EnsembleContact[];
    };
  })[];
};

export default function EventInfoTable(props: EventInfoTableProps) {
  const { event, contacts, ensemble, sections } = props;
  const [selectedView, setSelectedView] = useState<
    'details' | 'fixing' | 'playerList' | 'fullRun'
  >('details');
  const eventRef = useRef(null);

  const getRunningSheet = () => {
    const eventTable = eventRef.current;

    const options = {
      margin: 1,
      filename: 'event_details.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
    };

    //html2pdf().from(eventTable).set(options).save();
  };

  return (
    <div data-testid='event-info-table' className='flex w-full flex-col'>
      <EventViewSelect
        selectedView={selectedView}
        setSelectedView={(arg) => setSelectedView(arg)}
      />
      {selectedView === 'details' ? (
        <div>
          <EventMenu
            getRunningSheet={() => getRunningSheet()}
            event={event}
            contacts={contacts}
          />
          <table ref={eventRef} className='w-full border'>
            <EventHeader eventTitle={event.eventTitle} />
            <EventInfo event={event} calls={event.calls} ensemble={ensemble} />
          </table>
        </div>
      ) : !ensemble.stripeSubscriptionId ? (
        <div>
          <p>No active subscription</p>
        </div>
      ) : selectedView === 'playerList' ? (
        <DynamicOrchestraList sections={sections} />
      ) : selectedView === 'fullRun' ? (
        <FullRunIndex sections={sections} calls={event.calls} />
      ) : (
        <FixingIndex
          ensembleSections={ensemble.sections}
          eventCalls={event.calls}
          eventSections={sections}
          eventId={event.id}
          ensemble={ensemble}
        />
      )}
    </div>
  );
}
