'use client'
import { signIn } from "next-auth/react";
import Link from "next/link";
import { IoEnterOutline, IoExitOutline } from "react-icons/io5";
import { Session } from "next-auth";
import { signOut } from "../auth";
import { externalMenuLinks, sessionMenuLinks } from './menuLinks'


export type ExternalMenuProps = {
  session: Session|null
}

export default function FlyOutMenu(props: ExternalMenuProps) {
  const { session } = props;

  let menuLinks = session ? sessionMenuLinks : externalMenuLinks


  return (
    <div  data-testid="external-menu" className="md:hidden absolute bg-white z-10 right-0 border mr-2 mt-3 w-1/2 shadow">
      
          {menuLinks.map((i) => (
            <Link data-testid={i.id} href={i.link} key={i.id} className="w-full hover:bg-slate-100 hover:text-indigo-600 p-2 items-center flex flex-row">
              <div data-testid={`${i.name}-icon`}>
                {i.icon}
              </div>
              <p className="p-4  text-black">{i.name}</p>
            </Link>))}
            
            {session 
            ? <button data-testid="sign-out-btn" onClick={() => signOut()} className="w-full hover:bg-slate-100 hover:text-indigo-600 py-1 px-2 items-center flex flex-row">
            <div>
            <IoExitOutline />
            </div>
            <p className="p-4  text-black">
              Sign out
            </p>
          </button>
            : <button data-testid="sign-in-btn" onClick={() => signIn("github")} className="w-full hover:bg-slate-100 hover:text-indigo-600 py-1 px-2 items-center flex flex-row">
              <div>
              <IoEnterOutline />
              </div>
              <p className="p-4  text-black">
                Sign in
              </p>
            </button>}
    </div>
  )
}