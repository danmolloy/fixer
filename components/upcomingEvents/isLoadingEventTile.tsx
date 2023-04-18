import React, { useState } from "react"
import PulsingDiv from "../layout/pulsingDiv"

export default function IsLoadingEventTile() {

  return (
    <div className={"w-full border-b p-2 flex flex-col my-2 "} data-testid="event-tile-div">
      <div className="flex flex-row justify-between">
      <PulsingDiv classNames="h-7 w-40" />
      <PulsingDiv classNames="mr-1 w-7 h-7 rounded-full"/>
      
      </div>
      <PulsingDiv classNames="h-6 w-48 mt-1" />
      <div className="flex flex-col md:flex-row text-slate-800 md:py-2 md:mb-1">
        <div className="flex flex-row items-center md:pr-2  border-slate-400 ">
        <PulsingDiv classNames="h-6 w-60 mt-1" />
        </div>
          <div className="flex flex-row items-center md:pl-2 ">
          <PulsingDiv classNames="sm:ml-2 h-6 w-36 mt-1" />
        </div>
      </div>
    </div>
  )
}
