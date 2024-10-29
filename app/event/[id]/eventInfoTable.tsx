'use client'

import { Call, ContactMessage, Ensemble, EnsembleContact, EnsembleSection, Event, EventSection, User } from "@prisma/client"
import EventHeader from "./eventHeader"
import EventInfo from "./eventInfo"
import { useRef, useState } from "react"
import html2pdf from 'html2pdf.js';
import EventMenu from "./menu"
import { instrumentSections } from "../../contacts/lib"
import OrchestraList from "./orchestraList"
import FixingIndex from "../../fixing"


export type EventInfoTableProps = {
  event: Event & {
    calls: Call[],
    fixer: User,
  };
  calls: Call[];
  ensemble: (Ensemble & {
    sections: EnsembleSection[];
  });
  contacts: (ContactMessage & {
    contact: EnsembleContact
  })[]
  sections: (EventSection & {
    contacts: (ContactMessage & {
      contact: EnsembleContact;
      calls: Call[];
    })[];
    ensembleSection: EnsembleSection & {
      contacts: EnsembleContact[];
    };
  })[]
}

export default function EventInfoTable(props: EventInfoTableProps) {
  const {event, contacts, ensemble, sections } = props;
  const [selectedView, setSelectedView] = useState<"fixing"|"playerList">("fixing");
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

    html2pdf().from(eventTable).set(options).save();

  }

 

  return (
    <div className="w-full flex flex-col">
      <EventMenu  getRunningSheet={() => getRunningSheet()} event={event} contacts={contacts} />
      <table ref={eventRef} className="border w-full ">
        <EventHeader eventTitle={event.eventTitle}  />
        <EventInfo event={event} calls={event.calls} ensemble={ensemble} />
      </table>
      <select className="m-2 self-center border" value={selectedView} onChange={(e: any) => setSelectedView(e.target.value)}>
        <option value="playerList">Orchestra List</option>
        <option value="fixing">Fixing</option>
      </select>
      {selectedView === "playerList" 
      ? <div className="" >
        <OrchestraList sections={sections}/>
      </div> 
      : <FixingIndex
      ensembleSections={ensemble.sections}
      eventCalls={event.calls}
      eventSections={sections}
      eventId={event.id}
    />}
    </div>
  )
}