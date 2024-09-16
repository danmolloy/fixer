'use client';
import { Prisma } from '@prisma/client';
import { DateTime } from 'luxon';
import { useState } from 'react';
import CalendarHeader from './header';
import DayView from './views/dayView';
import MonthView from './views/monthView';
import YearView from './views/yearView';

export type UserWithEventsAndCallsWithEnsemble = Prisma.UserGetPayload<{
  include: {
    calls: {
      include: {
        event: {
          include: {
            ensemble: true;
          };
        };
      };
    };
    events: {
      include: {
        calls: true;
      };
    };
  };
}>;

export type CalendarIndexProps = {
  data: UserWithEventsAndCallsWithEnsemble | null;
};

export default function CalendarIndex(props: CalendarIndexProps) {
  const { data } = props;
  const [selectedDate, setSelectedDate] = useState<DateTime>(DateTime.now());
  const [selectedView, setSelectedView] = useState<string>('Day');

  if (!data) {
    return (
      <div data-testid='calendar-loading'>
        <h1>Calendar</h1>
        <p>Loading..</p>
      </div>
    );
  }

  return (
    <div
      data-testid='calendar-index'
      className='flex w-screen flex-col items-center'
    >
      <CalendarHeader
        selectedView={selectedView}
        setSelectedView={(arg) => setSelectedView(arg)}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />
      {selectedView === 'Year' ? (
        <YearView
          setSelectedView={(arg) => setSelectedView(arg)}
          selectedDate={selectedDate}
          eventCalls={data.calls}
          setSelectedDate={setSelectedDate}
        />
      ) : selectedView === 'Day' ? (
        <DayView
          selectedDate={selectedDate}
          eventCalls={data.calls}
          setSelectedDate={setSelectedDate}
        />
      ) : (
        <MonthView
          selectedDate={selectedDate}
          eventCalls={data.calls}
          setSelectedDate={setSelectedDate}
        />
      )}
    </div>
  );
}
