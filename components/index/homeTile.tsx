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
    <Link href={link} data-testid="home-tile" className="lg:w-2/3 w-full self-center">
      <div className="border m-2 rounded shadow-sm flex flex-col items-center justify-center hover:bg-blue-50 active:bg-blue-100 h-40  " /* id={id} data-testid={id} */>
        <h2 className="font-sans text-2xl">{title}</h2>
        <div className="text-2xl m-1 text-zinc-900">
        {children}
        </div>
      </div>
    </Link>
  )
}