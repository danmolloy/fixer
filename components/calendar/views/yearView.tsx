import { Call } from "@prisma/client"
import { DateTime } from "luxon"
import DatePicker from "../datepicker"
import DaysRow from "../datepicker/daysRow"
import WeekRow from "../datepicker/weekRow"
import YearCalendar from "../yearCalendar"

export type YearViewProps = {
  selectedDate: DateTime
  setSelectedDate: (date: DateTime) => void
  eventCalls: Call[]
}

export default function YearView(props: YearViewProps) {
  const { selectedDate, setSelectedDate, eventCalls } = props;

  const getMonthsArr = (): DateTime[] => {
    let janDateTime = selectedDate.set({month: 1, year: selectedDate.year}).startOf("month")
    let monthsArr = []

    for (let i = 0; i < 12; i++) {
      monthsArr = [...monthsArr, janDateTime.plus({months: i})]
    }

    return monthsArr
  }


  return (
    <div>
      {getMonthsArr().map(i => (
        <YearCalendar
          year={i.year} 
          key={i.month}
          month={i.month}
          eventCalls={eventCalls}
          setSelectedDate={(arg) => setSelectedDate(arg)}
          selectedDate={selectedDate} />))}
    </div>
  )
}