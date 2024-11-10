import { signIn } from '../auth';

export function EmailSignIn() {
  return (
    <form
      action={async (formData) => {
        'use server';
        await signIn('sendgrid', formData);
      }}
    >
      <input type='text' name='email' placeholder='Email' />
      <button type='submit'>Signin with Sendgrid</button>
    </form>
  );
}
