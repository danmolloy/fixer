import { useRouter } from "next/router";
import LayoutIndex from "../../components/layout";
import useSWR from "swr";
import Index404 from "../../components/layout/components/index404";
import IsLoadingEventIndex from "../../components/event/eventDetail/isLoadingEventIndex";
import SignIn from "../../components/layout/signIn";
import { useSession } from "next-auth/react";
import NotificationDetail from "../../components/notifications/detail";

const fetcher = (url: string):Promise<any> => fetch(url).then((res) => res.json())


export default function NotificationDetailPage() {
  const router = useRouter()
  const { id } = router.query;
  const { data, error, mutate, isLoading } = useSWR(id ? `/api/playerCall/${id}` : null, fetcher)
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
      ? <IsLoadingEventIndex />
      : session
      ? <NotificationDetail playerCall={data} />
      : <SignIn />}
    </LayoutIndex>
  )
}