import React from "react"
import { AiOutlineCopyrightCircle, AiOutlineFacebook, AiOutlineTwitter, AiOutlineInstagram } from "react-icons/ai"
import { signOut } from "next-auth/react"
import Link from "next/link"

export const landingMenu: string[] = ["Features", "Testimonials", "Pricing", "Contact"]
export const sessionFooterOptions: {
  name: string, link: string
}[] = [{name: "About", link: "/about"}, {name: "Your Account", link: "/account"}, {name: "Contact", link: "/contact"}, {name: "FAQ", link: "/faq"}]

export const socialMedia: {
  key: number, 
  node: React.ReactNode
  id: string
}[] = [
  {
    key: 0, 
    node: <AiOutlineFacebook />,
    id: "facebook-link"
  },
  {
    key: 1, 
    node: <AiOutlineTwitter />,
    id: "twitter-link"
  },
  {
    key: 2, 
    node: <AiOutlineInstagram />,
    id: "insta-link"
  },
]
interface LandingFooterProps {
  session?: boolean
}

export default function SessionFooter(props: LandingFooterProps) {

  return (
    <div className="flex flex-col items-center justify-center border-t flex-wrap" data-testid="session-footer">
      <div className="py-2">
      {sessionFooterOptions.map((i: {name: string, link: string}) => (
        <Link key={i.name} className="hover:bg-slate-100 text-slate-800 p-1 mx-4 rounded text-sm font-light" href={i.link}>
          {i.name}
          </Link>
        ))}
        <button onClick={() => (
          signOut()
        )} className="hover:bg-slate-100 text-slate-800 p-1 mx-4 rounded text-sm font-light">
          Sign Out
        </button>
      </div>
      <div className="flex flex-row text-xl">
        {socialMedia.map(i => (
          <div data-testid={i.id} key={i.key} className="text-slate-800 p-1 mx-1 hover:bg-slate-100 hover:cursor-pointer">
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