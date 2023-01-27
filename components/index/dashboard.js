import { AiOutlineCalendar, AiOutlineFileAdd, AiOutlineSearch } from "react-icons/ai";
import HomeTile from "./homeTile";

export default function Dashboard() {
  return (

    <div className="tile-list" data-testid="home-dashboard">
    {/* <HomeTile link={"/event/quickfix"} title="Quick Fix">
      <MdOutlineQuickreply className="tile-icon" />
    </HomeTile> */}
    <HomeTile id="upcoming-events-link" link={"/events"} title="Upcoming Events">
      <AiOutlineCalendar className="tile-icon"/>
    </HomeTile>
    <HomeTile id="directory-link" link={"/directory"} title="Search Directory">
      <AiOutlineSearch className="tile-icon"/>
    </HomeTile>
    <HomeTile id="create-event-link" link={"/event/create"} title="Fix an Event">
      <AiOutlineFileAdd className="tile-icon"/>
    </HomeTile>
  </div>
  )
}