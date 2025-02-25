import { DateTime } from 'luxon';
import { CallWithEventWithEnsemble } from './dayView';
import CallList from '../callList/index';
import MonthCalendar from './month';
import DatePicker from './datePicker';

export type MonthViewProps = {
  selectedDate: DateTime;
  eventCalls: CallWithEventWithEnsemble[];
  setSelectedDate: (arg: DateTime) => void;
};

export default function MonthView(props: MonthViewProps) {
  const { selectedDate, setSelectedDate, eventCalls } = props;

  return (
    <div data-testid='month-view'>
      <div className='hidden p-4 md:flex'>
        <MonthCalendar
          selectedDate={selectedDate.toJSDate()}
          events={eventCalls.map((i) => ({
            title: i.event.ensembleName,
            startTime: i.startTime,
            id: String(i.id),
          }))}
          setSelectedDate={(arg) => setSelectedDate(DateTime.fromJSDate(arg))}
        />
      </div>
      <div className='md:hidden'>
        <DatePicker
          selectedDate={selectedDate.toJSDate()}
          events={eventCalls.map((i) => ({
            title: i.event.ensemble.name,
            startTime: i.startTime,
            id: String(i.id),
          }))}
          setSelectedDate={(arg) => setSelectedDate(DateTime.fromJSDate(arg))}
        />
      </div>
      <CallList eventCalls={eventCalls} selectedDate={selectedDate} />
    </div>
  );
}
