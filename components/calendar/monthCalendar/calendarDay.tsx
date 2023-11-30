import { Call, Prisma } from "@prisma/client";
import { DateTime } from "luxon";

export type CallWithEventWithEnsemble = Prisma.CallGetPayload<{
  include: {
    event: {
      include: {
        ensemble: true
      }
    }
  }
}>


export type CalendarDayProps = {
  eventCalls: CallWithEventWithEnsemble[]
  calendarDayDate: DateTime
  selectedDate: DateTime
  setSelectedDate: (arg: DateTime) => void
}

export default function CalendarDay(props: CalendarDayProps) {
  const { calendarDayDate, eventCalls, selectedDate, setSelectedDate } = props;
  
  return (
    <td className={`border h-24 w-20`}>
      <button className={` ${calendarDayDate.hasSame(selectedDate, 'month') ? "bg-white" : "bg-slate-50" } hover:bg-slate-100 w-full h-full flex flex-col hover:text-indigo-600`} data-testid={`${calendarDayDate}-day`} onClick={() => setSelectedDate(calendarDayDate)}>
        <h3 className={`${calendarDayDate.hasSame(DateTime.now(), 'day') && !calendarDayDate.hasSame(selectedDate, 'day') ? "text-indigo-500 font-bold": calendarDayDate.hasSame(selectedDate, 'day') ? "bg-black text-white" : "text-gray-600 "} self-end  text-sm w-6 h-6 flex items-center justify-center rounded-full overflow-visible`}>
          {calendarDayDate.day}
        </h3>
        {eventCalls.map(i => (
          <p key={i.id} data-testid={`${i.id}-preview`} className="text-xs">
            {i.event.ensemble.name} {DateTime.fromJSDate(new Date(i.startTime)).toFormat("ha")}
          </p>
        ))}
      </button>
    </td>
  )
}