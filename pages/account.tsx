import { useSession } from "next-auth/react";
import SettingsIndex from "../components/users/settings";
import Loading from "../components/index/loading";
import LandingPage from "../components/externalSite/landingPage";
import LayoutIndex from "../components/layout";
import LoadingLayout from "../components/layout/loading";
import useSWR from "swr";

const fetcher = (url: string):Promise<any> => fetch(url).then((res) => res.json())


export default function AccountPage() {
  const { data: session, status } = useSession()
  const { data, error, isLoading } = useSWR(`/api/user/settings`, fetcher)

  if (status === "loading" || isLoading || error) {
    return (
     <LoadingLayout />
    )
  } 

  
  if (!session) {
    return (
      <LayoutIndex>
        <LandingPage />
      </LayoutIndex>
    )}

  return (
    <LayoutIndex pageTitle="Your Account">
      <SettingsIndex 
        user={data} />
    </LayoutIndex>
  )
}