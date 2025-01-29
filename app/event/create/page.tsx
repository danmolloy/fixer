import prisma from '../../../client';
import { auth } from '../../auth';
import AuthWall from '../../signin/auth';
import SignIn from '../../signin/page';
import CreateEventForm from './form';

const getEnsembles = async (userId: string) => {
  const ensembles = await prisma.ensembleAdmin.findMany({
    where: {
      userId: userId,
    },
    include: {
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
  return ensembles.map((i) => i.ensemble);
};

export default async function CreateEventPage() {
  const session = await auth();
  const UserEnsembleList = session && (await getEnsembles(session.user.id));

  if (!UserEnsembleList) {
    return <div>Error</div>;
  }

  return (
    <AuthWall session={session}>
    <CreateEventForm
      ensembleList={UserEnsembleList}
      userId={session.user.id}
      userName={session.user.name}
      createOrUpdate='Create'
    />
    </AuthWall>
  );
}
