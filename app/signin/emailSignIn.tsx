import { signIn } from '../auth';

export function EmailSignIn() {
  return (
    <form
      action={async (
        formData: FormData & {
          email: string;
        }
      ) => {
        'use server';
        await signIn('sendgrid', formData);
      }}
      className='flex w-full flex-col'
    >
      <input
        type='email'
        name='email'
        placeholder='example@company.com'
        className='my-1 w-72 rounded border p-2 text-sm'
      />
      <button
        type='submit'
        className='my-2 rounded bg-blue-600 p-2 text-sm text-white hover:bg-blue-500'
      >
        Sign in
      </button>
    </form>
  );
}
