'use client';
import { signIn, signOut } from 'next-auth/react';
import Link from 'next/link';
import { IoEnterOutline, IoExitOutline } from 'react-icons/io5';
import { Session } from 'next-auth';
import { externalMenuLinks, sessionMenuLinks } from './menuLinks';
import { MdGroups } from 'react-icons/md';

export type ExternalMenuProps = {
  session: Session | null;
};

export default function FlyOutMenu(props: ExternalMenuProps) {
  const { session } = props;

  let menuLinks = session ? sessionMenuLinks : externalMenuLinks;

  return (
    <div
      data-testid='external-menu'
      className='absolute right-0 top-0 z-10 mt-14 w-1/2 border bg-white shadow md:hidden'
    >
      {session && (
        <div className='flex flex-col'>
          <div className='flex w-full flex-row items-center p-2'>
            <MdGroups />
            <p className='px-2 py-1 text-black' data-testid='ensembles-btn'>
              Ensembles
            </p>
          </div>
          <div className='mx-2 flex flex-col' data-testid='ensembles-menu'>
            {session.user.admins.length > 0 ? (
              session.user.admins.map((i) => (
                <Link
                  key={i.id}
                  href={`ensembles/${i.ensemble.id}/`}
                  className='px-6 py-1 text-start hover:bg-gray-50'
                >
                  {i.ensemble.name}
                </Link>
              ))
            ) : (
              <p>No Ensembles</p>
            )}
            <Link
              href='ensembles/join/'
              className='px-6 py-1 text-start hover:bg-gray-50'
            >
              Join Ensemble
            </Link>
            <Link
              href='ensembles/create/'
              className='px-6 py-1 text-start hover:bg-gray-50'
            >
              Create Ensemble
            </Link>
          </div>
        </div>
      )}
      {menuLinks.map((i) => (
        <Link
          data-testid={i.id}
          href={i.link}
          key={i.id}
          className='flex w-full flex-row items-center p-2 hover:bg-gray-50 hover:text-blue-600'
        >
          <div data-testid={`${i.name}-icon`}>{i.icon}</div>
          <p className='px-2 py-1 text-black'>{i.name}</p>
        </Link>
      ))}

      {session ? (
        <button
          data-testid='sign-out-btn'
          onClick={() => signOut()}
          className='flex w-full flex-row items-center px-2 py-1 hover:bg-gray-50 hover:text-indigo-600'
        >
          <div>
            <IoExitOutline />
          </div>
          <p className='px-2 py-1 text-black'>Sign out</p>
        </button>
      ) : (
        <Link
          data-testid='sign-in-btn'
          href="/signin"
          className='flex w-full flex-row items-center px-2 py-1 hover:bg-gray-50 hover:text-blue-600'
        >
          <div>
            <IoEnterOutline />
          </div>
          <p className='px-2 py-1 text-black'>Sign in</p>
        </Link>
      )}
    </div>
  );
}
