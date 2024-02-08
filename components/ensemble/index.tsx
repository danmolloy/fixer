import { Ensemble } from "@prisma/client";
import EnsembleCalendar from "./calendar";
import EnsembleManagement from "./management";
import EnsembleSections, { SectionWithPlayers } from "./sections";

export type EnsembleIndexProps = {
  sections: SectionWithPlayers[]
  ensemble: Ensemble
}

export default function EnsembleIndex(props: EnsembleIndexProps) {
  const { ensemble, sections } = props;
  return (
    <div data-testid="ensemble-index" className="p-2">
      <h1 className="m-4">{ensemble.name}</h1>

      <EnsembleManagement />
      <EnsembleCalendar />
      <EnsembleSections ensembleId={ensemble.id} sections={sections}/>
    </div>
  )
}