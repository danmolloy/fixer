'use client';
import { Prisma } from '@prisma/client';
import { DateTime } from 'luxon';
import { useState } from 'react';
import CalendarHeader from './header';
import DayView from './views/dayView';
import MonthView from './views/monthView';
import YearView from './views/yearView';
import ViewAllUpcoming from './viewAll';

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
      orderBy: {
        startTime: 'asc';
      };
    };
    events: {
      include: {
        sections: {
          include: {
            contacts: true;
            ensembleSection: true;
          };
        };
        calls: {
          orderBy: {
            startTime: 'asc';
          };
        };
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

  const upcomingEventIDs = data.calls
    .filter(
      (i) =>
        DateTime.fromJSDate(new Date(i.endTime)) > DateTime.now().startOf('day')
    )
    .sort(
      (a, b) =>
        DateTime.fromJSDate(new Date(a.startTime)).toMillis() -
        DateTime.fromJSDate(new Date(b.startTime)).toMillis()
    )
    .map((i) => i.eventId);
  const uniqueIds = Array.from(new Set(upcomingEventIDs));
  const idOrder = new Map(uniqueIds.map((id, index) => [id, index]));
  const sortedEvents = data.events
    .filter((i) => idOrder.has(i.id))
    .sort((a, b) => (idOrder.get(a.id) ?? 0) - (idOrder.get(b.id) ?? 0));

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
      {selectedView === 'All Upcoming' ? (
        <ViewAllUpcoming events={sortedEvents} />
      ) : selectedView === 'Year' ? (
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
