import { ReactNode, useState } from "react";
import ExternalHeader from "./externalHeader";
import ExternalFooter from "./externalFooter";
import ExternalMenu from "./externalMenu";

export type ExternalLayoutProps = {
  children: ReactNode
};

export default function ExternalLayout(props: ExternalLayoutProps) {
  const { children } = props;
  const [showMenu, setShowMenu] = useState<boolean>(false)
  const [reducedHeader, setReducedHeader] = useState<boolean>(false)


  return (
    <div data-testid="external-layout" className="min-h-screen w-screen flex flex-col justify-between font-raleway">
      <ExternalHeader showMenu={showMenu} setShowMenu={arg => setShowMenu(arg)} setReducedHeader={(arg) => setReducedHeader(arg)} reducedHeader={reducedHeader} />
      {showMenu && <ExternalMenu setShowMenu={(arg) => setShowMenu(arg)}/>}
      <div data-testid="external-children" className="layout-children w-screen  flex flex-col items-center bg-white pb-12 mt-16">
        {children}
      </div>
      <ExternalFooter />
    </div>
  )
}