import Link from 'next/link';
import { useState } from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';

export type FixingMenuProps = {
  pauseFixing: () => void;
  fixingActive: boolean;
  createSection: () => void;
  eventID: string;
};

export default function FixingMenu(props: FixingMenuProps) {
  const { pauseFixing, fixingActive, createSection, eventID } = props;
  const [showMenu, setShowMenu] = useState<boolean>(false);

  return (
    <div data-testid="fixing-menu">
      <button
        data-testid="options-btn"
        className='rounded border p-1 hover:bg-slate-50'
        onClick={() => {
          focus();
          setShowMenu(!showMenu);
        }}
        onBlur={() => setTimeout(() => setShowMenu(false), 250)}
      >
        <BsThreeDotsVertical />
        <p className='hidden'>Options</p>
      </button>
      {showMenu && (
        <div
          data-testid='fixing-menu-options'
          className='absolute -ml-24 flex flex-col rounded border bg-white text-sm'
        >
          <button
            className='m-1 px-2 py-1 hover:bg-gray-50 hover:text-blue-600'
            onClick={() => createSection()}
          >
            Create Section
          </button>
          <button
            disabled={!fixingActive}
            className='disabled:opactiy-40 m-1 px-2 py-1 hover:bg-gray-50 hover:text-blue-600 disabled:text-gray-300'
            onClick={() => pauseFixing()}
          >
            Pause Fixing
          </button>
          <Link
            className='m-1 px-2 py-1 text-center hover:bg-gray-50 hover:text-blue-600'
            href={`/event/${eventID}/messages`}
          >
            Sent Messages
          </Link>
        </div>
      )}
    </div>
  );
}
