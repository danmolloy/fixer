import { Prisma } from "@prisma/client"
import DatePicker from "./datepicker"
import { DateTime } from "luxon"
import { useState } from "react"
import MonthCalendar from "./monthCalendar"

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

  return (
    <div>
      <DatePicker 
        selectedDate={selectedDate}
        eventCalls={data.calls}
        setSelectedDate={setSelectedDate}/>
      <MonthCalendar 
        selectedDate={selectedDate}
        eventCalls={data.calls}
        setSelectedDate={setSelectedDate}/>
    </div>
  )
}