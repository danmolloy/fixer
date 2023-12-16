import { EnsembleMemberWithUser } from "../../fixing/instrument/ensembleMembers/memberTile";


export type SectionMemberProps = {
  player: EnsembleMemberWithUser
}

export default function SectionMember(props: SectionMemberProps) {
  const { player } = props;
  return (
    <div data-testid="section-member" className="border my-1 p-1 flex flex-row justify-between items-start">
      <div className="flex flex-col">
        <p>{player.user.firstName} {player.user.lastName}</p>
        <p>{player.positionTitle}</p>
      </div>
      <button data-testid="contact-btn" className="hover:bg-indigo-500 p-1 m-1 rounded shadow-sm bg-indigo-600 text-white">Contact</button>
    </div>
  )
}