import prisma from '../../../../../client';
import { auth } from '../../../../auth';
import SignIn from '../../../../signin/page';
import UpdateSectionForm from '../../edit';

const getSection = async (id: string) => {
  return await prisma.ensembleSection.findUnique({
    where: {
      id: id,
    },
    include: {
      contacts: true,
    },
  });
};

export default async function EditSection({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  const session = await auth();
  const data = id && (await getSection(id));

  return !session ? (
    <SignIn />
  ) : !data ? (
    <p>No data</p>
  ) : (
    <UpdateSectionForm section={data} />
  );
}
