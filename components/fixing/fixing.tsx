import useSwr from 'swr'
import React, { useState } from 'react'
import MobileFixing from './mobileFixing'
import OrchestraList from './orchestraList'
import { Call, Prisma, User } from '@prisma/client'
import FixingInstrument from './instrument'
import { DateTime } from 'luxon'
import InstrumentationShorthand from './instrumentationShorthand'

export type EventInstrumentWithMusiciansWithMusician = Prisma.EventInstrumentGetPayload<{
  include: {
    musicians: {
      include: {
        musician: true,
        calls: true
      }
    }
  }
}>

export type FixingProps = {
  eventCalls: Call[]
  instrumentSections: EventInstrumentWithMusiciansWithMusician[]
  eventId: number
  refreshProps: () => void
  users: User[]
  isLoading: boolean
  lastUpdated: Date|null
}

export const instrumentArr = ["Violin", "Viola", "Cello", "Double Bass", "Flute", "Oboe", "Clarinet", "Bassoon", "Horn", "Trumpet", "Trombone", "Tuba", "Harp", "Timpani", "Percussion"]
export const sectionsArr = ["Flute", "Oboe", "Clarinet", "Bassoon", "Horn", "Trumpet", "Trombone", "Tuba", "Timpani", "Percussion", "Harp", "Violin 1", "Violin 2", "Viola", "Cello", "Double Bass"]


export default function Fixing(props: FixingProps) {
  const { lastUpdated, eventCalls, instrumentSections, eventId, refreshProps, users, isLoading } = props
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
        <InstrumentationShorthand instrumentSections={instrumentSections} />
        {lastUpdated !== null && <p className='text-sm text-zinc-400'>Last refreshed {String(DateTime.fromJSDate(lastUpdated).toFormat("HH:mm:ss DD"))}</p>}
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
      :<div>
        <MobileFixing 
        {...props}
        
        setSelectedInstrument={(instrument) => setSelectedInstrument(instrument)} 
        instrumentSections={instrumentSections} 
        selectedInstrument={selectedInstrument}/>
      <div className="hidden w-screen sm:flex flex-row flex-wrap items-start justify-center ">
        {instrumentSections.sort((a, b) => a.id - b.id).map(i => (
            <FixingInstrument
              key={i.id}
              playerCalls={i.musicians}
              directoryMusicians={
                i.instrumentName === "Violin 1" || i.instrumentName === "Violin 2" 
                ? users.filter(j => j.instrumentsList.map(i => i.toLocaleLowerCase()).includes("violin"))
                : users.filter(j => j.instrumentsList.map(i => i.toLocaleLowerCase()).includes(i.instrumentName.toLocaleLowerCase()))
              }
              eventCalls={eventCalls}
              eventInstrument={i}
              refreshProps={() => refreshProps()} />
          
          )) }
      </div>
      </div>}
    </div>
  )
}