import { Field } from 'formik';
import Link from 'next/link';
import { useState } from 'react';
import { IoCaretDown } from 'react-icons/io5';

export type EnsembleDashboardProps = {
  addContact: () => void;
  sortContacts: string;
  setSortContacts: (arg: string) => void;
  filterContacts: string[];
  setFilterContacts: (arg: 'Member' | 'Extra') => void;
  ensembleId: string;
};

export const buttonPrimary =
  'py-1 px-2 mx-4 rounded text-sm flex flex-row items-center hover:bg-gray-50 text-black border';

export default function EnsembleDashboard(props: EnsembleDashboardProps) {
  const {
    ensembleId,
    addContact,
    sortContacts,
    setSortContacts,
    filterContacts,
    setFilterContacts,
  } = props;
  const [showFilters, setShowFilters] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  return (
    <div
      data-testid='ensemble-dashboard'
      className='m-1 flex flex-row items-center justify-between'
    >
      <div className='w-32'>
        <button
          className={buttonPrimary}
          onBlur={() => setTimeout(() => setShowOptions(false), 250)}
          onClick={() => {
            focus();
            setShowOptions(!showOptions);
          }}
        >
          <p>Options</p>
          <IoCaretDown />
        </button>
        {showOptions && (
          <div
            data-testid='options-menu'
            className='absolute mr-2 mt-1 flex flex-col rounded border bg-white text-sm'
          >
            <Link
              className='m-1 p-2 text-start hover:bg-gray-50'
              href={`/ensembles/${ensembleId}/contacts/import`}
            >
              Create Contacts
            </Link>
            <Link
              className='m-1 p-2 text-start hover:bg-gray-50'
              href={`/ensembles/${ensembleId}/admin/invite`}
            >
              Invite Admin
            </Link>
            <Link
              className='m-1 p-2 text-start hover:bg-gray-50'
              href={`ensembles/update/${ensembleId}`}
            >
              Edit Ensemble
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
