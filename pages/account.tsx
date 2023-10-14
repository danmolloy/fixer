import { useSession } from "next-auth/react";
import Layout from "../components/layout/layout";
import SettingsIndex from "../components/settings/settings";
import Loading from "../components/index/loading";
import LandingPage from "../components/landingPage/landingPage";

export default function AccountPage() {
  const { data: session, status } = useSession()

  if (status === "loading") {
    return (
     <Loading />
    )
  } 

  
  if (!session) {
    return (
      <Layout>
        <LandingPage />
      </Layout>
    )}

  return (
    <Layout pageTitle="Your Account">
      <SettingsIndex mutateData={() => {}} />
    </Layout>
  )
}