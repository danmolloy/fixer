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
    <div data-testid="section-extra" className="border my-1 p-1 flex flex-row justify-between items-start">
      {/* <div className="rounded-full overflow-hidden shadow m-2 w-12 h-12 flex items-center" data-testid={`user-img`}>
        <Image src={"http://placebeard.it/100/100"} width={48} height={48} alt={`${player.user.firstName} ${player.user.lastName} profile image`} title={`${player.user.firstName} ${player.user.lastName} profile image`} />
      </div> */}
      <div className="flex flex-col">
        <p>{player.user.firstName} {player.user.lastName}</p>
        <p>{player.positionTitle}</p>
      </div>
      <div className="flex flex-row">
        <Link href={`/user/${player.userId}`} className="hover:bg-green-500 p-1 m-1 rounded shadow-sm bg-emerald-500 text-white">View Profile</Link>
        <button data-testid="contact-btn" className="hover:bg-indigo-500 p-1 m-1 rounded shadow-sm bg-indigo-600 text-white">Contact</button>
      </div>
    </div>
  )
}