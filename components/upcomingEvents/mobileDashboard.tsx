import { useState } from "react"
import { EventDashboardProps } from "./dashboard"
import moment from "moment"


export default function MobileDashboard(props: EventDashboardProps) {
  const { setDateRange, setSelectedDate, dateRange } = props
  const [selected, setSelected] = useState(0)

  const handleChange = (val: number) => {
    if (val === 0) {
      setDateRange(null);
      setSelectedDate(moment(new Date()));
      setSelected(val);
    } else {
      setSelected(val);
      setDateRange(val)
    }
  }

  return (
    <div className="sm:hidden flex flex-col items-center">
      <select 
        className=" border shadow-sm p-1 rounded w-1/2"
        value={selected} 
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