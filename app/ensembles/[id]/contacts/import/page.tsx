import prisma from '../../../../../client';
import { auth } from '../../../../auth';
import SignIn from '../../../../signin/page';
import ImportForm from './form';

const environment = process.env.ENVIRONMENT;

const getEnsemble = async (ensembleId: string) => {
  return await prisma.ensemble.findUnique({
    where: {
      id: ensembleId,
    },
    include: {
      sections: true,
    },
  });
};

export default async function ImportContacts({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const ensembleId = (await params).id;

  const session = await auth();
  const data = ensembleId && (await getEnsemble(ensembleId));

  return !session ? (
    <SignIn />
  ) : !data ? (
    <p>No data</p>
  ) : (
    <ImportForm environment={environment} ensemble={data} />
  );
}
