'use client';
import { signOut } from 'next-auth/react';

export default function SignOutBtn(props: { classNames?: string }) {
  const { classNames } = props;
  return (
    <button
      data-testid='sign-out-btn'
      className={classNames}
      onClick={() => signOut()}
    >
      Sign Out
    </button>
  );
}
