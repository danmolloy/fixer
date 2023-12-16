import PlayerDirectory from "../../components/directory/playerDirectory";
import useSWR from "swr";
import { useState } from "react";
import { useSession } from "next-auth/react";
import LayoutIndex from "../../components/layout";
import SignIn from "../../components/layout/signIn";

const fetcher = (url: string):Promise<any> => fetch(url).then((res) => res.json())


export default function Directory() {
  const { data: session, status } = useSession()
  const { data, error, /* isLoading */ } = useSWR('/api/user/findAll', fetcher)
  const [pageTitle, setPageTitle] = useState<string>("Directory")


  if (!session) {
    return (
      <LayoutIndex>
        <SignIn />
      </LayoutIndex>
    )}
    
    if (error) return <div>failed to load</div>


  return (
    <LayoutIndex pageTitle={pageTitle}>
      <PlayerDirectory data={data} setPageTitle={(instrument) => setPageTitle(instrument)}/>
    </LayoutIndex>
  )
}

