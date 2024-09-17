import { redirect } from 'next/navigation';
import { auth } from '../auth';
import GithubSignIn from './githubSignIn';
import SignUpBtn from './signUpBtn';


export default async function SignIn() {
  const session = await auth();

  if (session) {
    redirect('/');
  }

  return (
    <div data-testid='sign-in-index' className='flex flex-col w-full '>
      <div className='flex flex-col items-center self-center m-4 mt-24 p-3 border-2 rounded shadow-sm w-[90vw] sm:w-2/3 md:w-1/2'>
      <h1 className='text-2xl font-semibold'>Sign in to your account</h1>
      <div className='py-8'>
        <GithubSignIn />
    </div>
    <div className='flex flex-row my-4'>
      <p>Need an account?</p> 
      <SignUpBtn />
    </div>
    </div>
    </div>
  );
}
