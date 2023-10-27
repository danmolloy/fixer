import { DateTime, Duration } from "luxon";
import WeekRow from "./weekRow";
import { Call } from "@prisma/client";
import YearCalendarHeader from "./header";
import DaysRow from "./daysRow";

export type DatePickerProps = {
  selectedDate: DateTime
  setSelectedDate: (arg: DateTime) => void
  eventCalls: Call[]
  month: number
  year: number
}

export default function YearCalendar(props: DatePickerProps) {
  const { year, month, selectedDate, eventCalls, setSelectedDate } = props;

  const getWeekNumArray = () => {
    let monthStart: DateTime = DateTime.fromObject({month: month, year: year}).startOf("month")
    let monthEnd: DateTime = DateTime.fromObject({month: month, year: year}).endOf("month").startOf("week")
    let weekNumArr: DateTime[] = []
    let numWeeks: number = Math.ceil(monthEnd.diff(monthStart, 'weeks').as('weeks'))

    for (let i = 0; i <= numWeeks; i ++) {
      weekNumArr = [...weekNumArr, monthStart.plus({weeks: i}).startOf("week")]
    }
    return weekNumArr
    
  }
  
  
  
  return (
    <table data-testid="date-picker" className="">
      <YearCalendarHeader year={year} month={month} />
      <DaysRow />
      <tbody className="shadow-sm ">
        {getWeekNumArray().map(i => (
          <WeekRow
            startOfWeekDate={i}
            month={month}
            weekNumber={i.weekNumber}
            setSelectedDate={setSelectedDate}
            eventCalls={eventCalls}
            selectedDate={selectedDate}
            key={String(i.toISO)} />
        ))}
      </tbody>
    </table>
  )
}