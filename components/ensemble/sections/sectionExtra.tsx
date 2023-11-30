import { Prisma } from "@prisma/client"
import Image from "next/image"
import Link from "next/link"

export type SectionExtraWithUser = Prisma.EnsembleExtraGetPayload<{
  include: {
    user: true
  }
}>

export type SectionExtraProps = {
  player: SectionExtraWithUser
}

export default function SectionExtra(props: SectionExtraProps) {
  const { player } = props;

  return (
    <div data-testid="section-extra">
      
      <div className="rounded-full overflow-hidden shadow m-2 w-12 h-12 flex items-center" data-testid={`user-img`}>
        <Image src={"http://placebeard.it/100/100"} width={48} height={48} alt={`${player.user.firstName} ${player.user.lastName} profile image`} title={`${player.user.firstName} ${player.user.lastName} profile image`} />
      </div>
      <p>{player.user.firstName} {player.user.lastName}</p>
      <p>Extra</p>
      <button data-testid="contact-btn">Contact</button>
      <Link href={`/user/${player.userId}`}>View Profile</Link>
    </div>
  )
}