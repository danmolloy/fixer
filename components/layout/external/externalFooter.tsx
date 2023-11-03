import { AiOutlineCopyrightCircle } from "react-icons/ai";
import { externalMenuLinks } from "./externalMenu";
import Link from "next/link";
import { socialMedia } from "../session/footer";
import { signIn } from "next-auth/react"



export default function ExternalFooter() {
  return (
    <div data-testid="external-footer" className="flex flex-col items-center justify-center border-t flex-wrap ">
      <div className="py-2 ">
        {externalMenuLinks.map((i) => (
          <Link data-testid={i.id} href={i.link} key={i.id} className="hover:bg-slate-100 text-slate-800 p-1 mx-1 sm:mx-4 rounded text-sm font-light">
            {i.name}
          </Link>))}
          <button data-testid="sign-in-btn" onClick={() => signIn("github")} className="hover:bg-slate-100 text-slate-800 p-1 mx-1 sm:mx-4 rounded text-sm font-light">
            Sign in
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