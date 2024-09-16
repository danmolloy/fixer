import { Call } from '@prisma/client';
import { DateTime } from 'luxon';
import { BsDot } from 'react-icons/bs';

export type DayTileProps = {
  month: number;
  year: number;
  tileDate: DateTime;
  eventCalls: Call[];
  selectedDate: DateTime;
  setSelectedDate: (arg: DateTime) => void;
  setSelectedView: (arg: 'Day' | 'Month' | 'Year') => void;
};

export default function DayTile(props: DayTileProps) {
  const {
    setSelectedView,
    month,
    year,
    tileDate,
    eventCalls,
    selectedDate,
    setSelectedDate,
  } = props;

  const calendarMonth = DateTime.fromObject({ month, year });

  return (
    <td
      data-testid='day-tile'
      className={`${tileDate.hasSame(calendarMonth, 'month') ? 'bg-white' : 'bg-slate-100'} h-12 w-12 border`}
    >
      <button
        className={`${tileDate.hasSame(selectedDate, 'day') && tileDate.month === month ? 'bg-indigo-600 text-white' : ''} flex h-full w-full flex-col items-center font-thin hover:bg-indigo-50 hover:text-black`}
        data-testid={`${tileDate}-tile`}
        onClick={() => {
          setSelectedDate(tileDate);
          setSelectedView('Day');
        }}
      >
        <p
          className={`${tileDate.hasSame(DateTime.now(), 'day') && !tileDate.hasSame(selectedDate, 'day') ? 'text-indigo-500' : ''}`}
        >
          {tileDate.day}
        </p>
        {eventCalls.length > 0 && (
          <div data-testid='dot-indicator' className='text-xl text-indigo-600'>
            <BsDot />
          </div>
        )}
      </button>
    </td>
  );
}
