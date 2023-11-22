import { useState } from "react"
import { CallWithEvent } from "../monthCalendar/calendarDay"
import { BsThreeDotsVertical } from "react-icons/bs"
import { DateTime } from "luxon"
import { AiOutlineCalendar } from "react-icons/ai"
import { HiLocationMarker } from "react-icons/hi"
import Link from "next/link"

export type CallTileProps = {
  eventCall: CallWithEvent
}

export default function CallTile(props: CallTileProps) {
  const { eventCall } = props
  const [showMenu, setShowMenu] = useState<boolean>(false)

  return (
    <Link href={`/event/${eventCall.event.id}`} data-testid={`${eventCall.id}-call-tile`} className="w-full hover:bg-slate-50 lg:w-[50vw]  p-2 flex flex-col m-2 rounded border-b">
      <div className="flex flex-row justify-between">
      <h3>{eventCall.event.ensembleName}</h3>
      <button className="border border-indigo-600 text-indigo-600 hover:bg-indigo-50 shadow-sm p-1 rounded m-1" data-testid="menu-icon" onClick={() => setShowMenu(!showMenu)}>
        View Event
      </button>
      </div>
      <p >{eventCall.event.eventTitle}</p>
      <div className="flex flex-row items-center text-gray-700">
        <AiOutlineCalendar />
        <p className="ml-1">{DateTime.fromJSDate(new Date(eventCall.startTime)).toFormat("hh:mm a")}</p>
      </div>
      <div className="flex flex-row items-center  text-gray-700">
        <HiLocationMarker />
        <p className="ml-1">{eventCall.venue}</p>
      </div>
    </Link>
  )
}