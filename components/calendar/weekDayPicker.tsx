import { Call } from "@prisma/client";
import { DateTime } from "luxon";

export type WeekDayPickerProps = {
  selectedDate: DateTime
  setSelectedDate: (date: DateTime) => void
  eventCalls: Call[]
}

export default function WeekDayPicker(props: WeekDayPickerProps) {
  const { selectedDate, setSelectedDate, eventCalls } = props;

  const getWeekArr = (): DateTime[] => {
    let dateArr = []
    const selectedWeek = DateTime.fromObject({weekNumber: selectedDate.weekNumber}).set({year: selectedDate.year})
    for (let i = 1; i <= 7; i ++) {
      dateArr = [...dateArr, selectedWeek.set({weekday: i})]
    }
    return dateArr
  }

  const dayEvents = (dayDate: DateTime): Call[] => {
    return eventCalls.filter(i => DateTime.fromJSDate(new Date(i.startTime)).hasSame(dayDate, 'day'))
  }

  return (
    <div data-testid="weekday-picker" className="flex flex-row h-16  w-screen justify-evenly items-center">
      {getWeekArr().map(i => (
        <button className="" onClick={() => setSelectedDate(i)} key={i.day} data-testid={`${i.day}-weekday-tile`}>
          <p className="text-gray-500">{i.toFormat("ccc")}</p>
          <div className={`${selectedDate.hasSame(i, "day") && "bg-black text-white"} rounded-full p-1 justify-center flex flex-col items-center`}>
            <p className={`${DateTime.now().hasSame(i, "day") && !selectedDate.hasSame(i, "day") && "text-indigo-600"} `}>{i.toFormat("dd")}</p>
            {dayEvents(i).map(i => (
                <div className="absolute mt-10 text-indigo-600">
                  •
                </div>
              ))}
            </div>
            
        </button>
      ))}
    </div>
  )
}