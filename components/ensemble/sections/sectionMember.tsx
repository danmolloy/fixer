import { EnsembleMemberWithUser } from "../../fixing/instrument/ensembleMembers/memberTile";


export type SectionMemberProps = {
  player: EnsembleMemberWithUser
}

export default function SectionMember(props: SectionMemberProps) {
  const { player } = props;
  return (
    <div data-testid="section-member">
      <p>{player.user.firstName} {player.user.lastName}</p>
      <p>{player.positionTitle}</p>
      <button data-testid="contact-btn">Contact</button>
    </div>
  )
}