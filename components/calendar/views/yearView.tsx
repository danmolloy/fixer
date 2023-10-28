import { Call } from "@prisma/client"
import { DateTime } from "luxon"
import DatePicker from "../datepicker"
import DaysRow from "../datepicker/daysRow"
import WeekRow from "../datepicker/weekRow"
import YearCalendar from "../yearCalendar"
import { BsChevronLeft, BsChevronRight } from "react-icons/bs"

export type YearViewProps = {
  selectedDate: DateTime
  setSelectedDate: (date: DateTime) => void
  eventCalls: Call[]
  setSelectedView: (arg: "Day"|"Month"|"Year") => void
}

export default function YearView(props: YearViewProps) {
  const { setSelectedView, selectedDate, setSelectedDate, eventCalls } = props;

  const getMonthsArr = (): DateTime[] => {
    let janDateTime = selectedDate.set({month: 1, year: selectedDate.year}).startOf("month")
    let monthsArr = []

    for (let i = 0; i < 12; i++) {
      monthsArr = [...monthsArr, janDateTime.plus({months: i})]
    }

    return monthsArr
  }


  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-row">
      <button data-testid="back-toggle" onClick={() => setSelectedDate(selectedDate.minus({years: 1}).startOf("month"))}>
        <BsChevronLeft />
      </button>
      <h2 className="px-2">
        {selectedDate.year}
      </h2>
      <button data-testid="back-toggle" onClick={() => setSelectedDate(selectedDate.plus({years: 1}).startOf("month"))}>
        <BsChevronRight />
      </button>
      </div>
      <div className="flex md:flex-row flex-wrap flex-col md:justify-center">
        {getMonthsArr().map(i => (
          <YearCalendar
            setSelectedView={(arg) => setSelectedView(arg)}
            year={i.year} 
            key={i.month}
            month={i.month}
            eventCalls={eventCalls}
            setSelectedDate={(arg) => setSelectedDate(arg)}
            selectedDate={selectedDate} />))}
      </div>
    </div>
  )
}