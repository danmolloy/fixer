import { useSession } from "next-auth/react"
import LayoutIndex from "../../components/layout"
import SignIn from "../../components/layout/signIn"
import EnsembleIndex from "../../components/ensemble"
import { useRouter } from "next/router"
import useSWR from "swr"
import { Ensemble, Prisma } from "@prisma/client"
import Index404 from "../../components/layout/components/index404"
import IsLoadingEventIndex from "../../components/event/eventDetail/isLoadingEventIndex"

export type EnsembleWithSections = Prisma.EnsembleGetPayload<{
  include: {
    sections: true
  }
}>

const fetcher = (url: string):Promise<any> => fetch(url).then((res) => res.json())

export default function EnsemblePage() {
  const router = useRouter();
  const { id } = router.query;
  const { data, error, isLoading } = useSWR(id ? `/api/ensemble/${id}` : null, fetcher)
  const { data: session, status } = useSession()

  if (error || data === null) {
    return (
    <LayoutIndex>
      <Index404 />
    </LayoutIndex>)
  }

  return (
    <LayoutIndex>
      {isLoading 
        ? <>
            <IsLoadingEventIndex />
          </>
        : session 
      ? <EnsembleIndex ensemble={data} sections={data.sections} /> 
      : <SignIn />}
    </LayoutIndex>
  )
}