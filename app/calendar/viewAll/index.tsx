import { Call, ContactMessage, EnsembleSection, Event, EventSection } from "@prisma/client"
import Link from "next/link";
import EventOverview from "./event";

export type ViewAllUpcomingProps = {
  events: (Event & {
    calls: Call[]
    sections: (EventSection & {
          contacts: ContactMessage[]
          ensembleSection: EnsembleSection
        })[]
  })[];
}

export default function ViewAllUpcoming(props: ViewAllUpcomingProps) {
  const { events } = props;

  return (
    <div data-testid="upcoming-events">
      <h1>Upcoming Events</h1>
      {events.length === 0 
      ? <div>
        <h2>No upcoming events.</h2>
        <p>Get started by creating an event.</p>
        <Link href={"/event/create"}>Create Event</Link>
      </div>
      : <div>
        {events.map(i => (
          <EventOverview 
            key={i.id} 
            event={i} />
        ))}
        </div>}
    </div>
  )
}