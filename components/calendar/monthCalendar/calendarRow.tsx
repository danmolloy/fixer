import { Call } from "@prisma/client"
import { DateTime } from "luxon"
import DayBlock, { CallWithEventWithEnsemble } from "./calendarDay"

export type CalendarRowProps = {
  eventCalls: CallWithEventWithEnsemble[]
  selectedDate: DateTime
  setSelectedDate: (arg: DateTime) => void
  startOfWeekDate: DateTime
}

export default function CalendarRow(props: CalendarRowProps) {
  const { startOfWeekDate, eventCalls, selectedDate, setSelectedDate } = props
  
  const getWeekArr = () => {
    
    let weekArr: DateTime[] = [];
    let weekStart = startOfWeekDate
    for (let i = 0; i < 7; i++) {
      weekArr = [...weekArr, weekStart.plus({days: i})]
    }

    return weekArr
  }

  return (
    <tr data-testid={`calendar-${startOfWeekDate.weekNumber}-row`}>
      {getWeekArr().map(i => (
        <DayBlock 
          calendarDayDate={i} 
          eventCalls={eventCalls.filter(j => DateTime.fromJSDate(new Date(j.startTime)).hasSame(i, "day"))} 
          selectedDate={selectedDate} 
          setSelectedDate={(arg) => setSelectedDate(arg)}  
          key={i.toFormat("dd LLL yyyy")} />
      ))}
    </tr>
  )
}