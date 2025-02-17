import { auth } from '../auth';
import SignIn from '../signin/page';
import prisma from '../../client';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import AuthWall from '../signin/auth';

const getEnsembles = async (userId: string) => {
  return await prisma.user.findUnique({
    where: {
      id: userId,
    },
    include: {
      admins: {
        include: {
          ensemble: true,
        },
      },
    },
  });
};

export default async function EnsemblesPage() {
  const session = await auth();
  const data = session && (await getEnsembles(session.user.id));

  if (
    session &&
    (!data?.firstName || !data?.lastName || !data?.mobileNumber || !data.email)
  ) {
    redirect('/user/update');
  }

  return (
    <AuthWall session={session}>
      <div data-testid='ensembles-page' className='p-2'>
        <h1>Your Ensembles</h1>
        <Link
          href='ensembles/create/'
          className='m-1 rounded bg-indigo-600 px-2 py-1 text-white hover:bg-indigo-500'
        >
          Create Ensemble
        </Link>
        <Link
          href='ensembles/join/'
          className='m-1 rounded bg-indigo-600 px-2 py-1 text-white hover:bg-indigo-500'
        >
          Join Ensemble
        </Link>
        {data ? (
          data.admins.map((i) => (
            <div
              key={i.ensemble.id}
              className='m-2 rounded border px-2 py-2 shadow-sm'
            >
              <div className='flex flex-col'>
                <h2 className=''>{i.ensemble.name}</h2>
                <Link
                  href={`ensembles/${i.ensemble.id}/`}
                  className='my-2 w-32 rounded border border-indigo-600 px-2 py-1 text-indigo-600 hover:bg-indigo-100'
                >
                  View Contacts
                </Link>
              </div>
              <Link href={`ensembles/update/${i.ensemble.id}`}>Edit</Link>
            </div>
          ))
        ) : (
          <p>No Ensembles</p>
        )}
      </div>
    </AuthWall>
  );
}
