import React from "react"
import { AiOutlineCopyrightCircle, AiOutlineFacebook, AiOutlineTwitter, AiOutlineInstagram } from "react-icons/ai"
import { signOut } from "next-auth/react"
import { landingMenuItems } from "./landingPage"
import Link from "next/link"

export const landingMenu: string[] = ["Features", "Testimonials", "Pricing", "Contact"]
export const sessionMenu: {
  name: string, link: string
}[] = [{name: "About", link: "/about"}, {name: "Your Account", link: "/account"}, {name: "Contact", link: "/contact"}, {name: "FAQ", link: "/faq"}, {name: "Sign Out", link: ""}]

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

export default function LandingFooter(props: LandingFooterProps) {
  const { session } = props
  return (
    <div className="flex flex-col items-center justify-center border-t flex-wrap" data-testid="landing-footer">
      <div className="py-2">
      {!session 
      ? landingMenuItems.filter(i => i.name !== "Sign in").map((i) => (
            <Link href={i.link} key={i.id} className="hover:bg-slate-100 text-slate-800 p-1 mx-1 sm:mx-4 rounded text-sm font-light">
              {i.name}
            </Link>))
      : sessionMenu.map((i: {name: string, link: string}) => (
        i.name === "Sign Out" 
        ? <button onClick={() => (
          signOut()
        )} key={i.name} className="hover:bg-slate-100 text-slate-800 p-1 mx-4 rounded text-sm font-light">
          {i.name}
        </button>
        : <Link key={i.name} className="hover:bg-slate-100 text-slate-800 p-1 mx-4 rounded text-sm font-light" href={i.link}>
          {i.name}
          </Link>
        ))
            }
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