'use client'

import { useState } from "react"
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai"
import FlyOutMenu from "./flyoutMenu"
import { Session } from "next-auth"

export type MenuButtonProps = {
  session: Session|null
}

export default function MenuButton(props: MenuButtonProps) {
  const { session } = props;
  const [showMenu, setShowMenu] = useState<boolean>(false)
  return (
    <div data-testid="menu-button">
      <button  className='md:hidden flex flex-row items-center' onClick={() => setShowMenu(!showMenu)} data-testid="menu-icon-btn">
        {showMenu 
        ? <AiOutlineClose className='p-2 mr-2 w-10 h-10 text-black hover:bg-blue-50 active:bg-blue-100 rounded-full' data-testid="close-menu-icon"/>
        : <AiOutlineMenu className='p-2 mr-2 w-10 h-10 text-black hover:bg-blue-50 active:bg-blue-100 rounded-full' data-testid="menu-icon"/>}
      </button>
      {showMenu && <FlyOutMenu session={session}/>}
    </div>
  )
}