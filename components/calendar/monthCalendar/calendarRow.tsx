import { Call } from "@prisma/client"
import { DateTime } from "luxon"
import DayBlock, { CallWithEvent } from "./calendarDay"

export type CalendarRowProps = {
  weekNumber: number
  year: number
  eventCalls: CallWithEvent[]
  selectedDate: DateTime
  setSelectedDate: (arg: DateTime) => void
}

export default function CalendarRow(props: CalendarRowProps) {
  const { year, weekNumber, eventCalls, selectedDate, setSelectedDate } = props
  
  const getWeekArr = () => {
    
    let weekArr: DateTime[] = [];
    let weekStart = DateTime.fromObject({weekNumber: weekNumber}).set({year: year}).startOf("week")
    for (let i = 0; i < 7; i++) {
      weekArr = [...weekArr, weekStart.plus({days: i})]
    }

    return weekArr
  }

  return (
    <div data-testid={`calendar-${weekNumber}-row`}>
      {getWeekArr().map(i => (
        <DayBlock 
          calendarDayDate={i} 
          eventCalls={eventCalls} 
          selectedDate={selectedDate} 
          setSelectedDate={(arg) => setSelectedDate(arg)}  
          key={i.day} />
      ))}
    </div>
  )
}