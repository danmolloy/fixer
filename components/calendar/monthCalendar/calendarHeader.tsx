import { DateTime } from "luxon";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";

export type CalendarHeaderProps = {
  selectedDate: DateTime
  setSelectedDate: (arg: DateTime) => void
}

export default function CalendarHeader(props: CalendarHeaderProps) {
  const { selectedDate, setSelectedDate } = props;

  return (
    <thead data-testid="calendar-header" className="h-10">
      <tr>
      <th colSpan={2}>
      <button data-testid="back-toggle" onClick={() => setSelectedDate(selectedDate.minus({month: 1}).startOf("month"))}>
        <BsChevronLeft />
      </button>
      </th><th colSpan={3}>
      <h2>{selectedDate.toFormat("LLLL")}</h2>
      </th><th colSpan={2}>
      <button data-testid="forward-toggle" onClick={() => setSelectedDate(selectedDate.plus({month: 1}).startOf("month"))}>
        <BsChevronRight />
      </button>
      </th>
      </tr>
    </thead>
  )
}