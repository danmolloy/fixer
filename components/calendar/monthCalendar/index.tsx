import { DateTime } from "luxon";
import CalendarRow from "./calendarRow";
import CalendarHeader from "./calendarHeader";
import { CallWithEvent } from "./calendarDay";

export type MonthCalendarProps = {
  selectedDate: DateTime
  setSelectedDate: (arg: DateTime) => void
  eventCalls: CallWithEvent[]
}

export default function MonthCalendar(props: MonthCalendarProps) {
  const { selectedDate, eventCalls, setSelectedDate } = props;

  const getWeekNumArray = () => {
    let monthStart: number = selectedDate.startOf("month").weekNumber
    let monthEnd: number = selectedDate.endOf("month").weekNumber
    let weekNumArr: number[] = []
    let numWeeks: number = monthEnd - monthStart

    for (let i = 0; i < numWeeks; i ++) {
      weekNumArr = [...weekNumArr, monthStart + i]
    }
    return weekNumArr
  }
  
  return (
    <div data-testid="month-calendar">
      <CalendarHeader selectedDate={selectedDate} setSelectedDate={(date) => setSelectedDate(date)}/>
      {getWeekNumArray().map(i => (
        <CalendarRow
          year={selectedDate.year}
          weekNumber={i}
          setSelectedDate={setSelectedDate}
          eventCalls={eventCalls}
          selectedDate={selectedDate}
          key={i} />
      ))}
    </div>
  )
}