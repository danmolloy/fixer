import { DateTime } from 'luxon';

export type DayOfMonthProps = {
  selectedDate: DateTime;
  setSelectedDate: (args: DateTime) => void;
  dayOfMonthDate: DateTime;
  events: {
    startTime: DateTime;
    title: string;
    id: string;
  }[];
};

export default function DayOfMonth(props: DayOfMonthProps) {
  const { setSelectedDate, selectedDate, dayOfMonthDate, events } = props;

  return (
    <td className='h-32 w-20 border'>
      <button
        className={`${dayOfMonthDate.hasSame(selectedDate, 'month') ? 'bg-white' : 'bg-slate-50'} flex h-full w-full flex-col hover:bg-slate-100 hover:text-indigo-600`}
        data-testid={`${dayOfMonthDate.toLocaleString()}-tile`}
        onClick={() => setSelectedDate(dayOfMonthDate)}
      >
        <div
          className={`${dayOfMonthDate.hasSame(DateTime.now(), 'day') && 'border border-black'} ${dayOfMonthDate.hasSame(selectedDate, 'day') && 'bg-indigo-600 text-white'} flex h-6 w-6 items-center justify-center overflow-visible rounded-full p-1`}
        >
          <h3>{dayOfMonthDate.toFormat('d')}</h3>
        </div>
        <ol className='my-1 h-full w-[95%] self-center text-sm'>
          {events
            .sort(
              (a, b) =>
                Number(a.startTime.toMillis()) - Number(b.startTime.toMillis())
            )
            .slice(0, 3)
            .map((i) => (
              <li
                className='mb-1 flex flex-row flex-nowrap items-center justify-center overflow-hidden text-xs'
                key={i.id}
              >
                <div className='mr-1 h-2 w-2 rounded-full bg-indigo-600' />
                <p className='mr-1 hidden text-gray-500 lg:block'>
                  {i.startTime.toFormat('t')}
                </p>
                <p className='text-nowrap hidden truncate sm:block'>
                  {i.title}
                </p>
              </li>
            ))}
          {events.length > 3 && (
            <p className='text-xs text-slate-500'>& {events.length - 3} more</p>
          )}
        </ol>
      </button>
    </td>
  );
}
