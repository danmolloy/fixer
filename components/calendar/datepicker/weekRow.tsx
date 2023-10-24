import { Call } from "@prisma/client"
import { DateTime } from "luxon"
import DayTile from "./dayTile"

export type WeekRowProps = {
  weekNumber: number
  year: number
  eventCalls: Call[]
  selectedDate: DateTime
  setSelectedDate: (arg: DateTime) => void
}

export default function WeekRow(props: WeekRowProps) {
  const { year, weekNumber, eventCalls, selectedDate, setSelectedDate } = props
  
  const getWeekArr = () => {
    
    let weekArr: DateTime[] = [];
    let weekStart = DateTime.fromObject({weekNumber: weekNumber}).set({year: year}).startOf("week")
    for (let i = 0; i < 7; i++) {
      weekArr = [...weekArr, weekStart.plus({days: i})]
    }

    return weekArr
  }

  return (
    <div data-testid={`${weekNumber}-row`}>
      {getWeekArr().map(i => (
        <DayTile 
          tileDate={i} 
          eventCalls={eventCalls} 
          selectedDate={selectedDate} 
          setSelectedDate={(arg) => setSelectedDate(arg)}  
          key={i.day} />
      ))}
    </div>
  )
}