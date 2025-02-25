import { DateTime } from 'luxon';
import WeekDayPicker from '../weekDayPicker';
import CallList from '../callList/index';
import { Prisma } from '@prisma/client';
import DatePicker from './datePicker';

export type CallWithEventWithEnsemble = Prisma.CallGetPayload<{
  include: {
    event: {
      include: {
        ensemble: true;
      };
    };
  };
}>;

export type DayViewProps = {
  selectedDate: DateTime;
  eventCalls: CallWithEventWithEnsemble[];
  setSelectedDate: (arg: DateTime) => void;
};

export default function DayView(props: DayViewProps) {
  const { selectedDate, setSelectedDate, eventCalls } = props;

  return (
    <div
      data-testid='day-view'
      className='flex flex-col justify-center md:flex-row md:py-4'
    >
      <div className='md:hidden'>
        <WeekDayPicker
          selectedDate={selectedDate}
          eventCalls={eventCalls}
          setSelectedDate={setSelectedDate}
        />
      </div>
      <CallList eventCalls={eventCalls} selectedDate={selectedDate} />
      <div className='hidden md:flex'>
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
    </div>
  );
}
