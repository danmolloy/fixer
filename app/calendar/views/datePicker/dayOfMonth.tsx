import { DateTime } from 'luxon';
import { BsDot } from 'react-icons/bs';

export type DPDayProps = {
  selectedDate: DateTime;
  setSelectedDate: (args: DateTime) => void;
  dayOfMonthDate: DateTime;
  events: {
    startTime: DateTime;
    title: string;
    id: string;
  }[];
};

export default function DatePickerDay(props: DPDayProps) {
  const { setSelectedDate, selectedDate, dayOfMonthDate, events } = props;

  return (
    <td
      className={`${dayOfMonthDate.hasSame(selectedDate, 'month') ? 'bg-white' : 'bg-slate-50'} h-12 w-12 border`}
    >
      <button
        className={`${dayOfMonthDate.hasSame(selectedDate, 'day') ? 'bg-indigo-500 text-white' : 'hover:bg-indigo-50 hover:text-black'} ${dayOfMonthDate.hasSame(DateTime.now(), 'day') && 'border-2 border-black'} flex h-full w-full flex-col items-center font-thin`}
        data-testid={`${dayOfMonthDate.toFormat('LLL dd, yyyy')}-tile`}
        onClick={() => setSelectedDate(dayOfMonthDate)}
      >
        <p
          className={`${dayOfMonthDate.hasSame(selectedDate, 'day') && 'bg-indigo-500 text-white'} flex h-6 w-6 items-center justify-center overflow-visible rounded-full p-1`}
        >
          {dayOfMonthDate.toFormat('d')}
        </p>
        {events.length > 0 && (
          <div data-testid='dot-indicator' className={`text-xl`}>
            <BsDot />
          </div>
        )}
      </button>
    </td>
  );
}
