import prisma from '../../../client';
import { auth } from '../../auth';
import AuthWall from '../../signin/auth';
import EventInfoTable from './eventIndex';

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
          orchestration: true,
          contacts: {
            include: {
              eventCalls: {
                include: {
                  call: true,
                },
              },
              contact: true,
              //calls: true,
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
          admin: {
            include: {
              user: true,
            },
          },
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
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  const data = await getData(id);
  const session = await auth();

  if (
    session &&
    session.user.admins.filter((i) => i.ensembleId === data.ensembleId).length <
      1
  ) {
    <div>Access Denied</div>;
  }

  return (
    <AuthWall session={session}>
      <div className='flex w-full flex-col p-2 sm:p-4 lg:px-24'>
        <EventInfoTable
          sections={data.sections}
          event={data}
          calls={data.calls}
          ensemble={data.ensemble}
          contacts={data.sections.map((i) => i.contacts).flat(1)}
        />
      </div>
    </AuthWall>
  );
}
