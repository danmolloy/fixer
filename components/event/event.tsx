import { Button } from "@mui/material";
import moment from "moment";
import Link from "next/link";
import React from 'react'

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

  const formatDate = (e) => {
    return new Date(e).toString().slice(0, 21)
  }
  
  return (
    <div>
      <h2 className="text-center">{String(confirmed).toUpperCase()}</h2>
      <h1 data-testid="event-header">{ensembleName}</h1>
      <p data-testid="event-program">{concertProgram}</p>
      <p>Dress: <span data-testid="event-dress">{dressCode}</span></p>
      <p>Fee: <span data-testid="event-fee">{fee}</span></p>
      <p>Additional Info: <span data-testid="event-additional-info">{additionalInfo}</span></p>
      <p>Fixer: <span data-testid="event-fixer-email">{fixerEmail}</span></p>
      <div className="my-2 p-4 border rounded" data-testid="event-calls-list">
        <h3><span data-testid="event-calls-count">{props.calls.length}</span> Call(s):</h3>
        {props.calls.sort((a, b) => Number(moment(a.startTime)) - Number(moment(b.startTime))).map(i => (
        <div key={i.id} className="m-2">
          <h3>{formatDate(i.startTime)}</h3>
          <p>to {formatDate(i.endTime)}</p>
          <p>{i.venue}</p>
        </div>
      ))}
      </div>
      <p className="font-thin" data-testid="created-datetime">{`Event created on ${formatDate(createdAt)}`}</p>
      <p className="font-thin" data-testid="updated-datetime">{`Last updated on ${formatDate(updatedAt)}`}</p>
      {session && session.user.email === props.fixerEmail &&
      <div className="flex flex-col justify-center items-center" data-testid="fixer-btns-div">
        {/* <CSVLink className="call-tile-btn border w-28 m-2 border-blue-500 text-blue-500 hover:bg-blue-50 active:bg-white" data={parse(exportObj)}>Export Calls</CSVLink> */}
        <Button variant="outlined">Request Parts</Button>
        
        <Link href={`/event/edit/${id}`}>
          <Button /* variant="" className="" */ >Edit Event</Button>
        </Link>
      </div>}
    </div>
  )
}