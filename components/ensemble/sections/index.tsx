import { Prisma } from "@prisma/client"
import EnsembleSection from "./ensembleSection"

export type SectionWithPlayersAndBulletins = Prisma.EnsembleSectionGetPayload<{
  include: {
    members: {
      include: {
        user: true
      }
    },
    extras: {
      include: {
        user: true
      }
    },
    bulletins: true
  }
}>

export type EnsembleSectionsProps = {
  sections: SectionWithPlayersAndBulletins[]
}

export default function EnsembleSections(props: EnsembleSectionsProps) {
  const { sections } = props
  return (
    <div data-testid="ensemble-sections">
      {sections.map(i => (
        <EnsembleSection section={i} key={i.id} />
      ))}
    </div>
  )
}