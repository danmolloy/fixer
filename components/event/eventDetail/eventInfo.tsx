import React, { useState } from 'react'
import CallTile from "./callTile";
import InfoDiv from "./infoDiv";
import { EventWithCalls } from "./menu/calendarEventLink";
import { DateTime } from "luxon";
import FixerMenu from './menu/fixerMenu';
import PlayerMenu from './menu/playerMenu';


export type EventInfoProps = {
  event: EventWithCalls
}


export default function EventInfo(props: EventInfoProps) {
  const { event } = props

  
  return (
    <div data-testid="event-info-div" className={/* showOptions === true ? "blur w-full border shadow rounded-lg py-4":   */"w-full border shadow rounded-lg py-4"}>
      <InfoDiv className="bg-slate-50" id="event-status" title='Status' value={event.confirmedOrOnHold.toLocaleUpperCase()} />
      <InfoDiv className="bg-slate-50" id="ensemble-name" title="Ensemble" value={event.ensembleName}/>
      <div className="flex flex-col lg:flex-row p-4 w-full  lg:items-center lg:justify-evenly" data-testid="event-calls-list">
        <p data-testid="event-calls-count" className="text-slate-600 text-sm lg:w-1/2 ">{props.event.calls.length} Call(s):</p>
        <div className="flex flex-col lg:w-1/2 ">
        {props.event.calls.sort((a, b) => Number(DateTime.fromJSDate(new Date(a.startTime))) - Number(DateTime.fromJSDate(new Date(b.startTime)))).map(i => (
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
      <InfoDiv className="text-slate-600 text-sm" id="created-datetime" title="Event created" value={String(DateTime.fromJSDate(new Date(event.createdAt)).toFormat("HH:mm DD"))} />
      <InfoDiv className="text-slate-600 text-sm bg-slate-50" id="updated-datetime" title="Last updated" value={String(DateTime.fromJSDate(new Date(event.updatedAt)).toFormat("HH:mm DD"))} />
    </div>
  )
}