import prisma from '../../../../client';
import { auth } from '../../../auth';
import AuthWall from '../../../signin/auth';
import MessagesHeader from './header';
import SentEmailList from './sentList';

async function getData(eventId: number) {
  const emails = await prisma.event.findUnique({
    where: {
      id: eventId,
    },
    include: {
      sentEmails: true,
      calls: true,
    },
  });

  if (emails === null) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data');
  }

  return emails;
}

export default async function EventMail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  const data = await getData(Number(id));
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
        <MessagesHeader event={data} />
        <SentEmailList emails={data.sentEmails} />
      </div>
    </AuthWall>
  );
}
