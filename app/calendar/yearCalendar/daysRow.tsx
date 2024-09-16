export const daysArr: {
  index: number;
  day: string;
}[] = [
  {
    index: 1,
    day: 'Monday',
  },
  {
    index: 2,
    day: 'Tuesday',
  },
  {
    index: 3,
    day: 'Wednesday',
  },
  {
    index: 4,
    day: 'Thursday',
  },
  {
    index: 5,
    day: 'Friday',
  },
  {
    index: 6,
    day: 'Saturday',
  },
  {
    index: 7,
    day: 'Sunday',
  },
];

export default function DaysRow() {
  return (
    <thead data-testid='days-row'>
      <tr>
        {daysArr.map((i) => (
          <th
            data-testid={`${i.day}-col`}
            key={i.index}
            className='h-12 w-12 text-slate-500'
          >
            {i.day[0]}
          </th>
        ))}
      </tr>
    </thead>
  );
}
