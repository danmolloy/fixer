import Link from "next/link";
import { signIn, signOut } from "../auth";
import { Session } from "next-auth";
import MenuButton from "./menuButton";
import { externalMenuLinks, sessionMenuLinks } from "./menuLinks";


export type HeaderProps = {
  showMenu: boolean
  setShowMenu: (bool: boolean) => void
  setReducedHeader: (arg: boolean) => void
  reducedHeader: boolean
}

export default async function Header(props: {session: Session|null}) {
    const { session} = props;
  
  let menuLinks = session ? sessionMenuLinks : externalMenuLinks

  return (
    <div data-testid="external-header" className={`${"h-16"} transition-all bg-white fixed top-0 w-screen shadow z-30 flex flex-row items-center justify-between`}>
      <Link data-testid="gigfix-link" href="/" >
        <h2 className={`${"text-2xl"} p-2 mx-2 md:mx-10`}>
          Gig<span className="text-blue-600 font-semibold">Fix</span>
        </h2>
      </Link>
      <div className='w-full justify-end hidden md:flex flex-row mr-2' data-testid="nav-bar">
        {menuLinks.map(i => (
          <Link href={i.link} key={i.id} data-testid={i.id} className='hover:bg-slate-100 p-1 mx-4 rounded text-slate-600 text-sm flex flex-row items-center'>
            {i.name}
          </Link>))}
          {session 
          ? <form
          action={async () => {
            "use server"
            await signOut({redirectTo: "/"})
          }}
        >
          <button data-testid="sign-in-btn" className="hover:bg-slate-100 text-slate-800 p-1 mx-1 sm:mx-4 rounded text-sm font-light" type="submit">Sign out</button>
        </form>
          : <form
            action={async () => {
              "use server"
              await signIn("github")
            }}
          >
            <button data-testid="sign-in-btn" className="hover:bg-slate-100 text-slate-800 p-1 mx-1 sm:mx-4 rounded text-sm font-light" type="submit">Sign in</button>
          </form>}
        </div>          
        
          <MenuButton session={session}/>
    </div>
  )
}