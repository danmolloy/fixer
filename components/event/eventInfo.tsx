import moment from "moment";
import React from 'react'
import CallTile from "./callTile";
import InfoDiv from "./infoDiv";
import { Call } from "@prisma/client";
import { EventWithCalls } from "./calendarEventLink";


export type EventInfoProps = {
  event: EventWithCalls
  session: any
  setShowOptions: () => void
  showOptions: boolean
  preview?: boolean
}


export default function EventInfo(props: EventInfoProps) {
  const { setShowOptions, event, showOptions, session, preview } = props
  
  return (
    <div data-testid="event-info-div" className={showOptions === true ? "blur w-full border shadow rounded-lg py-4":  "w-full border shadow rounded-lg py-4"}>
      <div className="w-full flex flex-col">
        <button data-testid="options-btn" className="self-end border p-1 mr-2 rounded-md shadow-sm border-amber-600 text-amber-600 bg-white hover:bg-amber-50" onClick={() => {!preview && setShowOptions()}}>Options</button>
      </div>
      <div className="">
      <p className="flex flex-row items-center justify-center text-center p-3">This event is {event.confirmedOrOnHold.toLowerCase()}</p>
      </div>
      <InfoDiv className="bg-slate-50" id="ensemble-name" title="Ensemble" value={event.ensembleName}/>
      <div className="flex flex-col lg:flex-row p-4 w-full  lg:items-center lg:justify-evenly" data-testid="event-calls-list">
        <p data-testid="event-calls-count" className="text-slate-600 text-sm lg:w-1/2 ">{props.event.calls.length} Call(s):</p>
        <div className="flex flex-col lg:w-1/2 ">
        {props.event.calls.sort((a, b) => Number(moment(new Date(a.startTime))) - Number(moment(new Date(b.startTime)))).map(i => (
        <div key={i.id} className="my-2">
          <CallTile {...i} />
        </div>
      ))}
        </div>
        
      </div>
      <InfoDiv className="bg-slate-50" id="event-program" title="Program" value={event.concertProgram} />
      <InfoDiv className="" id="event-dress" title="Dress" value={event.dressCode} />
      <InfoDiv className="bg-slate-50" id="event-fee" title="Fee" value={event.fee} />
      <InfoDiv className="" id="event-additional-info" title="Additional Info" value={event.additionalInfo} />
      <InfoDiv className="bg-slate-50" id="event-fixer-name" title="Fixer" value={event.fixerName} />
      <InfoDiv className="text-slate-600 text-sm" id="created-datetime" title="Event created" value={String(moment(new Date(event.createdAt)).format("HH:mm:ss D MMMM YYYY"))} />
      <InfoDiv className="text-slate-600 text-sm bg-slate-50" id="updated-datetime" title="Last updated" value={String(moment(new Date(event.updatedAt)).format("HH:mm:ss D MMMM YYYY"))} />
    </div>
  )
}