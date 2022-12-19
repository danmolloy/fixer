import Link from "next/link"

export default function HomeTile({ children, link, title, id }) {
  return (
    <Link href={link}>
      <div className="home-tile" id={id} data-testid={id}>
        <h2 className="home-tile-title">{title}</h2>
        {children}
      </div>
    </Link>
  )
}