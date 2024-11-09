import { signOut } from '../auth';

export default function SignOutBtn(props: { classNames?: string }) {
  const { classNames } = props;
  return (
    <form
      action={async () => {
        'use server';
        await signOut({ redirectTo: '/' });
      }}
    >
      <button className={classNames} type='submit'>
        Sign Out
      </button>
    </form>
  );
}
