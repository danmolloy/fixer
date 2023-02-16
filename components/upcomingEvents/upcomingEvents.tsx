import React from "react";
import EventTile from "./eventTile"
import moment from "moment";

interface UpcomingEventsProps {
  selectedDate: any
  sessionEmail: string
  upcomingCalls: {
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
    <div data-testid="upcoming-events-div" className="w-full flex flex-col items-center">
      <h2>Upcoming Events</h2>
      <div className="w-full  flex flex-col items-center" data-testid="event-list">
        {upcomingCalls.filter((i) => moment(new Date(i.startTime)) >= moment(new Date(selectedDate))).sort((a, b) => Number(new Date(a.startTime)) - Number(new Date(b.startTime))).map(i => (
          <div key={i.id} className="w-full flex flex-col items-center">
            <EventTile call={i} sessionEmail={sessionEmail}/>
          </div>
        ))}
      </div>
    </div>
  )
}