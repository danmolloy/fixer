import { DateTime } from "luxon";
import WeekRow from "./weekRow";
import { Call } from "@prisma/client";
import DatePickerHeader from "./header";

export type DatePickerProps = {
  selectedDate: DateTime
  setSelectedDate: (arg: DateTime) => void
  eventCalls: Call[]
}

export default function DatePicker(props: DatePickerProps) {
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
      <DatePickerHeader selectedDate={selectedDate} setSelectedDate={(date) => setSelectedDate(date)}/>
      {getWeekNumArray().map(i => (
        <WeekRow
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