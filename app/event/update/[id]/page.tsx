import prisma from '../../../../client';
import { auth } from '../../../auth';
import AuthWall from '../../../signin/auth';
import SignIn from '../../../signin/page';
import CreateEventForm from '../../create/form';

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
      calls: true,
      ensemble: {
        include: {
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

export default async function UpdateEvent({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  const data = await getData(id);
  const session = await auth();

  return (
    <AuthWall session={session}>
      <CreateEventForm
        ensembleList={[data.ensemble]}
        userId={session!.user.id}
        userName={session!.user.name}
        initialValues={data}
        createOrUpdate='Update'
      />
    </AuthWall>
  );
}
