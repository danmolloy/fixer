import useSwr from 'swr'
import InstrumentTile from './instrumentTile'
import React, { useState } from 'react'
import MobileFixing from './mobileFixing'
import moment from 'moment'

export type EventCall = {
  id: number
  createdAt: string
  updatedAt: string
  startTime: string
  endTime: string
  venue: string
  eventId: number
  fixerEmail: string
}

export type User = {
  id: string
  name: string
  email: null|string
  emailVerified: null|boolean
  image: null|string
  instrument: string
  profileInfo: null|string
  firstName: null|string
  lastName: null|string
  mobileNumber: null|string
}

export type Musician = {
  id: number
  createdAt: string
  updatedAt: string
  recieved: boolean
  accepted: boolean|null
  musicianEmail: string
  eventInstrumentId: number
  bookingOrAvailability: "Booking"|"Availability"
  musician: {
    name: string
  }
  calls: {
    id: number
  }[]
}

export type InstrumentSection = {
  id: number
  createdAt: string
  updatedAt: string
  eventId: number
  instrumentName: string
  numToBook: number
  callOrder: string
  musicians: Musician[]
}

export type FixingProps = {
  eventCalls: EventCall[]
  instrumentSections: InstrumentSection[]
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

  return (
    <div className="w-screen flex flex-col justify-center" data-testid="event-fixing">
      <div className="flex flex-row items-center justify-between   px-8 py-4 mt-8">
        <div>
        <h1>Personnel</h1>
        {lastUpdated !== null && <p className='text-sm text-zinc-400'>Last updated {String(moment(lastUpdated).format("HH:mm:ss D MMMM YYYY"))}</p>}
        </div>
        <button onClick={() => refreshProps()} className="border border-blue-300 text-blue-600 m-2 rounded p-2 shadow hover:border-blue-600 hover:bg-blue-50 active:bg-blue-300">Refresh</button>
      </div>
      <MobileFixing 
        {...props}
        
        setSelectedInstrument={(instrument) => setSelectedInstrument(instrument)} 
        instrumentSections={instrumentSections} 
        selectedInstrument={selectedInstrument}/>
      <div className="hidden w-screen sm:flex flex-row flex-wrap items-start justify-center ">
        {instrumentSections.sort((a, b) => a.id - b.id).map(i => (
          <div key={i.id} className="border sm:border-slate-400 flex flex-col w-full md:w-1/3  rounded m-2 ">
          <InstrumentTile 
            isLoading={isLoading}
            eventCalls={eventCalls} 
            refreshProps={() => refreshProps()} 
            eventId={eventId} 
            instrumentSection={i} 
            instrumentalists={users.filter(j => j.instrument === i.instrumentName)}
            />
          </div>
          )) }
      </div>
    </div>
  )
}