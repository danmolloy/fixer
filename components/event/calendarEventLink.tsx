import { Call } from "@prisma/client";
import { EventWithCalls } from "../upcomingEvents/eventsIndex";

export type CalendarEventLinkProps = {
  data: EventWithCalls
}

export default function CalendarEventLink(props: CalendarEventLinkProps) {
  const { data } = props;

  const createICSEvent = (call: Call) => {
    const ical = `
    BEGIN:VCALENDAR
    VERSION:2.0
    PRODID:-//GigFix//Event Calendar//EN
    BEGIN:VEVENT
    DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '')}Z
    DTSTART:${new Date(call.startTime).toISOString().replace(/[-:]/g, '')}Z
    DTEND:${new Date(call.endTime).toISOString().replace(/[-:]/g, '')}Z
    SUMMARY:${data.eventTitle}
    LOCATION:${call.venue}
    DESCRIPTION:${data.ensembleName}
    END:VEVENT
    END:VCALENDAR
    `;
    return ical
  }

  const downloadICS = () => {
    let icalArr = [];

    for (let i = 0; i < data.calls.length; i++) {
      icalArr = [...icalArr, createICSEvent(data.calls[i])]
    }

    const blob = new Blob(icalArr, { type: 'text/calendar' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `event-${data.id}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  return (
   <button onClick={() => downloadICS()} className="cursor-pointer w-full text-start" data-testid={"msg-all-btn"}>
    <div className="w-full hover:bg-slate-100 py-4 pl-4 font-light" >
      Export to Calendar
    </div>
  </button>
  )
} 