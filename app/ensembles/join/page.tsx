import { auth } from '../../auth';
import AuthWall from '../../signin/auth';
import SignIn from '../../signin/page';
import JoinEnsembleForm from './form';

export default async function JoinEnsemblePage() {
  const session = await auth();

  return (
    <AuthWall session={session}>
      <JoinEnsembleForm userId={session!.user.id} />
    </AuthWall>
  );
}
