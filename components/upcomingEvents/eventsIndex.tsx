import Calendar from "./calendar";
import React, { useState } from "react";
import moment from "moment/moment";
import UpcomingEvents from "./upcomingEvents";
import EventDashboard from "./dashboard";
import DateRangeView from "./dateRangeView";
import MobileDashboard from "./mobileDashboard";
import useSWR from "swr";


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
  }
}

const fetcher = (url: string):Promise<any> => fetch(url).then((res) => res.json())

export default function EventsIndex(/* props: EventsIndexProps */) {
  //const { session } = props
  const [selectedDate, setSelectedDate] = useState(moment())
  const [dateRange, setDateRange] = useState<null|number>(null)
  const { data, error, /* isLoading */ } = useSWR('/api/calendar/getCalendar', fetcher)
 
  if (error) return <div>failed to load</div>


 /*  if (!session.userData) {
    return <p>Loading..</p>
  } */

  return (
      <div data-testid="events-index-div" className="w-screen p-2 flex flex-col md:flex-row-reverse items-center md:items-start min-h-screen sm:min-h-0">
         <Calendar selectedDate={selectedDate} 
          setSelectedDate={(e) => {
            setSelectedDate(e)
            dateRange === null && setDateRange(7)
            }}/>
          <div className=" w-full md:w-1/2">
          <MobileDashboard dateRange={dateRange} setSelectedDate={(arg) => setSelectedDate(arg)} setDateRange={(arg) => setDateRange(arg)}/>
         <EventDashboard dateRange={dateRange} setSelectedDate={(arg) => setSelectedDate(arg)} setDateRange={(arg) => setDateRange(arg)} /* setEventView={(arg) => setEventView(arg)} *//>
         <div className=" min-h-1/2">
          {dateRange === null 
         ? <UpcomingEvents selectedDate={selectedDate} upcomingCalls={data && [...data.calls].sort((a, b) => Number(new Date(a.startTime)) - Number(new Date(b.startTime)))} sessionEmail={data?.email}/>
           : <DateRangeView selectedDate={selectedDate} dateRange={dateRange} upcomingCalls={data && [...data.calls].sort((a, b) => Number(new Date(a.startTime)) - Number(new Date(b.startTime)))} sessionEmail={data?.email}/>
         }
         </div>
        </div>
      </div>
  )
}




//<Calendar selectedDate={selectedDate} 
//          setSelectedDate={(e) => {
//            setSelectedDate(e)
//            dateRange === null && setDateRange(7)
//            }}/>
//          <div className=" w-full md:w-1/2">
//          <MobileDashboard dateRange={dateRange} setSelectedDate={(arg) => setSelectedDate(arg)} setDateRange={(arg) => setDateRange(arg)}/>
//         <EventDashboard dateRange={dateRange} setSelectedDate={(arg) => setSelectedDate(arg)} setDateRange={(arg) => setDateRange(arg)} /* setEventView={(arg) => setEventView(arg)} *//>
//          {dateRange === null 
//         ? <UpcomingEvents selectedDate={selectedDate} upcomingCalls={session.userData.calls && [...session.userData?.calls].sort((a, b) => Number(new Date(a.startTime)) - Number(new Date(b.startTime)))} sessionEmail={session.user.email}/>
//           : <DateRangeView selectedDate={selectedDate} dateRange={dateRange} upcomingCalls={[...session.userData?.calls].sort((a, b) => Number(new Date(a.startTime)) - Number(new Date(b.startTime)))} sessionEmail={session.user.email}/>
//          } 
//        </div>