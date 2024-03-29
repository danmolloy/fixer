import { ReactNode, useState } from "react";
import SessionHeader from "./header";
import SessionMenu from "./sessionMenu";
import SessionFooter from "./footer";
import useSWR from "swr";
import LoadingLayout from "../loading";
import ErrorLayout from "../error";
import BasicInfo from "../../users/settings/basicInfo";
import { AdminWithEnsemble } from "../../users/settings/accountInfo/ensembleAdmin";

export type SessionLayoutProps = {
  children: ReactNode
  ensembleAdminList: AdminWithEnsemble[]
}

const fetcher = (url: string):Promise<any> => fetch(url).then((res) => res.json())

export default function SessionLayout(props: SessionLayoutProps) {
  const { children, ensembleAdminList } = props;
  const [showMenu, setShowMenu] = useState<boolean>(false)
  const [reducedHeader, setReducedHeader] = useState<boolean>(false)
  const { data, mutate, error, isLoading } = useSWR('/api/index/getUserData', fetcher)


  const incompleteProfile = (data && data?.email === null || data?.instrumentList === null || data?.firstName === null || data?.lastName === null || data?.mobileNumber === null)

  if (isLoading || !data) {
    return (
      <LoadingLayout />
    )
  }

  if (error) {
    return (
      <ErrorLayout />
    )
  }

  return (
    <div data-testid="session-layout" className="min-h-screen w-screen flex flex-col justify-between font-raleway">
     <SessionHeader 
        ensembleAdminList={ensembleAdminList} 
        reducedHeader={reducedHeader} 
        setReducedHeader={arg => setReducedHeader(arg)} 
        notifications={data.playerCalls.filter(i => i.accepted === null).length > 0 ? true : false} 
        showMenu={showMenu} 
        setShowMenu={(arg) => setShowMenu(arg)}/>
        {showMenu 
          && <SessionMenu ensembleAdminList={ensembleAdminList} setShowMenu={arg => setShowMenu(arg)} />}
        <div data-testid="session-children" className="layout-children w-screen  flex flex-col items-center bg-white pb-12 mt-16">
          {incompleteProfile 
          ? <BasicInfo user={data}/>
          : children}
        </div>
        <SessionFooter />
    </div>
  )
}