import { useSession } from "next-auth/react"
import LayoutIndex from "../components/layout"
import SignIn from "../components/layout/signIn"
import CalendarIndex from "../components/calendar"

export default function SignInPage() {
  const { data: session, status } = useSession()


/* Only return this if no session */
  return (
    <LayoutIndex >
      <SignIn />
    </LayoutIndex>    
  )
}

