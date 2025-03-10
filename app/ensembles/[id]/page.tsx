import { auth } from '../../auth';
import SignIn from '../../signin/page';
import prisma from '../../../client';
import EnsembleIndex from '..';
import AuthWall from '../../signin/auth';

export async function generateStaticParams() {
  const ensembles = await prisma.ensemble.findMany();
  return ensembles.map((i) => ({
    id: String(i.id),
  }));
}

const getEnsemble = async (ensembleId: string) => {
  return await prisma.ensemble.findUnique({
    where: {
      id: ensembleId,
    },
    include: {
      admin: {
        include: {
          user: true,
        },
      },
      contacts: {
        include: {
          section: true,
        },
        where: {
          status: 'OK',
        },
      },
      sections: {
        include: {
          contacts: {
            where: {
              status: 'OK',
            },
          },
        },
      },
    },
  });
};

export default async function EnsembleDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  const session = await auth();
  const ensembleId = session?.user.admins.find(
    (i) => i.ensembleId === id
  )?.ensembleId;
  const data = ensembleId && (await getEnsemble(ensembleId));

  return (
    <AuthWall session={session}>
      {!data ? (
        <p>No data</p>
      ) : (
        <EnsembleIndex
          admins={data.admin}
          contacts={data.contacts.filter((i) => i.status !== 'ARCHIVED')}
          sections={data.sections}
          ensemble={data}
        />
      )}
    </AuthWall>
  );
}
