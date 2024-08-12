'use client'
import { Ensemble, EnsembleAdmin } from "@prisma/client";
import Link from "next/link";
import { useState } from "react";

export type EnsemblesMenuProps = {
  ensemblesAdmins: (EnsembleAdmin & {ensemble: Ensemble })[]
}

export default function EnsemblesMenu(props: EnsemblesMenuProps) {
  const { ensemblesAdmins } = props;
  const [showMenu, setShowMenu] = useState<boolean>(false)

  return (
    <div className='hidden md:flex '>
      <button className="hover:bg-gray-100 p-1 mx-4 rounded text-sm items-center" onClick={() => {focus(); setShowMenu(!showMenu)}} onBlur={() => setTimeout(() => setShowMenu(false), 250)} data-testid="ensembles-btn">Ensembles</button>
      {showMenu 
      && <div data-testid="ensembles-menu" className="absolute mt-10 bg-white text-sm font-medium flex flex-col border">
        {ensemblesAdmins && ensemblesAdmins.length > 0 ? ensemblesAdmins.map(i => (
          <Link 
            key={i.id} 
            href={`/ensembles/${i.ensemble.id}`} 
            className="p-1 hover:text-blue-600">
              {i.ensemble.name}
            </Link>
        )): <p>No Ensembles</p>}
        <Link href="/ensembles/join/" className="p-1 hover:text-blue-600">
          Join Ensemble
        </Link>
        <Link href="/ensembles/create/" className="p-1 hover:text-blue-600">
          Create Ensemble
        </Link>
      </div>}
    </div>
  )
}