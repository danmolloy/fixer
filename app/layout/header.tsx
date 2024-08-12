import Link from "next/link";
import { signIn, signOut } from "../auth";
import { Session } from "next-auth";
import MenuButton from "./menuButton";
import { externalMenuLinks, sessionMenuLinks } from "./menuLinks";
import SignOutBtn from "./signOutBtn";
import SignInBtn from "./signInBtn";
import EnsemblesMenu from "../ensembles/menu";
import { useState } from "react";


export type HeaderProps = {
  session: Session|null
}

export default function Header(props: HeaderProps) {
  const { session} = props;

  let menuLinks = session ? sessionMenuLinks : externalMenuLinks

  return (
    <div data-testid="header" className={`${"h-14"} transition-all bg-white fixed top-0 w-screen shadow z-30 flex flex-row items-center justify-between`}>
      <Link data-testid="gigfix-link" href="/" >
        <h2 className={`${"text-2xl"} font-light p-2 mx-2 md:mx-10`}>
          Gig<span className=" font-semibold">Fix</span>
        </h2>
      </Link>
      <div className='w-full justify-end hidden md:flex flex-row mr-2' data-testid="nav-bar">
      {session 
      && <EnsemblesMenu ensemblesAdmins={session.user.admins} />}
        {menuLinks.map(i => (
          <Link href={i.link} key={i.id} data-testid={i.id} className='hover:bg-slate-100 p-1 mx-4 rounded  text-sm flex flex-row items-center'>
            {i.name}
          </Link>))}
          {session 
          ? <SignOutBtn classNames="py-1 px-2 mx-4 rounded text-sm flex flex-row items-center hover:bg-gray-50 text-black border "  />
          : <SignInBtn classNames="py-1 px-2 mx-4 rounded text-sm flex flex-row items-center hover:bg-gray-800 text-white bg-black " />}
        </div>          
        
          <MenuButton session={session}/>
    </div>
  )
}