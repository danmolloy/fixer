import { Field } from 'formik';
import Link from 'next/link';
import { useState } from 'react';

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
      <select
        data-testid='contact-sort-select'
        className='rounded border p-1 text-sm'
        onChange={(e) => setSortContacts(e.target.value)}
        value={sortContacts}
      >
        <option value={'Alphabetical'} data-testid='alphabetical-option'>
          Alphabetical
        </option>
        <option value={'Sections'} data-testid='sections-option'>
          Sections
        </option>
      </select>
      <div className=''>
        <button
          className={buttonPrimary}
          onBlur={() => setTimeout(() => setShowFilters(false), 250)}
          onClick={() => {
            focus();
            setShowFilters(!showFilters);
          }}
        >
          Filters
        </button>
        {showFilters && (
          <div
            data-testid='filters-menu'
            className='absolute flex flex-col rounded border bg-white p-1 text-sm'
          >
            <label>
              <input
                className='m-1'
                type='checkbox'
                data-testid='member-filter'
                onChange={() => setFilterContacts('Member')}
                checked={filterContacts.includes('Member')}
              />
              Members
            </label>
            <label>
              <input
                className='m-1'
                data-testid='extra-filter'
                onChange={() => setFilterContacts('Extra')}
                checked={filterContacts.includes('Extra')}
                type='checkbox'
              />
              Extras
            </label>
          </div>
        )}
      </div>
      <div className='w-32'>
        <button
          className={buttonPrimary}
          onBlur={() => setTimeout(() => setShowOptions(false), 250)}
          onClick={() => {
            focus();
            setShowOptions(!showOptions);
          }}
        >
          Options
        </button>
        {showOptions && (
          <div
            data-testid='options-menu'
            className='absolute mr-2 flex flex-col rounded border bg-white text-sm'
          >
            <button
              className='px-2 py-1 text-start hover:bg-gray-50'
              onClick={() => addContact()}
              data-testid='add-contact-btn'
            >
              Create Contact
            </button>
            <Link
              className='px-2 py-1 text-start hover:bg-gray-50'
              href={`/ensembles/${ensembleId}/contacts/import`}
            >
              Import Contacts
            </Link>
            <Link
              className='px-2 py-1 text-start hover:bg-gray-50'
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
