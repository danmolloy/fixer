import useSwr from 'swr'
import InstrumentTile from './instrumentTile'
import React from 'react'

interface EventCall {
  id: number
  createdAt: string
  updatedAt: string
  startTime: string
  endTime: string
  venue: string
  eventId: number
  fixerEmail: string
}

interface Musician {
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

interface InstrumentSection {
  id: number
  createdAt: string
  updatedAt: string
  eventId: number
  instrumentName: string
  numToBook: number
  callOrder: string
  musicians: Musician[]
}

interface FixingProps {
  eventCalls: EventCall[]
  instrumentSections: InstrumentSection[]
  eventId: any
  refreshProps: () => void
}

const fetcher = (url: string):Promise<any> => fetch(url).then((res) => res.json())
export const instrumentArr = ["Violin", "Viola", "Cello", "Double Bass", "Flute", "Oboe", "Clarinet", "Bassoon", "Horn", "Trumpet", "Trombone", "Tuba", "Harp", "Timpani", "Percussion"]


export default function Fixing(props: FixingProps) {
  const { eventCalls, instrumentSections, eventId, refreshProps } = props
  const { data, error } = useSwr('/api/user/findAll', fetcher)

  if (error) return <p data-testid="error-msg">Error</p>
  if (!data) return <p data-testid="loading-msg">Loading..</p>


  return (
    <div className="w-screen flex flex-col justify-center" data-testid="event-fixing">
      <div className="flex flex-row items-center justify-between border-t border-slate-400 px-8 py-4 mt-4">
        <h1>Personnel</h1>
        <button onClick={() => refreshProps()} className="border border-blue-300 text-blue-600 m-2 rounded p-2 shadow hover:border-blue-600 hover:bg-blue-50 active:bg-blue-300">Refresh</button>
      </div>
      <div className="w-screen flex flex-row flex-wrap items-start justify-center ">
        {instrumentSections.sort((a, b) => a.id - b.id).map(i => (
          <div key={i.id} className="border sm:border-slate-400 flex flex-col w-full md:w-1/3  rounded m-2 ">
          <InstrumentTile 
            eventCalls={eventCalls} 
            refreshProps={refreshProps} 
            eventId={eventId} 
            instrumentSection={i} 
            instrumentalists={data.filter(j => j.instrument === i.instrumentName)}
            />
          </div>
          )) }
      </div>
    </div>
  )
}