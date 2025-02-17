import prisma from '../../../../client';
import { auth } from '../../../auth';
import AuthWall from '../../../signin/auth';
import UpdateEnsembleForm from '../form';

const getEnsemble = async (ensembleId: string) => {
  return await prisma.ensemble.findUnique({
    where: {
      id: ensembleId,
    },
  });
};

export default async function UpdateEnsemble({
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
        <div>
          <UpdateEnsembleForm ensemble={data} />
        </div>
      )}
    </AuthWall>
  );
}
