import { useState } from "react"
import { EventDashboardProps } from "./dashboard"
import moment from "moment"


export default function MobileDashboard(props: EventDashboardProps) {
  const { setDateRange, setSelectedDate, dateRange } = props

  const handleChange = (val: number|string|undefined) => {
    if (val === undefined) {
      setDateRange(undefined); // Should be undefined
      setSelectedDate(moment(new Date()));
    } else {
      setDateRange(val)
    }
  }

  return (
    <div data-testid="mobile-dashboard" className="sm:hidden flex flex-col items-center">
      {dateRange}
      <select 
        data-testid="select-menu"
        className=" border shadow-sm p-1 rounded w-1/2"
        value={dateRange} 
        onChange={e => handleChange(e.target.value)} >
        <option value={undefined}>
          All Upcoming 
        </option>
        <option value={7}>
          Week
        </option>
        <option value={14}>
          Fortnight
        </option>
        <option value={28}>
          Four Weeks
        </option>
        <option value={"past"}>
          Past Events
        </option>
      </select>
    </div>
  )
}