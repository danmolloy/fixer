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
    <div data-testid="fixing-index" className="flex flex-col p-4">
      <div className="flex flex-row w-full justify-between"> 
        <h2>
          Musicians
        </h2>
        <button className="text-sm border rounded p-1 hover:bg-gray-50" onClick={() => setCreateSection(true)}>
          Create section
        </button>
      </div>
      {eventSections.length === 0 && !createSection
      ? <div className="flex flex-col items-center justify-center mx-2 my-8">
          <h3 className="font-semibold text-lg">No event sections.</h3>
          <p className="text-sm">Click Create section to get started.</p>
        </div>
      : createSection 
      ? <CreateEventSection 
          eventSections={eventSections}
          eventSectionId={undefined}
          numToBook={0}
          bookingStatus="OK"
          ensembleSectionId={undefined}
          eventId={eventId} 
          ensembleSections={ensembleSections} 
          setCreateSection={(arg) => setCreateSection(arg)} />
      : eventSections.map(i => (
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