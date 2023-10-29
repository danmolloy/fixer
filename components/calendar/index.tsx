import { Prisma } from "@prisma/client"
import { DateTime } from "luxon"
import { useState } from "react"
import CalendarHeader from "./header"
import DayView from "./views/dayView"
import MonthView from "./views/monthView"
import YearView from "./views/yearView"

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
  const [selectedView, setSelectedView] = useState<"Day"|"Month"|"Year">("Day")

  if (!data) {
    return <p>Loading..</p>
  }

  return (
    <div data-testid="calendar-index" className="flex flex-col items-center w-screen">
      <CalendarHeader 
        selectedView={selectedView}
        setSelectedView={(arg) => setSelectedView(arg)}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}/>
        {selectedView === "Year" 
        ? <YearView
          setSelectedView={(arg) => setSelectedView(arg)}
          selectedDate={selectedDate}
          eventCalls={data.calls}
          setSelectedDate={setSelectedDate}/> 
        : selectedView === "Day" 
        ? <DayView 
            selectedDate={selectedDate}
            eventCalls={data.calls}
            setSelectedDate={setSelectedDate}/>
        : <MonthView 
            selectedDate={selectedDate}
            eventCalls={data.calls}
            setSelectedDate={setSelectedDate}/>}
    </div>
  )
}