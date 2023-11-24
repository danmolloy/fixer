import MemberTile, { EnsembleMemberWithUser } from "./memberTile";

export type EnsembleMembersProps = {
  members: EnsembleMemberWithUser[]
  setSelectMember: () => void
}

export default function EnsembleMembers(props) {
  const { members, setSelectMember } = props;

  return (
    <div data-testid="ensemble-members">
      <h3>Ensemble Members</h3>
      {members.length === 0 
      ? <div>
        <p>No ensemble members on your list.</p>
        <p>Add them via Ensemble Page or find players in the directory or extra list.</p>
      </div> 
      : members.map((i: EnsembleMemberWithUser) => (
        <MemberTile member={i} setSelectMember={() => setSelectMember()} key={i.id} />
      ))}
    </div>
  )
}