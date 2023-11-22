import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef } from "react";
import { AiOutlineClose, AiOutlineMail } from "react-icons/ai";
import { FaQuestion } from "react-icons/fa6";
import { IoHomeOutline, IoEnterOutline } from "react-icons/io5";
import { BiDetail } from "react-icons/bi";


export const externalMenuLinks: {
  name: string,
  link: string, 
  id: string
  icon: React.ReactNode
}[] = [
  {
    name: "About",
    link: "/about",
    id: "about-link",
    icon: <BiDetail />

  },
  {
    name: "FAQ",
    link: "/faq",
    id: "faq-link",
    icon: <FaQuestion />

  },
  {
    name: "Contact",
    link: "/contact",
    id: "contact-link",
    icon: <AiOutlineMail />
  },
  {
    name: "Home",
    link: "/",
    id: "home-link",
    icon: <IoHomeOutline />
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
    <div ref={ref} onBlur={() => setTimeout(() => setShowMenu(false), 150)} tabIndex={-1} data-testid="external-menu" className=" duration-500 ease-in bg-white w-1/2 z-20 mt-0 right-0 flex flex-col h-screen fixed  border shadow overflow-hidden p-1">
      <div className="w-full h-16 flex flex-col items-center">
          <button onClick={() => setShowMenu(false)} className="hover:bg-slate-100 self-end m-1 p-2 rounded-full" data-testid={"close-btn"}>
            <AiOutlineClose />
          </button>
        </div>
          {externalMenuLinks.map((i) => (
            <Link data-testid={i.id} href={i.link} key={i.id} className="w-full hover:bg-slate-100 hover:text-indigo-600 p-2 items-center flex flex-row">
              <div data-testid={`${i.name}-icon`}>
                {i.icon}
              </div>
              <p className="p-4  text-black">{i.name}</p>
            </Link>))}
            <button data-testid="sign-in-btn" onClick={() => signIn("github")} className="w-full hover:bg-slate-100 hover:text-indigo-600 py-1 px-2 items-center flex flex-row">
            <div>
            <IoEnterOutline />
            </div>
            <p className="p-4  text-black">
              Sign in
            </p>
          </button>
    </div>
  )
}