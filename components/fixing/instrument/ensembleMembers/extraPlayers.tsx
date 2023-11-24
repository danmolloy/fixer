import MemberTile, { EnsembleMemberWithUser } from "./memberTile"

export type ExtraPlayersProps = {
  extras: EnsembleMemberWithUser[]
  setSelectExtra: () => void
}

export default function ExtraPlayers(props: ExtraPlayersProps) {
  const { extras, setSelectExtra } = props;

  return (
    <div data-testid="extra-players">
      <h3>Extra Players</h3>
      {extras.length === 0 
      ? <div>
          <p>No extra players on your list.</p>
          <p>Add them via Ensemble Page or find players in the directory.</p>
        </div>
      : extras.map((i:EnsembleMemberWithUser) => (
        <MemberTile key={i.id} member={i} setSelectMember={() => setSelectExtra()} />
      ))}
    </div>
  )
}