import Layout from "../layout/layout";
import { useSession } from "next-auth/react";
import EventTile from "./eventTile"; 
import Calendar from "./calendar";
import React, { useState } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import moment from "moment/moment";
import { MenuItem, Select } from "@mui/material";
import UpcomingEvents from "./upcomingEvents";
import EventDashboard from "./dashboard";
import DateRangeView from "./dateRangeView";
import { Session } from "next-auth";

interface EventsIndexProps {
  session: Session
}

export default function EventsIndex(props: EventsIndexProps) {
  /* const { data: session } = useSession() */
  const { session } = props
  const [selectedDate, setSelectedDate] = useState(moment(new Date()))
  const [dateRange, setDateRange] = useState<null|number>(null)
  const [eventView, setEventView] = useState("viewAll") //"viewAll"|"week"|"fortnight"|"month"

  /* if (!session) return <p>Loading..</p> */


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
          ? <UpcomingEvents selectedDate={selectedDate} upcomingCalls={[...session.userData.calls].sort((a, b) => Number(new Date(a.startTime)) - Number(new Date(b.startTime)))} sessionEmail={session.user.email}/>
            : <DateRangeView selectedDate={selectedDate} dateRange={dateRange} upcomingCalls={[...session.userData.calls].sort((a, b) => Number(new Date(a.startTime)) - Number(new Date(b.startTime)))} sessionEmail={session.user.email}/>
          } 
        </div>
      </div>
  )
}



