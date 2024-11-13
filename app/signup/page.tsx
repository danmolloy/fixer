import { redirect } from 'next/navigation';
import { auth } from '../auth';
import GithubSignIn from '../signin/githubSignIn';
import SignUpBtn from '../signin/signUpBtn';
import { EmailSignIn } from '../signin/emailSignIn'; 
import Link from 'next/link';

export default async function SignIn() {
  const session = await auth();

  if (session) {
    redirect('/');
  }

  return (
    <div data-testid='sign-in-index' className='flex w-full flex-col justify-center items-center bg-slate-50 h-[80vh] -mb-16'>
        <h1 className='text-2xl font-semibold '>Sign up for free</h1>
      <div className='m-4 bg-white flex w-[90vw] flex-col items-center self-center rounded border-2 p-3 shadow-sm sm:w-2/3 md:w-1/2'>
        <div className='py-8'>
          <EmailSignIn />
        </div>
        <div className='flex flex-row items-center justify-evenly w-full'>
         <div className='border-b border-slate-300 w-20'/>
          <p className='mx-1 '>Or continue with</p>
          <div className='border-b border-slate-300  w-20'/>

        </div>
        <div className='py-8'>
          <GithubSignIn />
        </div>
      </div>
      <p>Already have an account? <Link href="/signin" className='text-blue-500 hover:underline'>Sign in</Link></p>

    </div>
  );
}