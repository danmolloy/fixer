import { auth } from '../../../../auth';
import SignIn from '../../../../signin/page';
import InviteAdminForm from './form';

export default async function InviteAdmin({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  const session = await auth();

  return !session ? (
    <SignIn />
  ) : (
    <InviteAdminForm
      userName={`${session.user.firstName} ${session.user.lastName}`}
      ensembleId={id}
    />
  );
}
