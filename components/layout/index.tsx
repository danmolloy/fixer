import { ReactNode } from "react";
import ExternalLayout from "./external";
import { useSession } from "next-auth/react";
import SessionLayout from "./session";

export type LayoutIndexProps = {
  children: ReactNode
  pageTitle?: string
}

export default function LayoutIndex(props: LayoutIndexProps) {
  const { children, pageTitle } = props;
  const { data: session, status } = useSession()

  if (session) {
    return (
      <SessionLayout>
        {children}
      </SessionLayout>
    )
  }

  return (
   <ExternalLayout>
    {children}
   </ExternalLayout>
  )
}