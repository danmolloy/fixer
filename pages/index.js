import HomeTile from "../components/index/homeTile";
import Layout from "../components/layout/layout";
import { AiOutlineFileAdd, AiOutlineSearch, AiOutlineUnorderedList, AiOutlineCalendar, AiOutlineMessage} from 'react-icons/ai'
import { useSession } from "next-auth/react"
import LandingPage from "../components/landingPage/landingPage";
import { useState } from "react";
import Dashboard from "../components/index/dashboard";


export default function Home() {
  const { data: session } = useSession()
  const [newUser, setNewUser] = useState(null)

  const testFunction = () => {
    console.log("Test Function")
    return;
  }
  

if (session) {
    return (
      <Layout >
        <Dashboard />
      </Layout>
    )}

  return (
    <LandingPage />
  )
}
