import Link from "next/link";
import { useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";

export type FixingMenuProps = {
  pauseFixing: () => void;
  fixingActive: boolean;
  createSection: () => void;
  eventID: string;
}

export default function FixingMenu(props: FixingMenuProps) {
  const { pauseFixing, fixingActive, createSection, eventID } = props;
  const [showMenu, setShowMenu] = useState<boolean>(false);

  return (
    <div >
    <button
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
        data-testid='options-menu'
        className='absolute -ml-24 flex flex-col rounded border bg-white text-sm'
      >
        <button
          className='hover:text-blue-600 m-1 px-2 py-1 hover:bg-gray-50'
          onClick={() => createSection()}
        >
          Create section
        </button>
        <button
          disabled={!fixingActive}
          className='hover:text-blue-600 m-1 px-2 py-1 hover:bg-gray-50 disabled:opactiy-40 disabled:text-gray-300'
          onClick={() => pauseFixing()}
        >
          Pause Fixing
        </button>
        <Link 
          className="hover:text-blue-600 m-1 text-center px-2 py-1 hover:bg-gray-50"
          href={`/event/${eventID}/messages`}>Sent Messages</Link>
      </div>
    )}
  </div>
  )
}