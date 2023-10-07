import Link from "next/link"
import React, { useState } from "react"
import { HiLocationMarker } from "react-icons/hi"
import { AiOutlineCalendar } from "react-icons/ai"
import EventTileMenu from "./eventTileMenu"
import moment from "moment"
import { CallWithEvent } from "./upcomingEvents"
import { EventWithCalls } from "./eventsIndex"


export type PastEventTileProps = {
  event: EventWithCalls
  sessionEmail: string,
}

export default function PastEventTile(props: PastEventTileProps) {
  const { event, sessionEmail } = props
  const [showMenu, setShowMenu] = useState<boolean>(false)

  return (
    <div className="flex flex-col items-center w-full ">
      
    <Link href={`/event/${event.id}`} className={"rounded w-full border-b p-2 flex flex-col my-2 hover:bg-slate-100"} data-testid="event-tile-div">
    <p className="self-center text-sm text-orange-500">This event has already happened.</p>
      <div className="flex flex-row justify-between">
      <h2 className=" text-lg">{event.eventTitle}</h2>
      </div>
      <p className="">{event.ensembleName}</p>
      <div className="flex flex-col text-slate-800 py-2 ">
        <div className="flex flex-row items-center  border-slate-400 ">
          <AiOutlineCalendar />
          <p data-testid="call-start-time" className="ml-2 ">{`${String(moment(new Date(event.calls[0].startTime)).format("Do MMMM YYYY"))} - ${String(moment(new Date(event.calls[event.calls.length-1].endTime)).format("Do MMMM YYYY"))}`}</p>
        </div>
          <div className="flex flex-row items-center ">
            <HiLocationMarker />
            <div className="ml-2">{event.calls.map(i => (
              <p key={i.id}>{i.venue}</p>
            ))}</div> 
        </div>
      </div>
    </Link>
    </div>
  )
}
