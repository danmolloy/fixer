import { SectionWithPlayersAndBulletins } from "."
import SectionExtra from "./sectionExtra"
import SectionMember from "./sectionMember"

export type EnsembleSectionProps = {
  section: SectionWithPlayersAndBulletins
}

export default function EnsembleSection(props: EnsembleSectionProps) {
  const { section } = props
  return (
    <div data-testid="ensemble-section" className="border rounded p-2 w-full my-2">
      <h3>{section.name}</h3>
      <div data-testid="section-members" className=" rounded p-2 w-full my-2">
        <p className="font-medium">Members</p>
        {section.members.map(i => (
          <SectionMember key={i.id} player={i} />
        ))}
      </div>
      <div data-testid="section-extras" className=" rounded p-2 w-full my-2">
          <p className="font-medium">Extras</p>
          {section.extras.map(i => (
            <SectionExtra player={i} key={i.id} />
          ))}
      </div>
    </div>
  )
}