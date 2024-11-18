import prisma from '../../../../client';
import { auth } from '../../../auth';
import SignIn from '../../../signin/page';
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
  params: { id: string };
}) {
  const { id } = await params;
  const session = await auth();
  const ensembleId = session?.user.admins.find(
    (i) => i.ensembleId === id
  )?.ensembleId;
  const data = ensembleId && (await getEnsemble(ensembleId));

  return !session ? (
    <SignIn />
  ) : !data ? (
    <p>No data</p>
  ) : (
    <div>
      <UpdateEnsembleForm ensemble={data} />
    </div>
  );
}
