'use client'
import { Call, ContactMessage, EnsembleContact, EnsembleSection, EventSection } from "@prisma/client";
import CreateEventSection from "./eventSection/form";
import { useState } from "react";
import EventSectionIndex from "./eventSection";

export type FixingIndexProps = {
  eventId: number
  ensembleSections: (EnsembleSection)[]
  eventSections: (EventSection & {
    contacts: (ContactMessage & {
      contact: EnsembleContact
      calls: Call[]
      })[]
    ensembleSection: (EnsembleSection & {
      contacts: EnsembleContact[]
    })})[]
  eventCalls: Call[]
}

export default function FixingIndex(props: FixingIndexProps) {
  const { eventCalls, eventId, ensembleSections, eventSections } = props
  const [createSection, setCreateSection] = useState<boolean>(false)

  return (
    <div data-testid="fixing-index">
      <button onClick={() => setCreateSection(true)}>
        Create
      </button>
      {createSection 
      && <CreateEventSection 
          eventSections={eventSections}
          eventSectionId={undefined}
          numToBook={0}
          bookingStatus="OK"
          ensembleSectionId={undefined}
          eventId={eventId} 
          ensembleSections={ensembleSections} 
          setCreateSection={(arg) => setCreateSection(arg)} />}
          {eventSections.map(i => (
            <EventSectionIndex
              currentContacts={i.contacts}
              sectionContacts={i.ensembleSection.contacts}
              eventCalls={eventCalls} 
              eventSections={eventSections} 
              ensembleSections={ensembleSections} 
              key={i.id} 
              section={i} />
          ))}
    </div>
  )
}