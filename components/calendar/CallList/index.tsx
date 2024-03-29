import { DateTime } from "luxon";
import { CallWithEventWithEnsemble } from "../monthCalendar/calendarDay";
import CallTile from "./callTile";

export type CallListProps = {
  eventCalls: CallWithEventWithEnsemble[]
  selectedDate: DateTime
}

export default function CallList(props: CallListProps) {
  const { eventCalls, selectedDate } = props; 

  const daysWork = eventCalls.filter(i => DateTime.fromJSDate(new Date(i.startTime)).hasSame(selectedDate, 'day'))

  return (
    <div data-testid="call-list" className="m-2">
      <h2>Events on {selectedDate.toFormat("DD")}</h2>
      <div>
        {daysWork.length > 0 ?
          daysWork.map(i => (
            <CallTile key={i.id} eventCall={i} />
          ))
          : <div className=" lg:w-[50vw] h-24 p-2 flex flex-col m-2 rounded   ">
            <p>No events on this day.</p>
            </div>}
      </div>
    </div>
  )
}