import Link from "next/link";
import { FiCalendar, FiFilePlus, FiMoreHorizontal, FiUsers } from "react-icons/fi";

/* 
This component is not currently being used.
IMHO the web browser screen is too cluttered with this fixed.
*/

export default function MobileMenuPanel () {
  return (
    <div data-testid="mobile-menu-panel" className="fixed bottom-0 bg-white sm:hidden flex flex-row w-screen border-t h-[10vh] justify-evenly items-center">
      <Link href="/" data-testid="calendar-link" className="w-full h-full flex items-center justify-center text-3xl active:bg-zinc-50">
        <FiCalendar />
      </Link>
      <Link href={"/event/create"} data-testid="create-event-link" className="w-full h-full flex items-center justify-center text-3xl active:bg-zinc-50">
        <FiFilePlus />
      </Link>
      <Link href="/directory" data-testid="directory-link" className="w-full h-full flex items-center justify-center text-3xl active:bg-zinc-50">
        <FiUsers />
      </Link>
      <Link href="/account" data-testid="user-account-link" className="w-full h-full flex items-center justify-center text-3xl active:bg-zinc-50">
        <FiMoreHorizontal />
      </Link>
    </div>
  )
}