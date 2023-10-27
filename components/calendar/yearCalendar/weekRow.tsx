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
}

export default function WeekRow(props: WeekRowProps) {
  const { month, startOfWeekDate, weekNumber, eventCalls, selectedDate, setSelectedDate } = props
  
  const getWeekArr = () => {
    
    let weekArr: DateTime[] = [];
    let weekStart = startOfWeekDate
    for (let i = 0; i < 7; i++) {
      weekArr = [...weekArr, weekStart.plus({days: i})]
    }

    return weekArr
  }

  return (
    <tr data-testid={`${weekNumber}-row`}>
      {getWeekArr().map(i => (
        <DayTile 
          month={month}
          year={i.year}
          tileDate={i} 
          eventCalls={eventCalls.filter(j => DateTime.fromJSDate(new Date(j.startTime)).hasSame(i, "day"))} 
          selectedDate={selectedDate} 
          setSelectedDate={(arg) => setSelectedDate(arg)}  
          key={i.day} />
      ))}
    </tr>
  )
}