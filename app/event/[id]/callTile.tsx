import { Call } from "@prisma/client"
import { DateTime } from "luxon"
import React from "react"
import { HiLocationMarker } from "react-icons/hi"


export default function CallTile(props: Call) {
  const {id, startTime, endTime, venue} = props
  return (
    <div>
    <div  data-testid="call-tile-div" className="my-2">
      <p>{String(DateTime.fromJSDate(new Date(startTime)).toFormat("HH:mm DD"))} <span className="text-sm">to</span></p>
      <p>{String(DateTime.fromJSDate(new Date(endTime)).toFormat("HH:mm DD"))}</p>
      <div className="text-slate-600 flex flex-row items-center">
        <HiLocationMarker />
        <p className="ml-2">{venue}</p>
      </div>
    </div>
    </div>
  )
} 