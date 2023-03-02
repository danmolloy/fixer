import { useState } from "react";
import Footer from "./footer";
import Header from "./header";
import Menu from "./menu";
import React from "react";
import LandingFooter from "../landingPage/landingFooter";

interface LayoutProps {
  children: React.ReactNode
  pageTitle?: string
}

export default function Layout(props: LayoutProps) {
  const { children, pageTitle } = props

  const [showMenu, setShowMenu] = useState(false)
  
  return (
    <div className="layout " data-testid="layout-div">
      <Header setShowMenu={(bool) => setShowMenu(bool)} showMenu={showMenu}/>
      {showMenu && <Menu setShowMenu={() => setShowMenu(false)}/>}
      <div className={showMenu ? "w-full p-3 blur":"w-full p-3"}>
        <h1 className="ml-4 text-bold">{pageTitle}</h1>
      </div>
      <div onFocus={() => setShowMenu(false)} className={showMenu ? "layout-children blur": "layout-children pb-12"} data-testid="main-div">
        {children}
      </div>
      
      <LandingFooter landingPage={false}/>
    </div>
  )
}