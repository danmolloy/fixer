import { useState } from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';

export type SectionMenuProps = {
  addToList: () => void;
  editSection: () => void;
};

export default function SectionMenu(props: SectionMenuProps) {
  const { editSection, addToList } = props;
  const [showMenu, setShowMenu] = useState<boolean>(false);

  return (
    <div data-testid="section-menu">
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
          data-testid='options-div'
          className='absolute -ml-24 flex flex-col rounded border bg-white text-sm'
        >
          <button
            className='m-1 px-2 py-1 hover:bg-gray-50 hover:text-blue-600'
            onClick={() => editSection()}
          >
            Edit Section
          </button>

          <button
            className='disabled:opactiy-40 m-1 px-2 py-1 hover:bg-gray-50 hover:text-blue-600 disabled:text-gray-300'
            onClick={() => addToList()}
          >
            Add to List
          </button>
        </div>
      )}
    </div>
  );
}
