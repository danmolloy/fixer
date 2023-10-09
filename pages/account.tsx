import { useSession } from "next-auth/react";
import Layout from "../components/layout/layout";
import SettingsIndex from "../components/settings/settings";
import Loading from "../components/index/loading";

export default function AccountPage() {
  const { data: session, status } = useSession()

  if (status === "loading") {
    return (
     <Loading />
    )
  } 

  if (!session) return <div>No session</div>

  return (
    <Layout pageTitle="Your Account">
      <SettingsIndex />
    </Layout>
  )
}