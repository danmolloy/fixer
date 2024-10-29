'use client';
import { signOut } from "../auth"; 

export default function SignOutBtn(props: { classNames?: string }) {
  const { classNames } = props;
  return (
    <button
      className={classNames}
      data-testid='sign-out-btn'
      onClick={() => signOut()}
    >
      Sign out
    </button>
  );
}
