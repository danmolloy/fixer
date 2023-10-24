import { Call } from "@prisma/client";
import { DateTime } from "luxon";
import { BsDot } from "react-icons/bs";

export type DayTileProps = {
  tileDate: DateTime
  eventCalls: Call[]
  selectedDate: DateTime
  setSelectedDate: (arg: DateTime) => void
}

export default function DayTile(props: DayTileProps) {
  const { tileDate, eventCalls, selectedDate, setSelectedDate } = props;
  
  return (
    <button data-testid={`${tileDate}-tile`} onClick={() => setSelectedDate(tileDate)}>
      <p>
        {tileDate.day}
      </p>
      {eventCalls.length > 0 
      && <div data-testid="dot-indicator">
        <BsDot />
      </div>}
    </button>
  )
}