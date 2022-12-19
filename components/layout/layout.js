import { useState } from "react";
import Footer from "./footer";
import Header from "./header";
import Menu from "./menu";

export default function Layout({ children, home }) {
  const [showMenu, setShowMenu] = useState(false)
  
  return (
    <div className="layout">
      <Header setShowMenu={() => setShowMenu(!showMenu)} showMenu={showMenu}/>
      {showMenu && <Menu />}
      <div className={home ? "home " : "layout-children"} data-testid="main-div">
        {children}
      </div>
      <Footer />
    </div>
  )
}