import { redirect } from 'next/navigation';
import { auth } from '../auth';
import GithubSignIn from './githubSignIn';
import SignUpBtn from './signUpBtn';
import { EmailSignIn } from './emailSignIn';

export default async function SignIn() {
  const session = await auth();

  if (session) {
    redirect('/');
  }

  return (
    <div data-testid='sign-in-index' className='flex w-full flex-col'>
      <div className='m-4 mt-24 flex w-[90vw] flex-col items-center self-center rounded border-2 p-3 shadow-sm sm:w-2/3 md:w-1/2'>
        <h1 className='text-2xl font-semibold'>Sign in to your account</h1>
        <div className='py-8'>
          <EmailSignIn />
        </div>
        <div className='py-8'>
          <GithubSignIn />
        </div>
      </div>
    </div>
  );
}
