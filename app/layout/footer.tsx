import { AiOutlineCopyrightCircle, AiOutlineFacebook, AiOutlineInstagram, AiOutlineMail, AiOutlineTwitter } from "react-icons/ai";
import Link from "next/link";
import { BiDetail } from "react-icons/bi";
import { FaQuestion } from "react-icons/fa";
import { IoHomeOutline } from "react-icons/io5";
import { Session } from "next-auth";
import SignInBtn from "./signInBtn";
import SignOutBtn from "./signOutBtn";


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
export const footerMenuLinks: {
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


export default function Footer(props: {session: Session|null}) {
  const {session} = props;
  return (
    <div data-testid="footer" className="flex flex-col items-center justify-center border-t flex-wrap ">
      <div className="py-2 flex-wrap w-screen flex flex-row items-center justify-center">
        {footerMenuLinks.map((i) => (
          <Link data-testid={i.id} href={i.link} key={i.id} className="hover:bg-slate-100 text-slate-800 p-1 mx-1 sm:mx-4 rounded text-sm font-light">
            {i.name}
          </Link>))}
          {session 
          ? <SignOutBtn classNames="hover:bg-slate-100 text-slate-800 p-1 mx-1 sm:mx-4 rounded text-sm font-light" />
          : <SignInBtn classNames="hover:bg-slate-100 text-slate-800 p-1 mx-1 sm:mx-4 rounded text-sm font-light" />}
          
      </div>
      <div className="flex flex-row text-xl">
        {socialMedia.map(i => (
          <div data-testid={i.id} key={i.key} className="text-slate-800 p-1 mx-1 hover:bg-slate-100 hover:cursor-pointer">
            {i.node}
          </div>
        ))}
      </div>
      <div className="flex flex-row items-center text-slate-500 text-sm p-2">
        <AiOutlineCopyrightCircle />
        <p className="ml-1">2024 Gig Fix Limited</p>
      </div>
    </div>
  )
}