import moment from "moment";
import React from 'react'
import CallTile from "./callTile";
import InfoDiv from "./infoDiv";

interface EventInfoProps {
  confirmed: string
  ensembleName: string
  concertProgram: string
  dressCode: string
  fee: string
  additionalInfo: string
  fixerEmail: string
  createdAt: string
  updatedAt: string
  id: string
  session: any
  calls: {
    id: string
    startTime: string
    endTime: string
    venue: string
  }[]
}

export default function EventInfo(props: EventInfoProps) {
  const { calls, id, confirmed, ensembleName, concertProgram, dressCode, fee, additionalInfo, fixerEmail, createdAt, updatedAt, session } = props

/*   const formatDate = (e) => {
    return new Date(e).toString().slice(0, 21)
  } */
  
  return (
    <div data-testid="event-info-div" className="w-full border shadow rounded-lg py-4">
      <p className="flex flex-row items-center justify-center text-center p-3">This event is {String(confirmed).toLowerCase()}</p>
      <InfoDiv className="bg-slate-50" id="ensemble-name" title="Ensemble" value={ensembleName}/>
      <div className="flex flex-col lg:flex-row p-4 w-full  lg:items-center lg:justify-evenly" data-testid="event-calls-list">
        <p data-testid="event-calls-count" className="text-slate-600 text-sm lg:w-1/2 ">{props.calls.length} Call(s):</p>
        <div className="flex flex-col lg:w-1/2 ">
        {props.calls.sort((a, b) => Number(moment(new Date(a.startTime))) - Number(moment(new Date(b.startTime)))).map(i => (
        <div key={i.id} className="my-2">
          <CallTile {...i} />
        </div>
      ))}
        </div>
        
      </div>
      <InfoDiv className="bg-slate-50" id="event-program" title="Program" value={concertProgram} />
      <InfoDiv className="" id="event-dress" title="Dress" value={dressCode} />
      <InfoDiv className="bg-slate-50" id="event-fee" title="Fee" value={fee} />
      <InfoDiv className="" id="event-additional-info" title="Additional Info" value={additionalInfo} />
      <InfoDiv className="bg-slate-50" id="event-fixer-email" title="Fixer" value={fixerEmail} />
      
      <InfoDiv className="" id="created-datetime" title="Event created" value={String(moment(new Date(createdAt)).format("h:mm:ssa Do MMMM YYYY"))} />
      <InfoDiv className="bg-slate-50" id="updated-datetime" title="Last updated" value={String(moment(new Date(updatedAt)).format("h:mm:ssa Do MMMM YYYY"))} />

      
    </div>
  )
}