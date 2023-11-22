import { useSession } from "next-auth/react"
import LayoutIndex from "../components/layout"
import SignIn from "../components/layout/signIn"
import { useRouter } from "next/router"

export default function SignInPage() {
  const { data: session, status } = useSession()
  const router = useRouter()

  if (session) {
    router.push("/")
  }

  return (
    <LayoutIndex >
      <SignIn />
    </LayoutIndex>    
  )
}

