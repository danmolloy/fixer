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
    <td className={`${tileDate.hasSame(selectedDate, 'month') ? "bg-white" : "bg-slate-50" } border w-12 h-12`}>
      <button 
      className={`${tileDate.hasSame(selectedDate, 'day') ? "bg-indigo-600 text-white" : "hover:bg-indigo-50 hover:text-black"} w-full h-full flex flex-col items-center font-thin `} data-testid={`${tileDate}-tile`} onClick={() => setSelectedDate(tileDate)}>
        <p className={`${tileDate.hasSame(DateTime.now(), 'day') && !tileDate.hasSame(selectedDate, 'day') ? "text-indigo-500": ""}`}>
          {tileDate.day}
        </p>
        {eventCalls.length > 0 
        && <div data-testid="dot-indicator" className="text-indigo-600 text-xl">
          <BsDot />
        </div>}
      </button>
    </td>
  )
}