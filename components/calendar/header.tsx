import { DateTime } from "luxon";
import ViewSelect from "./viewSelect";

export type CalendarHeaderProps = {
  selectedDate: DateTime
  setSelectedDate: (arg: DateTime) => void
  selectedView: "Day"|"Month"|"Year"
  setSelectedView: (arg: "Day"|"Month"|"Year") => void
}

export default function CalendarHeader(props: CalendarHeaderProps) {
  const { selectedDate, setSelectedDate, selectedView, setSelectedView } = props;

  return (
    <div data-testid="calendar-header" className="bg-gray-100 w-screen flex flex-row justify-between">
      <div data-testid="selected-date" className="m-2 text-sm flex flex-col justify-center">
        <p className="font-bold">
          { selectedView === "Year"
          ? selectedDate.toFormat("yyyy")
          : selectedDate.toFormat("DDD")}
        </p>
        {selectedView !== "Year" && <p className="text-gray-400">{selectedDate.toFormat("cccc")}</p>}
      </div>
      <div>
        
      </div>
      <div className="flex text-sm flex-row items-center m-2">
      <ViewSelect selectedView={selectedView} setSelectedView={arg => setSelectedView(arg)} />
      <button className="shadow bg-indigo-600 text-white py-1 px-2 rounded m-2 hover:bg-indigo-500" data-testid="today-btn" onClick={() => setSelectedDate(DateTime.now())}>
        Go to Today
      </button>
      </div>
    </div>
  )
}