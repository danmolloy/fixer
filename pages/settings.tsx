import { useSession } from "next-auth/react";
import Layout from "../components/layout/layout";
import SettingsIndex from "../components/settings/settings";

export default function SettingsPage() {
  const { data: session } = useSession()

  if (!session) return <div>No session</div>

  return (
    <Layout pageTitle="Your Settings">
      <SettingsIndex />
    </Layout>
  )
}