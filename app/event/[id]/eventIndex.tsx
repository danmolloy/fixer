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
import useSWR from 'swr';
import axios from 'axios'
import { Session } from 'next-auth';
import Loading from '../../loading';
import { DateTime } from 'luxon';
 
const fetcher = url => axios.get(url).then(res => res.data)




const DynamicOrchestraList = dynamic(() => import('./orchestraList'), {
  ssr: false,
});

export type EventInfoTableProps = {
  eventID: string
  session: Session | null
};

export default function EventInfoTable(props: EventInfoTableProps) {
  const { eventID, session/* , contacts, ensemble, sections */ } = props;
    const { data, error, isLoading } = useSWR(`/event/${eventID}/api/`, fetcher)

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

    if (!data && isLoading) {
      return <Loading />
    }

    if (
    data && 
    session &&
    session.user.admins.filter((i) => i.ensembleId === data.ensembleId).length <
      1
  ) {
    <div>Access Denied</div>;
  }

  return (
    <div data-testid='event-info-table' className='flex w-full min-h-[65vh] flex-col relative'>
      <EventViewSelect
        selectedView={selectedView}
        setSelectedView={(arg) => setSelectedView(arg)}
      />
      {selectedView === 'details' ? (
        <div>
          <EventMenu
            getRunningSheet={() => getRunningSheet()}
            event={data}
            contacts={data.sections.map((i) => i.contacts).flat(1)}
          />
          <table ref={eventRef} className='w-full border'>
            <EventHeader eventTitle={data.eventTitle} />
            <EventInfo event={data} calls={data.calls} ensemble={data.ensemble} />
          </table>
        </div>
      ) : !data.ensemble.stripeSubscriptionId ? (
        <div>
          <p>No active subscription</p>
        </div>
      ) : selectedView === 'playerList' ? (
        <DynamicOrchestraList sections={data.sections}  />
      ) : selectedView === 'fullRun' ? (
        <FullRunIndex sections={data.sections} calls={data.calls} />
      ) : (
        <FixingIndex
          ensembleSections={data.ensemble.sections}
          eventCalls={data.calls}
          eventSections={data.sections}
          eventId={data.id}
          ensemble={data.ensemble}
        />
      )}
      <p className='text-sm  text-gray-500'>Last refreshed {DateTime.fromISO(data.refreshed).setZone('Europe/London')
            .toFormat("HH:mm.ss LLL dd, yyyy (ZZZZ)")}</p>
    </div>
  );
}
