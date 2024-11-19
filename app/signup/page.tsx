import { redirect } from 'next/navigation';
import { auth } from '../auth';
import GithubSignIn from '../signin/githubSignIn';
import { EmailSignIn } from '../signin/emailSignIn';
import Link from 'next/link';

export default async function SignIn() {
  const session = await auth();

  if (session) {
    redirect('/');
  }

  return (
    <div
      data-testid='sign-in-index'
      className='-mb-16 flex h-[80vh] w-full flex-col items-center justify-center bg-slate-50'
    >
      <h1 className='text-2xl font-semibold'>Sign up for free</h1>
      <div className='m-4 flex w-[90vw] flex-col items-center self-center rounded border-2 bg-white p-3 shadow-sm sm:w-2/3 md:w-1/2'>
        <div className='py-8'>
          <EmailSignIn />
        </div>
        <div className='flex w-full flex-row items-center justify-evenly'>
          <div className='w-20 border-b border-slate-300' />
          <p className='mx-1'>Or continue with</p>
          <div className='w-20 border-b border-slate-300' />
        </div>
        <div className='py-8'>
          <GithubSignIn />
        </div>
      </div>
      <p>
        Already have an account?{' '}
        <Link href='/signin' className='text-blue-500 hover:underline'>
          Sign in
        </Link>
      </p>
    </div>
  );
}
