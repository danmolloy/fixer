import moment from "moment"
import React from "react"

export type EventDashboardProps = {
  setDateRange: (arg: string|number|null) => void
  setSelectedDate: (arg: moment.Moment) => void
  dateRange: undefined|number|string
}

export default function EventDashboard(props: EventDashboardProps) {
  const { setDateRange, setSelectedDate, dateRange } = props
  return (
    <div data-testid="event-dashboard-div" className="hidden sm:flex w-full flex-row justify-evenly ">
      <button onClick={() => {
        setDateRange(undefined)
        setSelectedDate(moment(new Date()))
        }} data-testid="view-all-btn" className={dateRange === undefined ? "py-2 border-b-2 border-blue-600 text-blue-600" :"text-slate-400 py-2"}>
        Upcoming Events
      </button>
      <button onClick={() => setDateRange(7)} data-testid="week-btn" className={dateRange === 7 ? "py-2 border-b-2 border-blue-600 text-blue-600" :"text-slate-400 py-2"}>
        Week
      </button>
      <button onClick={() => setDateRange(14)} data-testid="fortnight-btn" className={dateRange === 14 ? "py-2 border-b-2 border-blue-600 text-blue-600" :"text-slate-400 py-2"}>
        Fortnight
      </button>
      <button onClick={() => setDateRange(28)} data-testid="month-btn" className={dateRange === 28 ? "py-2 border-b-2 border-blue-600 text-blue-600" :"text-slate-400 py-2"}>
        Four Weeks
      </button>
      <button onClick={() => {
        setDateRange("past")
        setSelectedDate(moment(new Date()))
        }} data-testid="view-all-btn" className={dateRange === "past" ? "py-2 border-b-2 border-orange-600 text-orange-600" :"text-slate-400 py-2"}>
        Past Events
      </button>
    </div>
  )
}