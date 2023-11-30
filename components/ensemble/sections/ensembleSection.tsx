import { SectionWithPlayersAndBulletins } from "."
import SectionExtra from "./sectionExtra"
import SectionMember from "./sectionMember"

export type EnsembleSectionProps = {
  section: SectionWithPlayersAndBulletins
}

export default function EnsembleSection(props: EnsembleSectionProps) {
  const { section } = props
  return (
    <div data-testid="ensemble-section">
      <h3>{section.name}</h3>
      <div data-testid="section-members">
        <p>Members</p>
        {section.members.map(i => (
          <SectionMember key={i.id} player={i} />
        ))}
      </div>
      <div data-testid="section-extras">
          <p>Extras</p>
          {section.extras.map(i => (
            <SectionExtra player={i} key={i.id} />
          ))}
      </div>
    </div>
  )
}