import React from "react"
import EventInfo from "./eventInfo"
import EventOptions from "./eventOptions"

interface EventIndexProps {
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

export default function EventIndex(props: EventIndexProps) {
  return (
    <div data-testid="event-index-div" className="w-full lg:w-2/3">
      <EventInfo {...props} />
      <EventOptions fixerEmail={props.fixerEmail} sessionEmail={props.session.user.email}/>
    </div>
  )
}