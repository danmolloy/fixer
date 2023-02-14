import Link from "next/link"
import React, { ReactNode } from "react"

interface HomeTileProps {
  children: ReactNode
  link: string
  title: string
  /* id: string */
}

export default function HomeTile(props: HomeTileProps) {
  const { children, link, title } = props
  return (
    <Link href={link}>
      <div className="home-tile" /* id={id} data-testid={id} */>
        <h2 className="home-tile-title">{title}</h2>
        {children}
      </div>
    </Link>
  )
}