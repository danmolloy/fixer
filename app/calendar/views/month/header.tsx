import { DateTime } from 'luxon';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';

export type MonthHeaderProps = {
  selectedDate: DateTime;
  setSelectedDate: (arg: DateTime) => void;
};

export default function MonthHeader(props: MonthHeaderProps) {
  const { selectedDate, setSelectedDate } = props;

  return (
    <thead data-testid='month-header' className='h-10 w-full'>
      <tr className='w-full'>
        <th colSpan={2} className=''>
          <button
            value={'Previous Month'}
            className='rounded-full p-1 hover:bg-slate-100 hover:text-indigo-600'
            onClick={() =>
              setSelectedDate(selectedDate.minus({ month: 1 }).startOf('month'))
            }
            data-testid='previous-month-button'
          >
            <BsChevronLeft />
          </button>
        </th>
        <th colSpan={3}>
          <h1>{selectedDate.toFormat('LLLL y')}</h1>
        </th>
        <th colSpan={2}>
          <button
            className='rounded-full p-1 text-center hover:bg-slate-100 hover:text-indigo-600'
            value={'Next Month'}
            onClick={() =>
              setSelectedDate(selectedDate.plus({ month: 1 }).startOf('month'))
            }
            data-testid='next-month-button'
          >
            <BsChevronRight />
          </button>
        </th>
      </tr>
    </thead>
  );
}
