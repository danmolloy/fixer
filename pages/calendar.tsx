import Layout from "../components/layout/layout";
import EventsIndex from "../components/upcomingEvents/eventsIndex";

export default function CalendarPage() {
  return (
    <Layout pageTitle="Calendar">
      <EventsIndex />
    </Layout>
  )
}