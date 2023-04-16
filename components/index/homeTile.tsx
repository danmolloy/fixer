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
    <Link href={link} data-testid="home-tile">
      <div className="border m-2 rounded shadow-sm flex flex-col items-center justify-center hover:bg-blue-50 active:bg-blue-100 h-40 w-96 font-light" /* id={id} data-testid={id} */>
        <h2 className="font-sans text-2xl">{title}</h2>
        {children}
      </div>
    </Link>
  )
}