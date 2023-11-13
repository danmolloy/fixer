import useSwr from 'swr'
import React, { useState } from 'react'
import MobileFixing from './mobileFixing'
import moment from 'moment'
import OrchestraList from './orchestraList'
import { Call, Prisma, User } from '@prisma/client'
import FixingInstrument from './instrument'

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
        {lastUpdated !== null && <p className='text-sm text-zinc-400'>Last updated {String(moment(lastUpdated).format("HH:mm:ss D MMMM YYYY"))}</p>}
        </div>
        <div>
          <button data-testid="view-list-btn" onClick={() => setViewList(!viewList)} className="border border-blue-300 text-blue-600 m-1 rounded p-1 shadow hover:border-blue-600 hover:bg-blue-50 active:bg-blue-300">View List</button>
          <button data-testid="refresh-btn" onClick={() => refreshProps()} className="border border-yellow-500 text-yellow-600 m-1 rounded p-1 shadow hover:border-yellow-600 hover:bg-yellow-50 active:bg-yellow-300">Refresh</button>
        </div>
      </div>
      {viewList && <OrchestraList setViewList={(arg) => setViewList(arg)} instrumentSections={instrumentSections}/>}
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
              directoryMusicians={users.filter(j => j.instrumentsList.map(i => i.toLocaleLowerCase()).includes(i.instrumentName.toLocaleLowerCase()))}
              eventCalls={eventCalls}
              eventInstrument={i}
              refreshProps={() => refreshProps()} />
          
          )) }
      </div>
    </div>
  )
}