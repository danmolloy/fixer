import Link from "next/link"

export default function HomeTile({ children, link, title, id }) {
  return (
    <Link href={link}>
      <a className="home-tile" id={id}>
        <h2>{title}</h2>
        {children}
      </a>
    </Link>
  )
}