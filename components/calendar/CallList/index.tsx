import { DateTime } from "luxon";
import { CallWithEvent } from "../../upcomingEvents/upcomingEvents"
import CallTile from "./callTile";

export type CallListProps = {
  eventCalls: CallWithEvent[]
  selectedDate: DateTime
}

export default function CallList(props: CallListProps) {
  const { eventCalls, selectedDate } = props; 

  const daysWork = eventCalls.filter(i => DateTime.fromJSDate(new Date(i.startTime)).hasSame(selectedDate, 'day'))

  return (
    <div data-testid="call-list">
      <h2>Events on {selectedDate.toFormat("DDD")}</h2>
      <div>
        {daysWork.length > 0 ?
          daysWork.map(i => (
            <CallTile key={i.id} eventCall={i} />
          ))
          : <p>No events on this day.</p>}
      </div>
    </div>
  )
}