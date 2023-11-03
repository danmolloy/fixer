import PlayerDirectory from "../../components/directory/playerDirectory";
import prisma from "../../client";
import useSWR from "swr";
import { useState } from "react";
import { useSession } from "next-auth/react";
import LandingPage from "../../components/externalSite/landingPage/landingPage";
import LayoutIndex from "../../components/layout";

const fetcher = (url: string):Promise<any> => fetch(url).then((res) => res.json())


export default function Directory() {
  const { data, error, /* isLoading */ } = useSWR('/api/user/findAll', fetcher)
  const [pageTitle, setPageTitle] = useState<string>("Directory")

  if (error) return <div>failed to load</div>


  return (
    <LayoutIndex pageTitle={pageTitle}>
    <PlayerDirectory data={data} setPageTitle={(instrument) => setPageTitle(instrument)}/>
  </LayoutIndex>
  )
}

