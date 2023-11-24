import { Prisma } from "@prisma/client"
import Image from "next/image"
import Link from "next/link"

export type EnsembleMemberWithUser = Prisma.EnsembleMemberGetPayload<{
  include: {
    user: true
  }
}>

export type MemberTileProps = {
  member: EnsembleMemberWithUser
  setSelectMember: (userId: string) => void
}

export default function MemberTile(props: MemberTileProps) {
  const { member, setSelectMember } = props
  return (
    <div data-testid="member-tile">
      {member.positionTitle.toLocaleLowerCase() === "extra"
      ? <div className="flex flex-row">
          <div className="rounded-full overflow-hidden shadow m-2 w-12 h-12 flex items-center" data-testid={`profile-img`}>
            <Image src={"http://placebeard.it/100/100"} width={48} height={48} alt={`${member.user.firstName} ${member.user.lastName} profile image`} title={`${member.user.firstName} ${member.user.lastName} profile image`} />
          </div>
        <p>{member.user.firstName} {member.user.lastName}</p>
      </div>
      : <div className="flex flex-col">
          <p>{member.user.firstName} {member.user.lastName}</p>
          <p>{member.positionTitle}</p>
        </div>}
        <div>
          {member.positionTitle.toLocaleLowerCase() === "extra" 
          && <Link target="_blank" data-testid="profile-link" className={`text-sm text-indigo-600 hover:underline`} href={`/user/${member.user.id}`}>
            View Profile
          </Link>}
          <button 
            className="text-indigo-600 border border-indigo-600 rounded px-2 py-1 m-1 shadow hover:bg-indigo-50" 
            onClick={(e) => {e.preventDefault(); setSelectMember(member.user.id)}}>
              Select
          </button>
        </div>
    </div>
  )
}