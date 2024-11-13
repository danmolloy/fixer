import { signIn } from '../auth';

export function EmailSignIn() {
  return (
    <form
      action={async (formData: FormData & {
        email: string
      }) => {
        'use server';
        formData.email !== undefined && await signIn('sendgrid', formData);
      }}
      className='flex flex-col w-full '
    >

      <input  type='email' name='email' placeholder='example@company.com' className='border p-2 my-1 rounded w-72 text-sm' />
      <button type='submit' className='bg-blue-600 hover:bg-blue-500 my-2  text-white p-2 rounded text-sm'>Sign in</button>
    </form>
  );
}
