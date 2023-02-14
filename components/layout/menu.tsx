import Link from "next/link"
import React from "react"

const menuLinks = [
  {
    title: "Directory",
    id: "directory-menu-link",
    link: "/directory"
  },
  {
    title: "About",
    id: "about-menu-link",
    link: "/about"
  },
  {
    title: "Settings",
    id: "settings-menu-link",
    link: "/settings"
  },
  {
    title: "Contact Us",
    id: "contact-menu-link",
    link: "/contact"
  },
]

export default function Menu() {
  return (
    <div className="menu-div" data-testid="menu-div">
      {menuLinks.map(i => (
        <Link key={i.id} href={`/${i.link}`}>
          <div className="menu-link" data-testid={i.id}>
            {i.title}
          </div>
        </Link>
      ))}
    </div>
  )
}