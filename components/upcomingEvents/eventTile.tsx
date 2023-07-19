import Link from "next/link"
import React, { useState } from "react"
import { HiLocationMarker } from "react-icons/hi"
import { AiOutlineCalendar } from "react-icons/ai"
import EventTileMenu from "./eventTileMenu"
import moment from "moment"
import { CallWithEvent } from "./upcomingEvents"


export type EventTileProps = {
  call: CallWithEvent
  sessionEmail: string,
  preview?: boolean
}

export default function EventTile(props: EventTileProps) {
  const { call, sessionEmail, preview, } = props
  const [showMenu, setShowMenu] = useState<boolean>(false)

  return (
    <div className="flex flex-col items-center w-full">
      {showMenu 
      && <EventTileMenu eventTitle={call.event.eventTitle} eventId={call.event.id} setShowMenu={() => setShowMenu(!showMenu)}/>}
      <div className="w-full flex flex-row justify-end -mb-10">
        <button className="z-10 self-end text-xs mr-1 hover:bg-slate-100  rounded-full p-2 text-slate-800" onClick={() => {!preview && setShowMenu(!showMenu)}} data-testid="event-menu-icon" >•••</button>
      </div>
    <Link href={preview ? "/": `/event/${call.eventId}`} className={"rounded w-full border-b p-2 flex flex-col my-2 hover:bg-slate-100"} data-testid="event-tile-div">
      <div className="flex flex-row justify-between">
      <h2 className=" text-lg">{call.event.eventTitle}</h2>
      </div>
      <p className="">{call.event.ensembleName}</p>
      <div className="flex flex-col md:flex-row text-slate-800 md:py-2 md:mb-1">
        <div className="flex flex-row items-center md:pr-2 md:border-r border-slate-400 ">
          <AiOutlineCalendar />
          <p data-testid="call-start-time" className="ml-2">{String(moment(new Date(call.startTime)).format("h:mma ddd Do MMMM YYYY"))}</p>
        </div>
          <div className="flex flex-row items-center md:pl-2 ">
            <HiLocationMarker />
            <p className="ml-2">{call.venue}</p> 
        </div>
      </div>
    </Link>
    </div>
  )
}
