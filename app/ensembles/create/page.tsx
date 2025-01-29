'use server';
import { auth } from '../../auth';
import AuthWall from '../../signin/auth';
import SignIn from '../../signin/page';
import CreateEnsembleForm from './form';

export default async function CreateEnsemble() {
  const session = await auth();

  return (
    <AuthWall session={session}>
      <CreateEnsembleForm userId={session!.user.id} />
    </AuthWall>
  );
}
