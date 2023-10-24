import { Call, Prisma } from "@prisma/client";
import { DateTime } from "luxon";

export type CallWithEvent = Prisma.CallGetPayload<{
  include: {
    event: true
  }
}>


export type CalendarDayProps = {
  eventCalls: CallWithEvent[]
  calendarDayDate: DateTime
  selectedDate: DateTime
  setSelectedDate: (arg: DateTime) => void
}

export default function CalendarDay(props: CalendarDayProps) {
  const { calendarDayDate, eventCalls, selectedDate, setSelectedDate } = props;
  
  return (
    <td>
      <button data-testid={`${calendarDayDate}-day`} onClick={() => setSelectedDate(calendarDayDate)}>
        <h3>
          {calendarDayDate.day}
        </h3>
        {eventCalls.map(i => (
          <p key={i.id} data-testid={`${i.id}-preview`}>
            {i.event.ensembleName} {DateTime.fromJSDate(new Date(i.startTime)).toFormat("ha")}
          </p>
        ))}
      </button>
    </td>
  )
}