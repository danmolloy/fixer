import Loading from "../components/index/loading";
import Layout from "../components/layout/layout";
import NotificationsIndex from "../components/notifications/notificationsIndex";
import useSWR from "swr";

const fetcher = (url: string):Promise<any> => fetch(url).then((res) => res.json())

export default function NotificationsPage() {
  const { data, error, isLoading, mutate } = useSWR(`/api/user/getNotifications`, fetcher)

  if (isLoading) {
    return <Loading />
  }

  if (error) {
    return <p>Error</p>
  }

  return (
    <Layout pageTitle="Notifications">
      <NotificationsIndex data={data} mutate={() => mutate()}/>
    </Layout>
  )
}