import { DateTime } from "luxon";
import { CallWithEvent } from "../monthCalendar/calendarDay";
import DatePicker from "../datepicker";
import WeekDayPicker from "../weekDayPicker";
import CallList from "../callList";

export type DayViewProps = {
  selectedDate: DateTime
  eventCalls: CallWithEvent[]
  setSelectedDate: (arg: DateTime) => void
}

export default function DayView(props: DayViewProps) {
  const { selectedDate, setSelectedDate, eventCalls } = props;

  return (
    <div data-testid="day-view" className=" md:py-4 flex flex-col md:flex-row justify-center">
      <div className="md:hidden">
        <WeekDayPicker 
          selectedDate={selectedDate}
          eventCalls={eventCalls}
          setSelectedDate={setSelectedDate}/>
      </div>
      <CallList eventCalls={eventCalls} selectedDate={selectedDate} />
      <div className="hidden md:flex">
        <DatePicker 
          selectedDate={selectedDate}
          eventCalls={eventCalls}
          setSelectedDate={setSelectedDate}/>
      </div>
    </div>
  )
}