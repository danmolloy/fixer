import { useState } from "react";
import Footer from "./footer";
import Header, { menuItems } from "./header";
import Menu from "./menu";
import React from "react";
import LandingFooter from "../landingPage/landingFooter";
import { useSession } from "next-auth/react";
import { landingMenuItems } from "../landingPage/landingPage";

interface LayoutProps {
  children: React.ReactNode
  pageTitle?: string
}

export default function Layout(props: LayoutProps) {
  const { children, pageTitle } = props
  const { data: session } = useSession()


  const [showMenu, setShowMenu] = useState(false)
  
  return (
    <div className="layout " data-testid="layout-div">
      <Header setShowMenu={(bool) => setShowMenu(bool)} showMenu={showMenu} session={session ? true : false}/>
      {showMenu && <Menu signedIn={session ? true : false} setShowMenu={() => setShowMenu(false)} menuItems={session ? menuItems : landingMenuItems}/>}
      <div className={showMenu ? "w-full p-3 blur":"w-full p-3"}>
        <h1 className="ml-2 text-2xl">{pageTitle}</h1>
      </div>
      <div onFocus={() => setShowMenu(false)} className={showMenu ? "layout-children blur": "layout-children pb-12"} data-testid="main-div">
        {children}
      </div>
      
      <LandingFooter session={session ? true : false}/>
    </div>
  )
}