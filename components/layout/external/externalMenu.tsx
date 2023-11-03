import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef } from "react";
import { AiOutlineClose } from "react-icons/ai";

export const externalMenuLinks: {
  name: string,
  link: string, 
  id: string
}[] = [
  {
    name: "About",
    link: "/about",
    id: "about-link",
  },
  {
    name: "FAQ",
    link: "/faq",
    id: "faq-link",
  },
  {
    name: "Contact",
    link: "/contact",
    id: "contact-link"
  },
] 

export type externalMenuProps = {
  setShowMenu: (arg: boolean) => void
}

export default function ExternalMenu(props: externalMenuProps) {
  const { setShowMenu } = props;
  const ref = useRef(null)

  useEffect(() => {
    ref.current.focus()
  }, [])



  return (
    <div ref={ref} onBlur={() => setTimeout(() => setShowMenu(false), 150)} tabIndex={-1} data-testid="external-menu" className="transition duration-500 ease-out bg-white z-30 mt-16 flex flex-col w-full sm:w-4/5 self-center fixed rounded-2xl border shadow overflow-hidden">
      <div className="w-full flex flex-col items-center">
          <button onClick={() => setShowMenu(false)} className="hover:bg-slate-100 self-end m-1 p-2 rounded-full" data-testid={"close-btn"}>
            <AiOutlineClose />
          </button>
        </div>
          {externalMenuLinks.map((i) => (
            <Link data-testid={i.id} href={i.link} key={i.id} className="hover:bg-slate-100 text-slate-800 p-1 mx-1 sm:mx-4 rounded text-sm font-light">
              {i.name}
            </Link>))}
            <button data-testid="sign-in-btn" onClick={() => signIn("github")} className="hidden md:flex  hover:bg-slate-100 text-slate-600 p-1 mx-4 rounded text-sm font-light">
            Sign in
          </button>
    </div>
  )
}