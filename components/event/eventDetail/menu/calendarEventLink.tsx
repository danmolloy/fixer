import { Call, Prisma } from "@prisma/client";
import { createEvents } from 'ics';

export type EventWithCalls = Prisma.EventGetPayload<{
  include: {
    calls: true
  }
}>

export type CalendarEventLinkProps = {
  data: EventWithCalls
}

export const getDateArr = (date: Date) => {
  const year = date.getUTCFullYear();
  const month = date.getUTCMonth(); // Months are zero-based (0 = January, 1 = February, ...)
  const day = date.getUTCDate();
  const hour = date.getUTCHours();
  const minute = date.getUTCMinutes();
  return [year, month, day, hour, minute];
}

export const createICSEvent = (call: Call, data: EventWithCalls) => {
  const ical = {
    start: getDateArr(new Date(call.startTime)),
    end: getDateArr(new Date(call.endTime)),
    title: data.eventTitle,
    description: `${data.ensembleName} (${data.confirmedOrOnHold})`,
    location: call.venue,
    //organiser: {name: data.fixerName}
  }
  return ical
}

export const downloadICS = async(data: EventWithCalls) => {
  let icalArr = [];

  for (let i = 0; i < data.calls.length; i++) {
    icalArr.push(createICSEvent(data.calls[i], data));
  }

  const filename = `Event-${data.id}.ics`
  const file: any = await new Promise((resolve, reject) => {
    createEvents(icalArr, (error, value) => {
      if (error) {
        reject(error)
      }

      resolve(new File([value], filename, { type: 'text/calendar' }))
    })
  })
  const url = URL.createObjectURL(file);

  // trying to assign the file URL to a window could cause cross-site
  // issues so this is a workaround using HTML5
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = filename;

  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
  URL.revokeObjectURL(url);
}

export default function CalendarEventLink(props: CalendarEventLinkProps) {
  const { data } = props;


  return (
   <button onClick={() => downloadICS(data)} className="cursor-pointer w-full text-start" data-testid={"calendar-link"}>
    <p className="w-full hover:bg-slate-100 py-4 pl-4 font-light" >
      Export to Calendar
    </p>
  </button>
  )
} 