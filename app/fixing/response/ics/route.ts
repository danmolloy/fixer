import {
  Call,
  ContactEventCall,
  ContactMessage,
  Event,
  EventSection,
} from '@prisma/client';
import { writeFileSync } from 'fs';
import { createEvents } from 'ics';
import { DateTime } from 'luxon';

const url = process.env.URL;

export async function POST(request: Request) {
  const req: ContactMessage & {
    eventCalls: (ContactEventCall & {
      call: Call;
    })[];
    eventSection: EventSection & {
      event: Event;
    };
  } = await request.json();

  const { error, value } = createEvents(
    req.eventCalls
      .filter((i) => i.status === 'ACCEPTED')
      .map((i) => ({
        start: DateTime.fromJSDate(new Date(i.call.startTime)).valueOf(),
        end: DateTime.fromJSDate(new Date(i.call.endTime)).valueOf(),
        location: i.call.venue,
        title: `${req.eventSection.event.ensembleName}: ${req.eventSection.event.eventTitle}`,
        status:
          req.eventSection.event.status === 'CONFIRMED'
            ? 'CONFIRMED'
            : 'TENTATIVE',
        url: `${url}/fixing/response/${req.token}`,
        busyStatus: 'BUSY',
      }))
  );

  if (error) {
    console.error(`Err!: ${error}`);
    return new Response(
      JSON.stringify({ error: 'Failed to create ICS', details: error }),
      { status: 500 }
    );
  }

  try {
    return new Response(value, {
      status: 202,
      headers: {
        'Content-Type': 'text/calendar',
        'Content-Disposition': 'attachment; filename="events.ics"',
      },
    });
  } catch (error) {
    console.error(`Err!: ${error}`);
    return new Response(
      JSON.stringify({ error: 'Failed to create ICS', details: error }),
      { status: 500 }
    );
  }
}
