import { DateTime } from "luxon";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";

export type CalendarHeaderProps = {
  selectedDate: DateTime
  setSelectedDate: (arg: DateTime) => void
}

export default function CalendarHeader(props: CalendarHeaderProps) {
  const { selectedDate, setSelectedDate } = props;

  return (
    <div data-testid="calendar-header">
      <button data-testid="back-toggle" onClick={() => setSelectedDate(selectedDate.minus({month: 1}).startOf("month"))}>
        <BsChevronLeft />
      </button>
      <h2>{selectedDate.toFormat("LLLL")}</h2>
      <button data-testid="forward-toggle" onClick={() => setSelectedDate(selectedDate.plus({month: 1}).startOf("month"))}>
        <BsChevronRight />
      </button>
    </div>
  )
}