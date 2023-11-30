import { DateTime } from "luxon";
import { CallWithEventWithEnsemble } from "../monthCalendar/calendarDay";
import CallList from "../CallList/index";
import MonthCalendar from "../monthCalendar";
import DatePicker from "../datepicker";

export type MonthViewProps = {
  selectedDate: DateTime
  eventCalls: CallWithEventWithEnsemble[]
  setSelectedDate: (arg: DateTime) => void
}

export default function MonthView(props: MonthViewProps) {
  const { selectedDate, setSelectedDate, eventCalls } = props;

  return (
    <div data-testid="month-view">
      <div className="hidden md:flex">
      <MonthCalendar
        selectedDate={selectedDate}
        eventCalls={eventCalls}
        setSelectedDate={setSelectedDate}/>
      </div>
      <div className="md:hidden">
        <DatePicker 
        selectedDate={selectedDate}
        eventCalls={eventCalls}
        setSelectedDate={setSelectedDate}/>
      </div>
      <CallList eventCalls={eventCalls} selectedDate={selectedDate} />
    </div>
  )
}