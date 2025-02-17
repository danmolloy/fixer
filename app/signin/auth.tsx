import { Session } from 'next-auth';
import SignIn from './page';

export default function AuthWall({
  session,
  children,
}: {
  session: Session | null;
  children: React.ReactNode;
}) {
  if (!session) {
    return <SignIn />;
  }

  return <div>{children}</div>;
}

export const NoSession = () => {
  return <p>No session available, are you logged in?</p>;
};
