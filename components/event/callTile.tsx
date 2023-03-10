import moment from "moment"
import React from "react"
import { HiLocationMarker } from "react-icons/hi"

interface CallTileProps {
  id: string
  startTime: string
  endTime: string
  venue: string
}

export default function CallTile(props: CallTileProps) {
  const {id, startTime, endTime, venue} = props
  return (
    <div data-testid="call-tile-div" className="">
      <p>{String(moment.utc(new Date(startTime)).format("HMm Do MMMM YYYY"))} <span className="text-sm">to</span></p>
      <p>{String(moment.utc(new Date(endTime)).format("HMm Do MMMM YYYY"))}</p>
      <div className="text-slate-600 flex flex-row items-center">
        <HiLocationMarker />
        <p className="ml-2">{venue}</p>
      </div>
    </div>
  )
} 