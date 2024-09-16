import { auth } from '../../auth';
import SignIn from '../../signin/page';
import CreateEventForm from './form';

export default async function CreateEventPage() {
  const session = await auth();

  return session ? (
    <CreateEventForm
      adminEnsembleList={session.user.admins}
      userId={session.user.id}
      userName={session.user.name}
      createOrUpdate='Create'
    />
  ) : (
    <SignIn />
  );
}
