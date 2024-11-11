'use client';
import { Ensemble, EnsembleAdmin } from '@prisma/client';
import Link from 'next/link';
import { useState } from 'react';
import { IoCaretDown } from 'react-icons/io5';
import { BsBuildingAdd, BsPencilSquare } from 'react-icons/bs';

export type EnsemblesMenuProps = {
  ensemblesAdmins: (EnsembleAdmin & { ensemble: Ensemble })[];
};

export default function EnsemblesMenu(props: EnsemblesMenuProps) {
  const { ensemblesAdmins } = props;
  const [showMenu, setShowMenu] = useState<boolean>(false);

  return (
    <div className='hidden md:flex'>
      <button
        className='mx-4 flex flex-row items-center justify-center rounded p-1 text-sm hover:text-black'
        onClick={() => {
          focus();
          setShowMenu(!showMenu);
        }}
        onBlur={() => setTimeout(() => setShowMenu(false), 250)}
        data-testid='ensembles-btn'
      >
        <p className='mx-1'>Ensembles</p>
        <IoCaretDown />
      </button>
      {showMenu && (
        <div
          data-testid='ensembles-menu'
          className='absolute mt-11 flex flex-col rounded border bg-white text-sm font-medium'
        >
          {ensemblesAdmins && ensemblesAdmins.length > 0 ? (
            ensemblesAdmins.map((i) => (
              <Link
                key={i.id}
                href={`/ensembles/${i.ensemble.id}`}
                className='m-1 p-2 hover:bg-slate-50 hover:text-blue-600'
              >
                {i.ensemble.name}
              </Link>
            ))
          ) : (
            <p className='m-1 p-2 flex flex-row items-center justify-start'>No Ensembles</p>
          )}
          <Link
            href='/ensembles/join/'
            className='m-1 flex flex-row items-center justify-start p-2 hover:bg-slate-50 hover:text-blue-600'
          >
            <BsBuildingAdd />
            <p className='ml-1'>Join Ensemble</p>
          </Link>
          <Link
            href='/ensembles/create/'
            className='m-1 flex flex-row items-center justify-start p-2 hover:bg-slate-50 hover:text-blue-600'
          >
            <BsPencilSquare />
            <p className='ml-1'>Create Ensemble</p>
          </Link>
        </div>
      )}
    </div>
  );
}
