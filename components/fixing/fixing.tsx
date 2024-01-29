import useSwr from 'swr'
import React, { useState } from 'react'
import MobileFixing from './mobileFixing'
import OrchestraList from './orchestraList'
import { Call, EnsembleSection, Prisma, User } from '@prisma/client'
import { DateTime } from 'luxon'
import CreateInstrumentIndex from './instrument/create'
import UpdateIndex from './instrument/update'
import { EventWithCalls } from '../event/eventDetail/menu/calendarEventLink'

export type EventSectionWithMusiciansWithMusician = Prisma.EventSectionGetPayload<{
  include: {
    ensembleSection: {
      include: {
        members: true,
        extras: true
      }
    }
    musicians: {
      include: {
        musician: true,
        calls: true
      }
    }
  }
}>

export type FixingSection = Prisma.EventSectionGetPayload<{
  include: {
    musicians: {
      include: {
        musician: true,
        calls: true
      }
    },
    ensembleSection: {
      include: {
        members: true,
        extras: true
      }
    }
  }
}>

export type EnsembleSectionWithMusicians = Prisma.EnsembleSectionGetPayload<{
  include: {
    members: {
      include: {
        user: true
      }
    },
    extras: {
      include: {
        user: true
      }
    }
  }
}>


export type FixingProps = {
  eventCalls: Call[]
  instrumentSections: EventSectionWithMusiciansWithMusician[]
  eventId: number
  refreshProps: () => void
  isLoading: boolean
  lastUpdated: Date|null
  fixingSections: FixingSection[]
  ensembleSections: EnsembleSectionWithMusicians[]
  event: EventWithCalls
}

export const instrumentArr = ["Violin", "Viola", "Cello", "Double Bass", "Flute", "Oboe", "Clarinet", "Bassoon", "Horn", "Trumpet", "Trombone", "Tuba", "Harp", "Timpani", "Percussion"]
export const sectionsArr = ["Flute", "Oboe", "Clarinet", "Bassoon", "Horn", "Trumpet", "Trombone", "Tuba", "Timpani", "Percussion", "Harp", "Violin 1", "Violin 2", "Viola", "Cello", "Double Bass"]


export default function Fixing(props: FixingProps) {
  const { event, fixingSections, ensembleSections, lastUpdated, eventCalls, instrumentSections, eventId, refreshProps, isLoading } = props
  const [selectedInstrument, setSelectedInstrument] = useState<string>("")
  const [viewList, setViewList] = useState<boolean>(false)

  if (isLoading) {
    return <p>Loading</p>
  }


  return (
    <div className="w-screen flex flex-col justify-center" data-testid="event-fixing">
      <div className="flex flex-row items-center justify-between   px-8 py-4 mt-8">
        <div data-testid="fixing-header">
        <h1>Personnel</h1>
{/*         <InstrumentationShorthand instrumentSections={instrumentSections} />
 */}        {lastUpdated !== null && <p className='text-sm text-zinc-400'>Last refreshed {String(DateTime.fromJSDate(lastUpdated).toFormat("HH:mm:ss DD"))}</p>}
        </div>
        <div>
          <button data-testid="view-list-btn" onClick={() => setViewList(!viewList)} className="border border-blue-300 text-blue-600 m-1 rounded p-1 shadow hover:border-blue-600 hover:bg-blue-50 active:bg-blue-300">
            {!viewList ? "View List" : "View Instruments"}
            </button>
          <button data-testid="refresh-btn" onClick={() => refreshProps()} className="border border-yellow-500 text-yellow-600 m-1 rounded p-1 shadow hover:border-yellow-600 hover:bg-yellow-50 active:bg-yellow-300">Refresh</button>
        </div>
      </div>
      {viewList 
      ? <OrchestraList setViewList={(arg) => setViewList(arg)} instrumentSections={instrumentSections}/>
      :<div data-testid="instrument-tiles">
        <MobileFixing

        refreshProps={() => refreshProps()} 
        eventCalls={event.calls}
        ensembleSections={ensembleSections}
        fixingSections={fixingSections}
        event={event}
        setSelectedInstrument={(instrument) => setSelectedInstrument(instrument)} 
        selectedInstrument={selectedInstrument}/>
        <div data-testid="fixing-sections" className="hidden w-screen sm:flex flex-row flex-wrap items-start justify-center ">
          {fixingSections.map(i => (
            <UpdateIndex key={i.id} refreshProps={() => refreshProps()} event={event} playerCalls={i.musicians} ensembleSection={ensembleSections.find(j => j.id === i.ensembleSectionId)} eventSection={i}/>
          ))}
        </div>
        <div data-testid="ensemble-sections" className='hidden w-screen sm:flex'>
          {ensembleSections.filter(i => (
            !fixingSections.map(j => j.ensembleSectionId).includes(i.id)
            )).map(i => (
              <CreateInstrumentIndex refreshProps={() => refreshProps()} eventId={eventId} key={i.id} eventCalls={eventCalls} section={i}/>
          ))}
        </div>
      </div>}
    </div>
  )
}
