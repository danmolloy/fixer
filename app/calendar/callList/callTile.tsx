import { CallWithEventWithEnsemble } from "../views/dayView"
import { DateTime } from "luxon"
import { AiOutlineCalendar } from "react-icons/ai"
import { HiLocationMarker } from "react-icons/hi"
import Link from "next/link"

export type CallTileProps = {
  eventCall: CallWithEventWithEnsemble
}

export default function CallTile(props: CallTileProps) {
  const { eventCall } = props

  return (
    <Link href={`/event/${eventCall.event.id}`} data-testid={`${eventCall.id}-call-tile`} className="w-full hover:bg-slate-50 lg:w-[50vw]  p-2 flex flex-col m-2 rounded border-b">
      <div className="flex flex-row justify-between">
      <h3>{eventCall.event.ensembleName}</h3>
      
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