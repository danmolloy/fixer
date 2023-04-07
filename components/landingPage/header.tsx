import React from "react"
import { useSession, signIn, signOut } from "next-auth/react"
import Header from "../layout/header"
import { Button } from "@mui/material"
import Layout from "../layout/layout"
import { AiOutlineMenu } from "react-icons/ai"

export const menu = ["Features", "Testimonials", "Pricing", "Contact"]


export default function LandingHeader() {
  return (
    <div className="h-24 flex flex-row items-center justify-between" data-testid="landing-header">
          <h2 className={' p-2 text-2xl sm:mx-10  '}>
            Gig<span className="text-blue-600 font-semibold">Fix</span>
          </h2>
          <div className="hidden md:flex " >
            {menu.map((i: string) => (
            <button key={i} className="hover:bg-slate-100 text-slate-600 p-1 mx-4 rounded text-sm font-light">
              {i}
            </button>))}
          </div>
          <div className="flex flex-row items-center sm:mx-4">
            <button onClick={() => signIn("github")} className="hidden md:flex  hover:bg-slate-100 text-slate-600 p-1 mx-4 rounded text-sm font-light">
                Sign in
            </button>
            <button className="bg-blue-600 hover:bg-blue-500 text-white rounded-full py-2 px-2 sm:px-4 text-sm ">
              Get started
            </button>
            <button className="px-4 md:hidden">
              <AiOutlineMenu className='text-xl' data-testid="menu-icon"/>
            </button>
          </div>
        </div>
  )
}