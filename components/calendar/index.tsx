import { Prisma } from "@prisma/client"
import DatePicker from "./datepicker"
import { DateTime } from "luxon"
import { useState } from "react"
import MonthCalendar from "./monthCalendar"
import CallList from "./CallList"
import CalendarHeader from "./header"

export type UserWithEventsAndCalls = Prisma.UserGetPayload<{
  include: {
    calls: {
      include: {
        event: true
      },
    },
    events: {
      include: {
        calls: true
      }
    }
  }
}>

export type CalendarIndexProps  = {
  data: UserWithEventsAndCalls
}

export default function CalendarIndex(props: CalendarIndexProps) {
  const { data } = props;
  const [selectedDate, setSelectedDate] = useState<DateTime>(DateTime.now())
  const [selectedView, setSelectedView] = useState<"Day"|"Week"|"Month"|"Year">("Day")
  return (
    <div data-testid="calendar-index">
      <CalendarHeader 
        selectedView={selectedView}
        setSelectedView={(arg) => setSelectedView(arg)}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}/>
      <DatePicker 
        selectedDate={selectedDate}
        eventCalls={data.calls}
        setSelectedDate={setSelectedDate}/>
{/*       <MonthCalendar 
        selectedDate={selectedDate}
        eventCalls={data.calls}
        setSelectedDate={setSelectedDate}/> */}
      <CallList eventCalls={data.calls} selectedDate={selectedDate} />
    </div>
  )
}