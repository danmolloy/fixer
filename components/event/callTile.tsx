import { Call } from "@prisma/client"
import moment from "moment"
import React from "react"
import { HiLocationMarker } from "react-icons/hi"


export default function CallTile(props: Call) {
  const {id, startTime, endTime, venue} = props
  return (
    <div data-testid="call-tile-div" className="">
      <p>{String(moment(new Date(startTime)).format("HH:mm D MMMM YYYY"))} <span className="text-sm">to</span></p>
      <p>{String(moment(new Date(endTime)).format("HH:mm D MMMM YYYY"))}</p>
      <div className="text-slate-600 flex flex-row items-center">
        <HiLocationMarker />
        <p className="ml-2">{venue}</p>
      </div>
    </div>
  )
} 