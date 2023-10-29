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
    let monthStart: DateTime = selectedDate.startOf("month")
    let monthEnd: DateTime = selectedDate.endOf("month")
    let weekNumArr: DateTime[] = []
    let numWeeks: number = Math.ceil(monthEnd.startOf("week").diff(monthStart, "weeks").as("weeks"))

    for (let i = 0; i <= numWeeks; i ++) {
      weekNumArr = [...weekNumArr, monthStart.plus({weeks: i})]
    }
    return weekNumArr
  }
  
  return (
    <table data-testid="date-picker" className="">
      <DatePickerHeader selectedDate={selectedDate} setSelectedDate={(date) => setSelectedDate(date)}/>
      <DaysRow />
      <tbody className="shadow-sm ">
        {getWeekNumArray().map(i => (
          <WeekRow
            startOfWeekDate={i.startOf("week")}
            setSelectedDate={setSelectedDate}
            eventCalls={eventCalls}
            selectedDate={selectedDate}
            key={i.toFormat("dd LLL yyyy")} />
        ))}
      </tbody>
    </table>
  )
}