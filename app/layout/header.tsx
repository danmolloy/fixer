import Link from 'next/link';
import { signIn, signOut } from '../auth';
import { Session } from 'next-auth';
import MenuButton from './menuButton';
import { externalMenuLinks, sessionMenuLinks } from './menuLinks';
import SignOutBtn from './signOutBtn';
import EnsemblesMenu from '../ensembles/menu';
import { useState } from 'react';

export type HeaderProps = {
  session: Session | null;
};

export default function Header(props: HeaderProps) {
  const { session } = props;

  let menuLinks = session ? sessionMenuLinks : externalMenuLinks;

  return (
    <div
      data-testid='header'
      className={`${'h-14'} fixed top-0 z-30 flex w-screen flex-row items-center justify-between shadow backdrop-blur transition-all`}
    >
      <Link data-testid='gigfix-link' className='' href='/'>
        <h2
          className={`${'text-2xl'} mx-2 p-2 font-display font-light md:mx-10`}
        >
          Gig<span className='font-semibold text-blue-500'>Fix</span>
        </h2>
      </Link>
      <div
        className='mr-2 hidden w-full flex-row justify-end md:flex'
        data-testid='nav-bar'
      >
        {session && <EnsemblesMenu ensemblesAdmins={session.user.admins} />}
        {menuLinks.map((i) => (
          <Link
            href={i.link}
            key={i.id}
            data-testid={i.id}
            className='mx-4 flex flex-row items-center rounded p-1 text-sm hover:text-gray-600'
          >
            {i.name}
          </Link>
        ))}
        {session ? (
          <SignOutBtn classNames='py-1 px-2 mx-4 rounded text-sm flex flex-row items-center hover:bg-gray-50 text-black border ' />
        ) : (
          <Link
            className='mx-4 flex flex-row items-center rounded bg-blue-600 px-2 py-1 text-sm text-white hover:bg-blue-700'
            href='/signin'
          >
            Sign In
          </Link>
        )}
      </div>

      <MenuButton session={session} />
    </div>
  );
}
