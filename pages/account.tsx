import { useSession } from "next-auth/react";
import SettingsIndex from "../components/users/settings/settings";
import Loading from "../components/index/loading";
import LandingPage from "../components/externalSite/landingPage/landingPage";
import LayoutIndex from "../components/layout";
import LoadingLayout from "../components/layout/loading";

export default function AccountPage() {
  const { data: session, status } = useSession()

  if (status === "loading") {
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
      <SettingsIndex mutateData={() => {}} />
    </LayoutIndex>
  )
}