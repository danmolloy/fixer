import Layout from "../layout/layout";
import { useSession } from "next-auth/react";
import EventTile from "./eventTile"; 
import Calendar from "./calendar";
import React, { useState } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import moment from "moment/moment";
import { MenuItem, Select } from "@mui/material";

const upcomingCalls = (calls, selectedDate) => {
  return calls.filter(i => new Date(i.endTime) > new Date(selectedDate)).sort((a, b) => new Date(a.startTime) - new Date(b.startTime))
}

const selectedDateCalls = (calls, selectedDate, range) => {
    return calls.filter(i => (
      moment(selectedDate) < moment(new Date(i.startTime))
      && moment(selectedDate).add(range, "days") > moment(new Date(i.startTime))
      || moment(selectedDate).calendar() === moment(new Date(i.endTime)).calendar()
      ))
}

const daysArr = (calls, selectedDate, dateRange) => {
  let arr = [];
  for (let day = moment(selectedDate); day < moment(selectedDate).add(dateRange, 'days'); day.add(1, 'days')) {
    arr = [...arr, {
      day: day.calendar(),
      events: selectedDateCalls(calls, day, day)
    }]
  }
  return arr
}

const calendarObj = (callsArr, selectedDate, dateRange) => {
  let objArr = daysArr(callsArr, selectedDate, dateRange)
  return objArr
}

export default function EventsCalendar() {
  const { data: session } = useSession()
  const [selectedDate, setSelectedDate] = useState(moment())
  const [dateRange, setDateRange] = useState(14)


  if (!session) return <p>Loading..</p>


  return (
    <Layout>
      <div data-testid="events-calendar-div" className="w-screen p-2 flex flex-col items-center">
        <h1>Upcoming Events</h1>
        <div className="flex flex-col items-center p-2">
          <Calendar selectedDate={selectedDate} setSelectedDate={(e) => setSelectedDate(e)}/>
          <Select value={dateRange} onChange={e => setDateRange(e.target.value)}>
            <MenuItem value={1}>Day</MenuItem>
            <MenuItem value={7}>Week</MenuItem>
            <MenuItem value={14}>Fortnight</MenuItem>
            <MenuItem value={28}>Four Weeks</MenuItem>
          </Select>
          </div>
          <div id="event-list" className="w-full flex flex-col items-center " data-testid="event-list">
              {calendarObj([...session.userData.calls], selectedDate, dateRange).map(i => (
                <div className="my-2 w-full border border-slate-400 shadow p-4" key={i.day}>
                  <h2 className="text-md">{i.day}</h2>
                  {i.events.length > 0  
                  ? i.events.sort((a, b) => moment(new Date(a.startTime)) - moment(new Date(b.startTime))).map(i => (
                  <EventTile key={i.id} call={i} fixerEmail={i.event.fixerEmail} sessionEmail={session.user.email}/>
                  ))
                  : <p className="px-4 text-slate-400">No events on this day.</p>
                }
                </div>
              ))}
          </div>
        </div>
    </Layout>
  )
}

export { upcomingCalls, selectedDateCalls }
