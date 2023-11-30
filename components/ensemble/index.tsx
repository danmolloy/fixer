import { Ensemble } from "@prisma/client";
import EnsembleBulletins from "./bulletins";
import EnsembleCalendar from "./calendar";
import EnsembleManagement from "./management";
import EnsembleSections, { SectionWithPlayersAndBulletins } from "./sections";

export type EnsembleIndexProps = {
  sections: SectionWithPlayersAndBulletins[]
  ensemble: Ensemble
}

export default function EnsembleIndex(props: EnsembleIndexProps) {
  const { ensemble, sections } = props;
  return (
    <div data-testid="ensemble-index">
      <h1>{ensemble.name}</h1>
      <EnsembleBulletins />
      <EnsembleManagement />
      <EnsembleCalendar />
      <EnsembleSections sections={sections}/>
    </div>
  )
}