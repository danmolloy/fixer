import { DateTime } from "luxon";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";

export type YearCalendarHeaderProps = {
  month: number
  year: number
}

export default function YearCalendarHeader(props: YearCalendarHeaderProps) {
  const { month, year } = props;

  return (
    <thead data-testid="date-picker-header">
      <tr>
      <th colSpan={2}>

      </th><th colSpan={3}>
      <h2>{DateTime.fromObject({month: month, year: year}).toFormat("LLLL")}</h2>
      </th><th colSpan={2}>

      </th>
      </tr>
    </thead>
  )
}