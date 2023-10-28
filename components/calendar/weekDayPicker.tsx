import { Call } from "@prisma/client";
import { DateTime } from "luxon";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";

export type WeekDayPickerProps = {
  selectedDate: DateTime
  setSelectedDate: (date: DateTime) => void
  eventCalls: Call[]
}

export default function WeekDayPicker(props: WeekDayPickerProps) {
  const { selectedDate, setSelectedDate, eventCalls } = props;

  const getWeekArr = (): DateTime[] => {
    let dateArr = []
    const selectedWeek = selectedDate.startOf("week")
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
      <button data-testid="back-toggle" onClick={() => setSelectedDate(selectedDate.minus({week: 1}))}>
        <BsChevronLeft />
      </button>
      {getWeekArr().map(i => (
        <button className=" px-2" onClick={() => setSelectedDate(i)} key={i.day} data-testid={`${i.day}-weekday-tile`}>
          <p className="text-gray-500">{i.toFormat("ccc")}</p>
          <div className={`${selectedDate.hasSame(i, "day") ? "bg-black text-white" : "hover:bg-slate-100"} rounded-full p-1 justify-center flex flex-col items-center`}>
            <p className={`${DateTime.now().hasSame(i, "day") && !selectedDate.hasSame(i, "day") && "text-indigo-600"} `}>{i.toFormat("dd")}</p>
            {dayEvents(i).map(i => (
                <div className="absolute mt-10 text-indigo-600">
                  •
                </div>
              ))}
            </div>
            
        </button>
      ))}
       <button data-testid="back-toggle" onClick={() => setSelectedDate(selectedDate.plus({week: 1}))}>
        <BsChevronRight />
      </button>
    </div>
  )
}