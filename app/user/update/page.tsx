'use server';
import { auth } from '../../auth';
import AuthWall from '../../signin/auth';
import UpdateUserForm from './form';

export default async function UpdateUserPage() {
  const session = await auth();

  return (
    <AuthWall session={session}>
      <UpdateUserForm session={session!} />
    </AuthWall>
  );
}
