import { redirect } from 'next/navigation';
import prisma from '../client';
import { auth } from './auth';
import CalendarIndex, { UserWithEventsAndCallsWithEnsemble } from './calendar';
import LandingPage from './landingPage';

const getCalendar = async (
  userId: string
): Promise<UserWithEventsAndCallsWithEnsemble | null> => {
  return await prisma.user.findUnique({
    where: {
      id: userId,
    },
    include: {
      calls: {
        include: {
          event: {
            include: {
              ensemble: true,
            },
          },
        },
      },
      events: {
        include: {
          calls: true,
        },
      },
    },
  });
};

export default async function Page() {
  const session = await auth();
  const data = session && (await getCalendar(session.user.id));

  if (
    session &&
    (!data?.firstName || !data?.lastName || !data?.mobileNumber || !data.email)
  ) {
    redirect('/user/update');
  }

  return session ? <CalendarIndex data={data} /> : <LandingPage />;
}
