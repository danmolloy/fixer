import Calendar from "./calendar";
import React, { useState } from "react";
import moment from "moment/moment";
import UpcomingEvents from "./upcomingEvents";
import EventDashboard from "./dashboard";
import DateRangeView from "./dateRangeView";
import MobileDashboard from "./mobileDashboard";
import useSWR from "swr";
import { User } from "next-auth";
import { Event, Prisma } from "@prisma/client";
import PastEvents from "./pastEvents";

export type EventWithCalls = Prisma.EventGetPayload<{
  include: { 
    calls: true
 }
}>

export type CallWithEvent = Prisma.CallGetPayload<{
  include: {
    event: true
  }
}>

export type EventsIndexProps = {
  session: {
    user: User
    expires: string
    userData?: {
      id: string
      name: string
      email: string
      emailVerified: Date
      image: string
      instrument: string
      profileInfo: null|string
      isFixer?: null|boolean
      events: EventWithCalls[]
      calls: CallWithEvent[]
    }
  }
}

const fetcher = (url: string):Promise<any> => fetch(url).then((res) => res.json())

export default function EventsIndex(/* props: EventsIndexProps */) {
  //const { session } = props
  const [selectedDate, setSelectedDate] = useState(moment())
  const [dateRange, setDateRange] = useState<undefined|number|string>(undefined)
  const { data, error, /* isLoading */ } = useSWR('/api/calendar/getCalendar', fetcher)
 
  if (error) return <div>failed to load</div>


 if (!data) {
    return <p>Loading..</p>
  }

  return (
      <div data-testid="events-index-div" className="w-screen p-2 flex flex-col md:flex-row-reverse items-center md:items-start min-h-screen sm:min-h-0">
         <Calendar selectedDate={selectedDate} 
          setSelectedDate={(e) => {
            setSelectedDate(e)
            dateRange === undefined && setDateRange(7)
            }}/>
          <div className=" w-full md:w-1/2">
          <MobileDashboard dateRange={dateRange} setSelectedDate={(arg) => setSelectedDate(arg)} setDateRange={(arg) => setDateRange(arg)}/>
         <EventDashboard dateRange={dateRange} setSelectedDate={(arg) => setSelectedDate(arg)} setDateRange={(arg) => setDateRange(arg)} /* setEventView={(arg) => setEventView(arg)} *//>
         <div className=" min-h-1/2">
          {dateRange === undefined 
         ? <UpcomingEvents selectedDate={selectedDate} upcomingCalls={data && [...data.calls].sort((a, b) => Number(new Date(a.startTime)) - Number(new Date(b.startTime)))} sessionEmail={data?.email}/>
         : dateRange === "past" 
         ? <PastEvents selectedDate={selectedDate} pastEvents={data.events} allCalls={data && [...data.calls].sort((a, b) => Number(new Date(a.startTime)) - Number(new Date(b.startTime)))} sessionEmail={data?.email}/>
         : <DateRangeView selectedDate={selectedDate} dateRange={Number(dateRange)} upcomingCalls={data && [...data.calls].sort((a, b) => Number(new Date(a.startTime)) - Number(new Date(b.startTime)))} sessionEmail={data?.email}/>
         }
         </div>
        </div>
      </div>
  )
}