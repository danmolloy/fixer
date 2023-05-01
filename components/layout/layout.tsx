import { useState } from "react";
import Footer from "./footer";
import Header, { menuItems } from "./header";
import Menu from "./menu";
import React from "react";
import LandingFooter from "../landingPage/landingFooter";
import { useSession } from "next-auth/react";
import { landingMenuItems } from "../landingPage/landingPage";
import UserInfoForm from "../index/userInfoForm";
import useSWR from "swr";
import Loading from "../index/loading";

//const fetcher = (url: string):Promise<any> => fetch(url).then((res) => res.json())

interface LayoutProps {
  children: React.ReactNode
  pageTitle?: string
}

export default function Layout(props: LayoutProps) {
  const { children, pageTitle } = props
  const { data: session, status } = useSession()
  //const { data, error, isLoading, mutate } = useSWR(session ? `/api/user/getNotifications` : null, fetcher)

  const [showMenu, setShowMenu] = useState(false)

  if (status === "loading") {
    return (
     <Loading />
    )
  } 
  
  return (
    <div className="min-h-screen w-screen flex flex-col justify-between font-nunito " data-testid="layout-div">
      <Header setShowMenu={(bool) => setShowMenu(bool)} showMenu={showMenu} session={session ? true : false} />
      {showMenu && <Menu signedIn={session ? true : false} setShowMenu={() => setShowMenu(false)} menuItems={session ? menuItems : landingMenuItems}/>}
      <div className={showMenu ? "w-full p-3 blur":"w-full p-3"}>
        <h1 className="ml-2 text-2xl">{pageTitle}</h1>
      </div>
      <div onFocus={() => setShowMenu(false)} className={showMenu ? "layout-children w-screen p-2 flex flex-col items-center bg-white blur": "layout-children w-screen p-2 flex flex-col items-center bg-white pb-12"} data-testid="main-div">
        {children}
      </div>
      <LandingFooter session={session ? true : false}/>
    </div>
  )
}