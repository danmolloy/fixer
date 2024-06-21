import { DateTime } from "luxon";
import { CallWithEventWithEnsemble } from "./dayView";
import CallList from "../callList/index";
import { DatePicker, MonthCalendar } from "react-diary"

export type MonthViewProps = {
  selectedDate: DateTime
  eventCalls: CallWithEventWithEnsemble[]
  setSelectedDate: (arg: DateTime) => void
}

export default function MonthView(props: MonthViewProps) {
  const { selectedDate, setSelectedDate, eventCalls } = props;

  return (
    <div data-testid="month-view">
      <div className="hidden md:flex p-4">
      <MonthCalendar
        selectedDate={selectedDate.toJSDate()}
        events={eventCalls.map(i => ({
          title: i.event.ensemble.name,
          startTime: i.startTime,
          id: String(i.id)
        }))}
        setSelectedDate={(arg) => setSelectedDate(DateTime.fromJSDate(arg))}/>
      </div>
      <div className="md:hidden">
        <DatePicker
          selectedDate={selectedDate.toJSDate()}
          events={eventCalls.map(i => ({
            title: i.event.ensemble.name,
            startTime: i.startTime,
            id: String(i.id)
          }))}
          setSelectedDate={(arg) => setSelectedDate(DateTime.fromJSDate(arg))} />
      </div>
      <CallList eventCalls={eventCalls} selectedDate={selectedDate} />
    </div>
  )
}