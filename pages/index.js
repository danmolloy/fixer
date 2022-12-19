import HomeTile from "../components/index/homeTile";
import Layout from "../components/layout/layout";
import { AiOutlineFileAdd, AiOutlineSearch, AiOutlineUnorderedList, AiOutlineCalendar, AiOutlineMessage} from 'react-icons/ai'
import { useSession } from "next-auth/react"
import LandingPage from "../components/index/landingPage";
import { useState } from "react";


export default function Home() {
  const { data: session } = useSession()
  const [newUser, setNewUser] = useState(null)

  const testFunction = () => {
    console.log("Test Function")
    return;
  }
  

if (session) {
    return (
      <Layout home>
        
        <div className="tile-list" data-testid="home-dashboard">
          {/* <HomeTile link={"/event/quickfix"} title="Quick Fix">
            <MdOutlineQuickreply className="tile-icon" />
          </HomeTile> */}
          <HomeTile id="create-event-link" link={"/event/create"} title="Fix an Event">
            <AiOutlineFileAdd className="tile-icon"/>
          </HomeTile>
          <HomeTile id="directory-link" link={"/directory"} title="Search Directory">
            <AiOutlineSearch className="tile-icon"/>
          </HomeTile>
          <HomeTile id="upcoming-events-link" link={"/events"} title="Upcoming Events">
            <AiOutlineCalendar className="tile-icon"/>
          </HomeTile>
        </div>
      </Layout>
    )}

  return (
    <LandingPage />
  )
}
