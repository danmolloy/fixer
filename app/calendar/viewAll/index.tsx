import {
  Call,
  ContactMessage,
  EnsembleSection,
  Event,
  EventSection,
  Orchestration,
} from '@prisma/client';
import Link from 'next/link';
import EventOverview from './event';

export type ViewAllUpcomingProps = {
  events: (Event & {
    calls: Call[];
    sections: (EventSection & {
      contacts: (ContactMessage & {
        eventCalls: {
          call: Call;
        }
      })[];
      ensembleSection: EnsembleSection;
      orchestration: Orchestration[];
    })[];
  })[];
};

export default function ViewAllUpcoming(props: ViewAllUpcomingProps) {
  const { events } = props;

  return (
    <div data-testid='upcoming-events' className='flex w-full flex-col p-2'>
      <h1>Upcoming Events</h1>
      {events.length === 0 ? (
        <div className='flex flex-col self-center'>
          <h2>No upcoming events.</h2>
          <p className='text-sm'>Get started by creating an event.</p>
          <Link
            className='mt-4 self-center rounded bg-blue-600 p-1 text-sm text-white hover:bg-blue-500'
            href={'/event/create'}
          >
            Create Event
          </Link>
        </div>
      ) : (
        <div>
          {events.map((i) => (
            <EventOverview key={i.id} event={i} />
          ))}
        </div>
      )}
    </div>
  );
}
