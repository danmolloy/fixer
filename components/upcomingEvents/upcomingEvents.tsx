import React from "react";
import EventTile from "./eventTile"
import moment from "moment";

interface UpcomingEventsProps {
  selectedDate: any
  sessionEmail: string
  upcomingCalls?: {
    id: number
    createdAt: string
    updatedAt: string
    startTime: string
    endTime: string
    venue: string
    eventId: number
    fixerEmail: string
    event: {
      id: number
      createdAt: string
      updatedAt: string
      eventTitle: string
      ensembleName: string
      concertProgram: string
      confirmedOrOnHold: string
      dressCode: string
      fee: string
      additionalInfo: string
      fixerEmail: string
    }
  }[]
}

export default function UpcomingEvents(props: UpcomingEventsProps) {
  const { upcomingCalls, sessionEmail, selectedDate } = props
  return (
    <div data-testid="upcoming-events-div" className="w-full flex flex-col items-center pt-4">
      <div className="w-full  flex flex-col items-center" data-testid="event-list">
        {upcomingCalls === undefined || upcomingCalls.filter((i) => moment(new Date(i.startTime)).startOf("day") >= moment(new Date(selectedDate)).startOf("day")).length < 1  
        ? <p className="p-2 text-lg">No upcoming events.</p>
        : upcomingCalls.filter((i) => moment(new Date(i.startTime)).startOf("day") >= moment(new Date(selectedDate)).startOf("day")).sort((a, b) => Number(new Date(a.startTime)) - Number(new Date(b.startTime))).map(i => (
          <div key={i.id} className="w-full flex flex-col items-center">
            <EventTile call={i} sessionEmail={sessionEmail}/>
          </div>
        ))}
      </div>
    </div>
  )
}