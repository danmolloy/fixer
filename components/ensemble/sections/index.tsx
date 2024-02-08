import { Prisma } from "@prisma/client"
import EnsembleSection from "./ensembleSection"
import CreateSection from "./edit"
import useSWR from "swr"

export type SectionWithPlayers = Prisma.EnsembleSectionGetPayload<{
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
  }
}>

const fetcher = (url: string):Promise<any> => fetch(url).then((res) => res.json())

export type EnsembleSectionsProps = {
  sections: SectionWithPlayers[]
  ensembleId: string
}

export default function EnsembleSections(props: EnsembleSectionsProps) {
  const { sections, ensembleId } = props
  const { data, error, /* isLoading */ } = useSWR('/api/user/findAll', fetcher)

  

  return (
    <div data-testid="ensemble-sections" className="flex flex-col items-center w-screen">
      {sections.map(i => (
        <EnsembleSection section={i} key={i.id} />
      ))}
      {data && <CreateSection ensembleId={ensembleId} directory={data} />}
    </div>
  )
}