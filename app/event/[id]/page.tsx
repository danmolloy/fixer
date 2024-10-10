import prisma from '../../../client';
import { auth } from '../../auth';
import FixingIndex from '../../fixing';
import EventHeader from './eventHeader';
import EventInfo from './eventInfo';

export async function generateStaticParams() {
  const events = await prisma.event.findMany();
  return events.map((i) => ({
    id: String(i.id),
  }));
}

async function getData(id: string) {
  const event = await prisma.event.findUnique({
    where: {
      id: Number(id),
    },
    include: {
      fixer: true,
      calls: true,
      sections: {
        include: {
          contacts: {
            include: {
              contact: true,
              calls: true,
            },
            orderBy: {
              indexNumber: 'asc',
            },
          },
          ensembleSection: {
            include: {
              contacts: true,
            },
          },
        },
      },
      ensemble: {
        include: {
          sections: true,
        },
      },
    },
  });

  if (event === null) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data');
  }

  return event;
}

export default async function EventDetail({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  const data = await getData(id);
  const session = await auth();

  return (
    <div className='flex w-full flex-col p-2 sm:p-4 lg:px-24'>
      <table>
        <EventHeader event={data} contacts={data.sections.map(i => i.contacts).flat(1)} />
        <EventInfo event={data} calls={data.calls} ensemble={data.ensemble} />
      </table>
      {session?.user.id === data.fixerId && (
        <FixingIndex
          ensembleSections={data.ensemble.sections}
          eventCalls={data.calls}
          eventSections={data.sections}
          eventId={data.id}
        />
      )}
    </div>
  );
}
