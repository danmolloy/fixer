import Calendar from "./calendar";
import React, { useState } from "react";
import moment from "moment/moment";
import UpcomingEvents from "./upcomingEvents";
import EventDashboard from "./dashboard";
import DateRangeView from "./dateRangeView";

interface EventsIndexProps {
  session: {
    user: {
      name: string
      email: string
      image: string
    }
    expires: string
    userData?: {
      id: string
      name: string
      email: string
      emailVerified: null|boolean
      image: string
      instrument: string
      profileInfo: null|string
      isFixer: null|boolean
      events: {
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
        calls: {
          id: number
          createdAt: string
          updatedAt: string
          startTime: string
          endTime: string
          venue: string
          eventId: number
          fixerEmail: string
        }[]
      }[]
      calls: {
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
  }
}

export default function EventsIndex(props: EventsIndexProps) {
  const { session } = props
  const [selectedDate, setSelectedDate] = useState(moment())
  const [dateRange, setDateRange] = useState<null|number>(null)

  if (session.userData === undefined) {
    return <p>Loading..</p>
  }

  return (
      <div data-testid="events-index-div" className="w-screen p-2 flex flex-col md:flex-row-reverse items-center md:items-start ">
         <Calendar selectedDate={selectedDate} 
          setSelectedDate={(e) => {
            setSelectedDate(e)
            dateRange === null && setDateRange(7)
            }}/>
          <div className=" w-full md:w-1/2">
         <EventDashboard dateRange={dateRange} setSelectedDate={(arg) => setSelectedDate(arg)} setDateRange={(arg) => setDateRange(arg)} /* setEventView={(arg) => setEventView(arg)} *//>
          {dateRange === null 
          ? <UpcomingEvents selectedDate={selectedDate} upcomingCalls={[...session.userData?.calls].sort((a, b) => Number(new Date(a.startTime)) - Number(new Date(b.startTime)))} sessionEmail={session.user.email}/>
            : <DateRangeView selectedDate={selectedDate} dateRange={dateRange} upcomingCalls={[...session.userData?.calls].sort((a, b) => Number(new Date(a.startTime)) - Number(new Date(b.startTime)))} sessionEmail={session.user.email}/>
          } 
        </div>
      </div>
  )
}



