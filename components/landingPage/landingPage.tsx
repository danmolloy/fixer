import React, { useState } from "react"
import LandingHeader from "./header"
import Hero from "./hero"
import FixerFeatures from "./fixerFeatures"
import MusicianFeatures from "./musicianFeatures"
import LandingFooter from "./landingFooter"
import Menu, { MenuItems } from "../layout/menu"


export const landingMenuItems: MenuItems = [
  {
    name: "About",
    link: "/about",
    id: "1",
  },
  {
    name: "Pricing",
    link: "/",
    id: "3"
  },
  {
    name: "Contact",
    link: "/",
    id: "4"
  },
] 

export default function LandingPage() {
  const [showMenu, setShowMenu] = useState<boolean>(false);

  return (
      <div className="flex flex-col w-screen min-h-screen font-nunito ">
        {/* <LandingHeader setShowMenu={(bool) => setShowMenu(bool)} showMenu={showMenu}/>
        {showMenu && <Menu setShowMenu={() => setShowMenu(false)} menuItems={landingMenuItems}/>}
 */}        <div className={showMenu === true && "blur"}>
        <Hero />
        <FixerFeatures />
        <MusicianFeatures />
        {/* <LandingFooter  /> */}
        </div>
      </div>
  )
}