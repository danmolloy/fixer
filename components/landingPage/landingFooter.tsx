import React from "react"
import { AiOutlineCopyrightCircle, AiOutlineFacebook, AiOutlineTwitter, AiOutlineInstagram } from "react-icons/ai"

const menu: string[] = ["Features", "Testimonials", "Pricing", "Contact"]

const socialMedia: 
{key: number, 
  node: React.ReactNode}[] = [
  {
    key: 0, 
    node: <AiOutlineFacebook />
  },
  {
    key: 1, 
    node: <AiOutlineTwitter />
  },
  {
    key: 2, 
    node: <AiOutlineInstagram />
  },
]

export default function LandingFooter() {
  return (
    <div className="flex flex-col items-center justify-center border-t">
      <div className="py-2">
      {menu.map((i: string) => (
            <button key={i} className="hover:bg-slate-100 text-slate-800 p-1 mx-4 rounded text-sm font-light">
              {i}
            </button>))}
      </div>
      <div className="flex flex-row text-xl">
        {socialMedia.map(i => (
          <div key={i.key} className="text-slate-800 p-1 mx-1 hover:bg-slate-100 hover:cursor-pointer">
            {i.node}
          </div>
        ))}
      </div>
      <div className="flex flex-row items-center text-slate-300 text-sm p-2">
        <AiOutlineCopyrightCircle />
        <p className="ml-1">2023 Gig Fix Limited</p>
      </div>
    </div>
  )
}