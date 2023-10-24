import { DateTime } from "luxon";
import WeekRow from "./weekRow";
import { Call } from "@prisma/client";
import DatePickerHeader from "./header";
import DaysRow from "./daysRow";

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

    for (let i = 0; i <= numWeeks; i ++) {
      weekNumArr = [...weekNumArr, monthStart + i]
    }
    return weekNumArr
  }
  
  return (
    <table data-testid="date-picker" >
      <DatePickerHeader selectedDate={selectedDate} setSelectedDate={(date) => setSelectedDate(date)}/>
      <DaysRow />
      <tbody className="shadow-sm">
        {getWeekNumArray().map(i => (
          <WeekRow
            year={selectedDate.year}
            weekNumber={i}
            setSelectedDate={setSelectedDate}
            eventCalls={eventCalls}
            selectedDate={selectedDate}
            key={i} />
        ))}
      </tbody>
    </table>
  )
}