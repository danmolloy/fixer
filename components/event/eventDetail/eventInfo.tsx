import React from 'react'
import CallTile from "./callTile";
import InfoDiv from "./infoDiv";
import { EventWithCalls } from "./menu/calendarEventLink";
import { DateTime } from "luxon";
import { Call, Ensemble, Event } from '@prisma/client';


export type EventInfoProps = {
  event: Event
  calls: Call[]
  userId: string
  ensemble: Ensemble
}


export default function EventInfo(props: EventInfoProps) {
  const { ensemble, event, userId, calls } = props

  
  return (
    <tbody data-testid="event-info-div" className={" w-full  rounded-lg flex flex-col"}>
      <InfoDiv className="" id="event-status" title='Status' value={event.confirmedOrOnHold.toLocaleUpperCase()} />
      <InfoDiv className="bg-slate-50" id="ensemble-name" title="Ensemble" value={ensemble.name}/>
      <tr className="flex flex-col  md:flex-row p-4 w-full lg:items-center lg:justify-evenly ">
        <td className="text-slate-600 text-sm md:w-1/2">
          {calls.length} Call(s)
        </td>
        <td className="md:w-1/2">
        {userId === event.fixerId 
        ? calls.sort((a, b) => Number(DateTime.fromJSDate(new Date(a.startTime))) - Number(DateTime.fromJSDate(new Date(b.startTime)))).map(i => (
          <CallTile {...i} key={i.id} />
      )) 
      : calls.sort((a, b) => Number(DateTime.fromJSDate(new Date(a.startTime))) - Number(DateTime.fromJSDate(new Date(b.startTime)))).map(i => (
        <CallTile {...i} key={i.id} />
    ))}
        </td>
      </tr>
        
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