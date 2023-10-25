import { DateTime } from "luxon";
import { CallWithEvent } from "../monthCalendar/calendarDay";
import CallList from "../CallList";
import MonthCalendar from "../monthCalendar";

export type MonthViewProps = {
  selectedDate: DateTime
  eventCalls: CallWithEvent[]
  setSelectedDate: (arg: DateTime) => void
}

export default function MonthView(props: MonthViewProps) {
  const { selectedDate, setSelectedDate, eventCalls } = props;

  return (
    <div data-testid="month-view">
      <MonthCalendar
        selectedDate={selectedDate}
        eventCalls={eventCalls}
        setSelectedDate={setSelectedDate}/>
      <CallList eventCalls={eventCalls} selectedDate={selectedDate} />
    </div>
  )
}