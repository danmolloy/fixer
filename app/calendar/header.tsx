import { DateTime } from "luxon";
import ViewSelect from "./viewSelect";

export type CalendarHeaderProps = {
  selectedDate: DateTime
  setSelectedDate: (arg: DateTime) => void
  selectedView: string
  setSelectedView: (arg: string) => void
}

export default function CalendarHeader(props: CalendarHeaderProps) {
  const { selectedDate, setSelectedDate, selectedView, setSelectedView } = props;

  const handleSelectToday = () => {
    if (selectedView === "Year") {
      setSelectedView("Month")
    }
    setSelectedDate(DateTime.now())
  }

  return (
    <div data-testid="calendar-header" className="bg-gray-100 w-screen flex flex-row justify-between">
      <div data-testid="selected-date" className="m-2 text-sm flex flex-col justify-center">
        <p className="font-bold">
          { selectedView === "Year"
          ? selectedDate.toFormat("yyyy")
          : selectedDate.toFormat("DD")}
        </p>
        {selectedView !== "Year" && <p className="text-gray-400">{selectedDate.toFormat("cccc")}</p>}
      </div>
      <div>
        
      </div>
      <div className="flex text-sm flex-row items-center m-2">
      <ViewSelect selectedView={selectedView} setSelectedView={arg => setSelectedView(arg)} />
      <button className="shadow bg-indigo-600 text-white py-1 px-2 rounded m-2 hover:bg-indigo-500" data-testid="today-btn" onClick={() => handleSelectToday()}>
        Go to Today
      </button>
      </div>
    </div>
  )
}