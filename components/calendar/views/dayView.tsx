import { DateTime } from "luxon";
import { CallWithEvent } from "../monthCalendar/calendarDay";
import CallList from "../CallList";
import DatePicker from "../datepicker";

export type DayViewProps = {
  selectedDate: DateTime
  eventCalls: CallWithEvent[]
  setSelectedDate: (arg: DateTime) => void
}

export default function DayView(props: DayViewProps) {
  const { selectedDate, setSelectedDate, eventCalls } = props;

  return (
    <div data-testid="day-view" className="py-4 flex flex-row justify-center">
      <CallList eventCalls={eventCalls} selectedDate={selectedDate} />
      <DatePicker 
        selectedDate={selectedDate}
        eventCalls={eventCalls}
        setSelectedDate={setSelectedDate}/>
    </div>
  )
}