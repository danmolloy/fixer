import { useSession } from "next-auth/react";
import useSWR from "swr";
import LayoutIndex from "../components/layout";
import LoadingLayout from "../components/layout/loading";
import SignIn from "../components/layout/signIn";
import Notifications from "../components/notifications";

const fetcher = (url: string):Promise<any> => fetch(url).then((res) => res.json())

export default function NotificationsPage() {
  const { data, error, isLoading, mutate } = useSWR(`/api/playerCall/getAll`, fetcher)
  const { data: session, status } = useSession()

  if (isLoading) {
    return <LoadingLayout />
  }

  return (
    <LayoutIndex pageTitle="Notifications">
      {session 
      ? <Notifications playerCalls={data ? data : []} mutate={() => mutate()}/> 
      : <SignIn />}
    </LayoutIndex>
  )
}