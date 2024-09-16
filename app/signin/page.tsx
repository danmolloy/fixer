import { redirect } from 'next/navigation';
import { auth, signIn } from '../auth';
import SignInBtn from '../layout/signInBtn';

export default async function SignIn() {
  const session = await auth();

  if (session) {
    redirect('/');
  }

  return (
    <div data-testid='sign-in-index'>
      <h1 className='text-xl'>Sign in to your account</h1>
      <SignInBtn />
    </div>
  );
}
