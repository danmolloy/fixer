import React from "react";
import EventTile from "./eventTile"
import moment from "moment";
import IsLoadingEventTile from "./isLoadingEventTile";
import { Call, Event, Prisma } from "@prisma/client";
import { EventWithCalls } from "./eventsIndex";
import PastEventTile from "./pastEventTile";

export type CallWithEvent = Prisma.CallGetPayload<{
  include: { event: true }
}>

export type PastEventsProps = {
  selectedDate: any
  sessionEmail?: string
  allCalls: CallWithEvent[]
  pastEvents: EventWithCalls[]
}

export default function PastEvents(props: PastEventsProps) {
  const { sessionEmail, selectedDate, pastEvents, allCalls } = props
  return (
    <div data-testid="upcoming-events-div" className=" w-full flex flex-col items-center pt-4">
      <div className="w-full  flex flex-col items-center" data-testid="event-list">
        {pastEvents === undefined 
        ? <div className="w-full  flex flex-col items-center">
            <IsLoadingEventTile />
            <IsLoadingEventTile />
            <IsLoadingEventTile />
          </div>
        : pastEvents.filter((i) => moment(new Date(i.calls[0].startTime)).startOf("day") <= moment(new Date()).startOf("day")).length < 1  
        ? <p className="p-2 text-lg">No past events.</p>
        : pastEvents.filter((i) => moment(new Date(i.calls[0].startTime)).startOf("day") <= moment(new Date()).startOf("day")).sort((a, b) => Number(new Date(b.calls[0].startTime)) - Number(new Date(a.calls[0].startTime))).map(i => (
          <div key={i.id} className="w-full flex flex-col items-center">
            <PastEventTile sessionEmail={sessionEmail} event={i} />
          </div>
        ))} 
      </div>
    </div>
  )
}