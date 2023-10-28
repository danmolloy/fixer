import React, { useState } from "react"
import LandingHeader from "./header"
import Hero from "./hero"
import FixerFeatures from "./fixerFeatures"
import MusicianFeatures from "./musicianFeatures"
import LandingFooter from "./landingFooter"
import Menu, { MenuItems } from "../../layout/menu"
import About from "../../index/about"


export const landingMenuItems: MenuItems = [
  {
    name: "About",
    link: "/about",
    id: "1",
  },
  {
    name: "FAQ",
    link: "/faq",
    id: "2",
  },
  {
    name: "Contact",
    link: "/contact",
    id: "4"
  },
] 

export default function LandingPage() {
  const [showMenu, setShowMenu] = useState<boolean>(false);

  return (
      <div data-testid="landing-page-div" className="flex flex-col w-screen min-h-screen font-nunito ">
        <div className={showMenu === true ? "blur" : undefined}>
        <Hero />
        <FixerFeatures />
        <MusicianFeatures />
        {/* <About /> */}
        </div>
      </div>
  )
}