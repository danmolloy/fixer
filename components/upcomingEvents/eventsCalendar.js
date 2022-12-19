import Layout from "../layout/layout";
import { useSession } from "next-auth/react";
import EventTile from "./eventTile"; 
import Calendar from "./calendar";
import { useState } from "react";
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


export default function EventsCalendar() {
const { data: session } = useSession()
const [selectedDate, setSelectedDate] = useState(moment())
const [dateRange, setDateRange] = useState(14)


  if (!session) return <p>Loading..</p>


  return (
    <Layout>
      <h1>Upcoming Events</h1>
      <Calendar selectedDate={selectedDate} setSelectedDate={(e) => setSelectedDate(e)}/>
        <Select value={dateRange} onChange={e => setDateRange(e.target.value)}>
          <MenuItem value={1}>Day</MenuItem>
          <MenuItem value={7}>Week</MenuItem>
          <MenuItem value={14}>Fortnight</MenuItem>
          <MenuItem value={28}>Four Weeks</MenuItem>
        </Select>
        <div id="event-list" className="w-full flex flex-col items-center " data-testid="event-list">
          {selectedDateCalls([...session.userData.calls], selectedDate, dateRange).map(i => (
          <EventTile key={i.id} call={i} fixerEmail={i.event.fixerEmail} sessionEmail={session.user.email}/>
          ))}
        </div>
    </Layout>
  )
}

export { upcomingCalls, selectedDateCalls }
