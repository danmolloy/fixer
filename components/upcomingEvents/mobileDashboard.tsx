import { useState } from "react"
import { EventDashboardProps } from "./dashboard"
import moment from "moment"


export default function MobileDashboard(props: EventDashboardProps) {
  const { setDateRange, setSelectedDate, dateRange } = props

  const handleChange = (val: number) => {
    if (val === 0) {
      setDateRange(undefined); // Should be undefined
      setSelectedDate(moment(new Date()));
    } else {
      setDateRange(val)
    }
  }

  return (
    <div data-testid="mobile-dashboard" className="sm:hidden flex flex-col items-center">
      <select 
        data-testid="select-menu"
        className=" border shadow-sm p-1 rounded w-1/2"
        value={dateRange} 
        onChange={e => handleChange(Number(e.target.value))} >
        <option value={0}>
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
      </select>
    </div>
  )
}