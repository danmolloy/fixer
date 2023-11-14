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
    <tbody data-testid="event-info-div" className={/* showOptions === true ? "blur w-full border shadow rounded-lg py-4":   */"w-full border shadow rounded-lg py-4"}>
      <InfoDiv className="bg-slate-50" id="event-status" title='Status' value={event.confirmedOrOnHold.toLocaleUpperCase()} />
      <InfoDiv className="bg-slate-50" id="ensemble-name" title="Ensemble" value={event.ensembleName}/>
        {props.event.calls.sort((a, b) => Number(DateTime.fromJSDate(new Date(a.startTime))) - Number(DateTime.fromJSDate(new Date(b.startTime)))).map(i => (
          <CallTile {...i} key={i.id} />
      ))}
     <InfoDiv className="bg-slate-50" id="event-program" title="Program" value={event.concertProgram} />
      <InfoDiv className="" id="event-dress" title="Dress" value={event.dressCode} />
      <InfoDiv className="bg-slate-50" id="event-fee" title="Fee" value={event.fee} />
      <InfoDiv className="" id="event-additional-info" title="Additional Info" value={event.additionalInfo} />
      <InfoDiv className="bg-slate-50" id="event-fixer-name" title="Fixer" value={event.fixerName} />
      <InfoDiv className="text-slate-600 text-sm" id="created-datetime" title="Event created" value={String(DateTime.fromJSDate(new Date(event.createdAt)).toFormat("HH:mm DD"))} />
      <InfoDiv className="text-slate-600 text-sm bg-slate-50" id="updated-datetime" title="Last updated" value={String(DateTime.fromJSDate(new Date(event.updatedAt)).toFormat("HH:mm DD"))} />
    </tbody>
  )
}