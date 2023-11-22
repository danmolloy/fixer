import { useSession } from "next-auth/react";
import SettingsIndex from "../components/users/settings";
import LandingPage from "../components/externalSite/landingPage";
import LayoutIndex from "../components/layout";
import LoadingLayout from "../components/layout/loading";
import useSWR from "swr";
import SignIn from "../components/layout/signIn";

const fetcher = (url: string):Promise<any> => fetch(url).then((res) => res.json())


export default function AccountPage() {
  const { data: session, status } = useSession()
  const { data, error, isLoading } = useSWR(`/api/user/settings`, fetcher)

  if (isLoading) {
    return (
     <LoadingLayout />
    )
  } 

  return (
    <LayoutIndex pageTitle="Your Account">
      {session 
      ? <SettingsIndex user={data} /> 
      : <SignIn />}
    </LayoutIndex>
  )
}