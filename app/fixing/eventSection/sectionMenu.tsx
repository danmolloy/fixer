import Link from "next/link";
import { useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";

export type SectionMenuProps = {

  addToList: () => void;
  editSection: () => void;
}

export default function SectionMenu(props: SectionMenuProps) {
  const { editSection, addToList,  } = props;
  const [showMenu, setShowMenu] = useState<boolean>(false);

  return (
    <div>
    <button
    className="border rounded p-1 hover:bg-slate-50"
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
          onClick={() => editSection()}
        >
          Edit section
        </button>
        
        <button
          className='hover:text-blue-600 m-1 px-2 py-1 hover:bg-gray-50 disabled:opactiy-40 disabled:text-gray-300'
          onClick={() => addToList()}
        >
          Add to List
        </button>
      </div>
    )}
  </div>
  )
}