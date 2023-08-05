import React from "react"
import { signIn, signOut } from "next-auth/react"
import Header, { menuItems } from "../layout/header"
import Layout from "../layout/layout"
import { AiOutlineMenu } from "react-icons/ai"
import { landingMenu } from "./landingFooter"
import { landingMenuItems } from "./landingPage"
import Link from "next/link"

export const menu = ["Features", "Testimonials", "Pricing", "Contact"]

export type LandingHeaderProps = {
  setShowMenu: (arg: boolean) => void
  showMenu: boolean
}

export default function LandingHeader(props: LandingHeaderProps) {
  const { setShowMenu, showMenu } = props;
  return (
    <div className={showMenu === true ? "blur h-24 flex flex-row items-center justify-between" : "h-24 flex flex-row items-center justify-between"} data-testid="landing-header">
          <Link href="/" className={' p-2 text-2xl sm:mx-10  '}>
            Gig<span className="text-blue-600 font-semibold">Fix</span>
          </Link>
          <div className="hidden md:flex " >
            {landingMenuItems.filter(i => i.name !== "Sign in").map(i => (
            <Link href={i.link} key={i.id} className="hover:bg-slate-100 text-slate-600 p-1 mx-4 rounded text-sm font-light">
              {i.name}
            </Link>))}
          </div>
          <div className="flex flex-row items-center sm:mx-4">
            <button onClick={() => signIn("github")} className="hidden md:flex  hover:bg-slate-100 text-slate-600 p-1 mx-4 rounded text-sm font-light">
                Sign in
            </button>
            <button onClick={() => signIn("github")} className="bg-blue-600 hover:bg-blue-500 text-white rounded-full py-2 px-2 sm:px-4 mr-2 text-sm ">
              Get started
            </button>
            <button className="p-2 rounded-full mx-2 md:hidden hover:bg-zinc-100" onClick={() => setShowMenu(!showMenu)}>
              <AiOutlineMenu className='text-xl' data-testid="menu-icon"/>
            </button>
          </div>
        </div>
  )
}