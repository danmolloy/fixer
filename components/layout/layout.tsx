import { useState } from "react";
import Header, { menuItems } from "./header";
import Menu from "./menu";
import React from "react";
import LandingFooter from "../externalSite/landingPage/landingFooter";
import { useSession } from "next-auth/react";
import { landingMenuItems } from "../externalSite/landingPage";
import Loading from "../index/loading";
import LoadingHeader from "./loading/loadingHeader";
import Banner from "./banner";
import useSWR from "swr";
import SettingsIndex from "../users/settings";
import { useRouter } from "next/router";



export type LayoutProps = {
  children: React.ReactNode
  pageTitle?: string
}

const fetcher = (url: string):Promise<any> => fetch(url).then((res) => res.json())

export default function Layout(props: LayoutProps) {
  const { children, pageTitle } = props
  const { data: session, status } = useSession()
  const { data, mutate, error, isLoading } = useSWR('/api/index/getUserData', fetcher)
  const [showMenu, setShowMenu] = useState(false)
  const [reducedHeader, setReducedHeader] = useState(false)



if (status === "loading"|| isLoading) {
    return (
      <div className="min-h-screen w-screen flex flex-col justify-between font-nunito " data-testid="layout-div">
        <LoadingHeader />
        <div className={"layout-children w-screen p-2 flex flex-col items-center bg-white pb-12"} data-testid="main-div">
        <Loading />
        </div>
    </div>
  )
  }


  if (error) {
    return (
      <div className="min-h-screen w-screen flex flex-col justify-between font-nunito " data-testid="layout-div">
        <LoadingHeader />
        <div className={"layout-children w-screen p-2 flex flex-col items-center bg-white pb-12"} data-testid="main-div">
        <p>Error</p>
        </div>
    </div>
    )
  }


  if (session && data && data?.email === null || data?.instrument === null || data?.name === null || data?.mobileNumber === null) {
    return (
      <div className="items-center min-h-screen w-screen flex flex-col justify-between font-nunito " data-testid="layout-div">
        <Header  reducedHeader={reducedHeader} setReducedHeader={(arg) => setReducedHeader(arg)} setShowMenu={(bool) => setShowMenu(bool)} showMenu={showMenu} session={session ? true : false} notifications={session && data && data.playerCalls.filter(i => i.accepted === null).length > 0 ? true: false}/>
        <div className="mt-32 w-full flex justify-center">
        <SettingsIndex missingInfo={true} mutateData={() => mutate()} />
        </div>
        <LandingFooter />
      </div>
    )
  }
  
  return (
    <div className="min-h-screen w-screen flex flex-col justify-between font-nunito " data-testid="layout-div">
      <Header  reducedHeader={reducedHeader} setReducedHeader={(arg) => setReducedHeader(arg)} setShowMenu={(bool) => setShowMenu(bool)} showMenu={showMenu} session={session ? true : false} notifications={session && data && data.playerCalls.filter(i => i.accepted === null).length > 0 ? true: false}/>
      <div className="mt-[72px]">
      {showMenu && <Menu signedIn={session ? true : false} setShowMenu={() => setShowMenu(false)} menuItems={session ? menuItems : landingMenuItems}/>}
      {pageTitle.length > 0 
      && <div className={showMenu ? "w-full p-3 blur text-center":"w-full p-3 text-center"}>
        <h1 className="ml-2 tex-center text-3xl ">{pageTitle}</h1>
      </div>}
      <div onFocus={() => setShowMenu(false)} className={`${showMenu ? "blur": ""} layout-children w-screen p-2 flex flex-col items-center bg-white pb-12`} data-testid="main-div">
        {children}
      </div>
      </div>
      <LandingFooter />
    </div>
  )
}