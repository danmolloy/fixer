'use client';

import { signIn } from 'next-auth/react';

export default function SignInBtn(props: { classNames?: string }) {
  const { classNames } = props;
  return (
    <button
      className={classNames}
      data-testid='sign-in-btn'
      onClick={async () => await signIn('github', { redirectTo: '/' })}
    >
      Sign In
    </button>
  );
}
