import { DateTime } from 'luxon';
import ViewSelect from './viewSelect';

export type CalendarHeaderProps = {
  selectedDate: DateTime;
  setSelectedDate: (arg: DateTime) => void;
  selectedView: string;
  setSelectedView: (arg: string) => void;
};

export default function CalendarHeader(props: CalendarHeaderProps) {
  const { selectedDate, setSelectedDate, selectedView, setSelectedView } =
    props;

  const handleSelectToday = () => {
    if (selectedView === 'Year') {
      setSelectedView('Month');
    }
    setSelectedDate(DateTime.now());
  };

  return (
    <div
      data-testid='calendar-header'
      className='flex w-screen flex-row justify-between bg-gray-100'
    >
      <div
        data-testid='selected-date'
        className='m-2 flex flex-col justify-center text-sm'
      >
        <p className='font-bold'>
          {selectedView === 'Year'
            ? selectedDate.toFormat('yyyy')
            : selectedDate.toFormat('LLL dd, yyyy')}
        </p>
        {selectedView !== 'Year' && (
          <p className='text-gray-400'>{selectedDate.toFormat('LLL dd, yyyy')}</p>
        )}
      </div>
      <div></div>
      <div className='m-2 flex flex-row items-center text-sm'>
        <ViewSelect
          selectedView={selectedView}
          setSelectedView={(arg) => setSelectedView(arg)}
        />
        <button
          className='m-2 rounded bg-indigo-600 px-2 py-1 text-white shadow hover:bg-indigo-500'
          data-testid='today-btn'
          onClick={() => handleSelectToday()}
        >
          Go to Today
        </button>
      </div>
    </div>
  );
}
