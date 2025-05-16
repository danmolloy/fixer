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

export default async function EventDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  const session = await auth();


  return (
    <AuthWall session={session}>
      <div className='flex w-full flex-col p-2 sm:p-4 lg:px-24'>
        <EventInfoTable
        eventID={id}
        session={session}
          
        />
      </div>
    </AuthWall>
  );
}
