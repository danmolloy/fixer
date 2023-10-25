import { DateTime } from "luxon";

export type WeekDayPickerProps = {
  selectedDate: DateTime
  setSelectedDate: (date: DateTime) => void
}

export default function WeekDayPicker(props: WeekDayPickerProps) {
  const { selectedDate, setSelectedDate } = props;

  const getWeekArr = (): DateTime[] => {
    let dateArr = []
    const selectedWeek = DateTime.fromObject({weekNumber: selectedDate.weekNumber}).set({year: selectedDate.year})
    for (let i = 1; i <= 7; i ++) {
      dateArr = [...dateArr, selectedWeek.set({weekday: i})]
    }
    return dateArr
  }

  return (
    <div data-testid="weekday-picker">
      {getWeekArr().map(i => (
        <button onClick={() => setSelectedDate(i)} key={i.day} data-testid={`${i.day}-weekday-tile`}>
          <p>{i.toFormat("ccc")}</p>
          <p>{i.toFormat("dd")}</p>
        </button>
      ))}
    </div>
  )
}