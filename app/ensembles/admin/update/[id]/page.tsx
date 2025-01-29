import prisma from '../../../../../client';
import { auth } from '../../../../auth';
import AuthWall from '../../../../signin/auth';
import SignIn from '../../../../signin/page';
import UpdateAdminForm from '../form';

const getAdmin = async (id: string) => {
  return await prisma.ensembleAdmin.findUnique({
    where: {
      id: id,
    },
  });
};

export default async function UpdateAdmin({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  const session = await auth();
  const data = session && (await getAdmin(id));

  return (
    <AuthWall session={session}>
    {!data ? 
    <p>No data</p>
   : 
    <UpdateAdminForm admin={data} />}
    </AuthWall>
  );
}
