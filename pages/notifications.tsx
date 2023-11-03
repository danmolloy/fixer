import { useSession } from "next-auth/react";
import Loading from "../components/index/loading";
import LandingPage from "../components/externalSite/landingPage";
import NotificationsIndex from "../components/users/notifications/notificationsIndex";
import useSWR from "swr";
import LayoutIndex from "../components/layout";
import LoadingLayout from "../components/layout/loading";

const fetcher = (url: string):Promise<any> => fetch(url).then((res) => res.json())

export default function NotificationsPage() {
  const { data, error, isLoading, mutate } = useSWR(`/api/user/getNotifications`, fetcher)
  const { data: session, status } = useSession()

  if (isLoading || status === "loading") {
    return <LoadingLayout />
  } else if (!session) {
      <LayoutIndex>
        <LandingPage />
      </LayoutIndex>
  }

  if (error) {
    return <p>Error</p>
  }


  return (
    <LayoutIndex pageTitle="Notifications">
      <NotificationsIndex playerCalls={data.playerCalls} mutate={() => mutate()}/>
    </LayoutIndex>
  )
}