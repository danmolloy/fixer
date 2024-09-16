'use server';
import { auth } from '../../auth';
import SignIn from '../../signin/page';
import CreateEnsembleForm from './form';

export default async function CreateEnsemble() {
  const session = await auth();

  return !session ? (
    <SignIn />
  ) : (
    <CreateEnsembleForm userId={session.user.id} />
  );
}
