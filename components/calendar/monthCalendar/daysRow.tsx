
const daysArr: {
  index: number
  day: string
}[] = [
  {
    index: 1,
    day: "Monday"
  },
  {
    index: 2,
    day: "Tuesday"
  },
  {
    index: 3,
    day: "Wednesday"
  },
  {
    index: 4,
    day: "Thursday"
  },
  {
    index: 5,
    day: "Friday"
  },
  {
    index: 6,
    day: "Saturday"
  },
  {
    index: 7,
    day: "Sunday"
  }

]

export default function DaysRow() {
  return (
    <thead>
      <tr>
      {daysArr.map(i => (
        <th key={i.index} className="h-12 w-12">
          {i.day.slice(0, 3)}
        </th>
      ))}
      </tr>
    </thead>
  )
}