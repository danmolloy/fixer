import Link from "next/link";
import { externalMenuLinks } from "./externalMenu";
import { useEffect, useState } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";

export type ExternalHeaderProps = {
  showMenu: boolean
  setShowMenu: (bool: boolean) => void
  setReducedHeader: (arg: boolean) => void
  reducedHeader: boolean
}

export default function ExternalHeader(props: ExternalHeaderProps) {
  const { reducedHeader, setReducedHeader, setShowMenu, showMenu } = props;
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    function handleScroll() {
      const currentPosition = window.scrollY;
      if (currentPosition > scrollPosition + 50) {
        setScrollPosition(currentPosition);
        setReducedHeader(true)
      } else if (currentPosition < scrollPosition - 5) {
        setScrollPosition(currentPosition);
        setReducedHeader(false)
      }
    }

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrollPosition]);

  return (
    <div data-testid="external-header" className={`${reducedHeader ? "h-12" : "h-16"} transition-all bg-white fixed top-0 w-screen shadow z-30 flex flex-row items-center justify-between`}>
      <Link data-testid="gigfix-link" href="/" >
        <h2 className={`${reducedHeader ? "hidden" : "text-2xl"} p-2 mx-2 md:mx-10`}>
          Gig<span className="text-blue-600 font-semibold">Fix</span>
        </h2>
      </Link>
      <div className='w-full justify-end hidden md:flex flex-row mr-2' data-testid="nav-bar">
        {externalMenuLinks.map(i => (
          <Link href={i.link} key={i.id} data-testid={i.id} className='hover:bg-slate-100 p-1 mx-4 rounded text-slate-600 text-sm flex flex-row items-center'>
            {i.name}
          </Link>))}
        </div>          
          <button  className='md:hidden flex flex-row items-center' onClick={() => setShowMenu(!showMenu)} data-testid="menu-icon-btn" >
            {showMenu 
            ? <AiOutlineClose className='p-2 mr-2 w-10 h-10 text-black hover:bg-blue-50 active:bg-blue-100 rounded-full' data-testid="close-menu-icon"/>
            : <AiOutlineMenu className='p-2 mr-2 w-10 h-10 text-black hover:bg-blue-50 active:bg-blue-100 rounded-full' data-testid="menu-icon"/>} 
          </button> 
    </div>
  )
}