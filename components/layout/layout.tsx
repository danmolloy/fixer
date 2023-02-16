import { useState } from "react";
import Footer from "./footer";
import Header from "./header";
import Menu from "./menu";
import React from "react";

interface LayoutProps {
  children: React.ReactNode
}

export default function Layout(props: LayoutProps) {
  const { children } = props

  const [showMenu, setShowMenu] = useState(false)
  
  return (
    <div className="layout">
      <Header setShowMenu={() => setShowMenu(!showMenu)} showMenu={showMenu}/>
      {showMenu && <Menu />}
      <div className={"layout-children "} data-testid="main-div">
        {children}
      </div>
      <Footer />
    </div>
  )
}