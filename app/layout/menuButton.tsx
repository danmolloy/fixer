'use client';

import { useState } from 'react';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import FlyOutMenu from './flyoutMenu';
import { Session } from 'next-auth';

export type MenuButtonProps = {
  session: Session | null;
};

export default function MenuButton(props: MenuButtonProps) {
  const { session } = props;
  const [showMenu, setShowMenu] = useState<boolean>(false);
  return (
    <div data-testid='menu-button'>
      <button
        className='flex flex-row items-center md:hidden'
        onClick={() => setShowMenu(!showMenu)}
        data-testid='menu-icon-btn'
      >
        {showMenu ? (
          <AiOutlineClose
            className='mr-2 h-10 w-10 rounded-full p-2 text-black hover:bg-blue-50 active:bg-blue-100'
            data-testid='close-menu-icon'
          />
        ) : (
          <AiOutlineMenu
            className='mr-2 h-10 w-10 rounded-full p-2 text-black hover:bg-blue-50 active:bg-blue-100'
            data-testid='menu-icon'
          />
        )}
      </button>
      {showMenu && <FlyOutMenu session={session} />}
    </div>
  );
}
