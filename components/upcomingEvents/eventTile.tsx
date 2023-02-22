import Link from "next/link"
import React, { useState } from "react"
import { HiLocationMarker } from "react-icons/hi"
import { AiOutlineCalendar } from "react-icons/ai"
import EventTileMenu from "./eventTileMenu"

interface EventTileProps {
  call: {
    id: number
    createdAt: string
    updatedAt: string
    startTime: string
    endTime: string
    venue: string
    eventId: number
    fixerEmail: string
    event: {
      id: number
      createdAt: string
      updatedAt: string
      ensembleName: string
      concertProgram: string
      confirmedOrOnHold: string
      dressCode: string
      fee: string
      additionalInfo: string
      fixerEmail: string
    }
  }
  sessionEmail: string
}

export default function EventTile(props: EventTileProps) {
  const { call, sessionEmail,  } = props
  const [showMenu, setShowMenu] = useState<boolean>(false)
  
  

  

  return (
    <div className={"w-full border-b p-2 flex flex-col my-2 "} data-testid="event-tile-div">
{/*       {sessionEmail === call.fixerEmail && <p className="text-center p-1 font-bold text-sm">You are the fixer of this event:</p>}
 */}      <div className="flex flex-row justify-between">
      <h2 className="font-bold text-lg">{call.event.ensembleName}</h2>
      <button className="text-xs mr-1 hover:bg-slate-100  rounded-full p-1 text-slate-800" onClick={() => setShowMenu(!showMenu)} data-testid="event-menu-icon" >•••</button>
      </div>
      {showMenu 
      && <EventTileMenu eventId={call.event.id} setShowMenu={() => setShowMenu(!showMenu)}/>}
      <p className="">{String(call.event.concertProgram).slice(0, 25)}</p>
      <div className="flex flex-col md:flex-row text-slate-800 md:py-2 md:mb-1">
        <div className="flex flex-row items-center md:pr-2 md:border-r border-slate-400 ">
          <AiOutlineCalendar />
          <p data-testid="call-start-time" className="ml-2">{call.startTime}</p>
        </div>
          <div className="flex flex-row items-center md:pl-2 ">
            <HiLocationMarker />
            <p className="ml-2">{call.venue}</p> 
        </div>
      </div>
    </div>
  )
}


/*        
<button className="secondary-btn">Fixer Details</button>
        <Link href={`/event/${call.event.id}`}>
          <div className="primary-btn">View Event</div>
        </Link>
<Link href={`https://google.co.uk/maps/search/${call.venue}`} target="_blank" className="text-blue-600 hover:text-blue-700 hover:underline">(Google Maps)</Link>
 */