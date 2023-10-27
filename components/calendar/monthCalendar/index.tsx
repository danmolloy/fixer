import { DateTime } from "luxon";
import CalendarRow from "./calendarRow";
import CalendarHeader from "./calendarHeader";
import { CallWithEvent } from "./calendarDay";
import DaysRow from "./daysRow";

export type MonthCalendarProps = {
  selectedDate: DateTime
  setSelectedDate: (arg: DateTime) => void
  eventCalls: CallWithEvent[]
}

export default function MonthCalendar(props: MonthCalendarProps) {
  const { selectedDate, eventCalls, setSelectedDate } = props;

  const getWeekNumArray = () => {
    let monthStart: DateTime = DateTime.fromObject({month: selectedDate.month, year: selectedDate.year}).startOf("month")
    let monthEnd: DateTime = DateTime.fromObject({month: selectedDate.month, year: selectedDate.year}).endOf("month").startOf("week")
    let weekNumArr: DateTime[] = []
    let numWeeks: number = Math.ceil(monthEnd.diff(monthStart, 'weeks').as('weeks'))

    for (let i = 0; i <= numWeeks; i ++) {
      weekNumArr = [...weekNumArr, monthStart.plus({weeks: i}).startOf("week")]
    }
    return weekNumArr
  }
  
  return (
    <table data-testid="month-calendar" className="w-[96vw]">
      <CalendarHeader selectedDate={selectedDate} setSelectedDate={(date) => setSelectedDate(date)}/>
      <DaysRow />
      <tbody>
        {getWeekNumArray().map(i => (
          <CalendarRow
            startOfWeekDate={i}
            year={selectedDate.year}
            weekNumber={i.weekNumber}
            setSelectedDate={setSelectedDate}
            eventCalls={eventCalls}
            selectedDate={selectedDate}
            key={i.day} />
        ))}
      </tbody>
    </table>
  )
}