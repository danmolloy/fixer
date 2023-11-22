import { useSession } from "next-auth/react";
import LandingPage from "../components/externalSite/landingPage";
import NotificationsIndex from "../components/users/notifications";
import useSWR from "swr";
import LayoutIndex from "../components/layout";
import LoadingLayout from "../components/layout/loading";
import SignIn from "../components/layout/signIn";

const fetcher = (url: string):Promise<any> => fetch(url).then((res) => res.json())

export default function NotificationsPage() {
  const { data, error, isLoading, mutate } = useSWR(`/api/user/getNotifications`, fetcher)
  const { data: session, status } = useSession()

  if (isLoading) {
    return <LoadingLayout />
  }

  return (
    <LayoutIndex pageTitle="Notifications">
      {session 
      ? <NotificationsIndex playerCalls={data.playerCalls} mutate={() => mutate()}/> 
      : <SignIn />}
    </LayoutIndex>
  )
}