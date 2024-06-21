import { Call } from "@prisma/client"
import { DateTime } from "luxon"
import DayTile from "./dayTile"

export type WeekRowProps = {
  startOfWeekDate: DateTime
  month: number
  weekNumber: number
  eventCalls: Call[]
  selectedDate: DateTime
  setSelectedDate: (arg: DateTime) => void
  setSelectedView: (arg: "Day"|"Month"|"Year") => void
}

export default function WeekRow(props: WeekRowProps) {
  const { setSelectedView, month, startOfWeekDate, weekNumber, eventCalls, selectedDate, setSelectedDate } = props
  
  const getWeekArr = () => {
    let weekArr: DateTime[] = [];
    for (let i = 0; i < 7; i++) {
      weekArr = [...weekArr, startOfWeekDate.plus({days: i})]
    }
    return weekArr
  }

  return (
    <tr data-testid={`${weekNumber}-row`}>
      {getWeekArr().map(i => (
        <DayTile 
          setSelectedView={(arg) => setSelectedView(arg)}
          month={month}
          year={i.year}
          tileDate={i} 
          eventCalls={eventCalls.filter(j => DateTime.fromJSDate(new Date(j.startTime)).hasSame(i, "day"))} 
          selectedDate={selectedDate} 
          setSelectedDate={(arg) => setSelectedDate(arg)}  
          key={i.toFormat("dd LLL yyyy")} />
      ))}
    </tr>
  )
}