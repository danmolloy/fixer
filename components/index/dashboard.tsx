import { AiFillCalendar } from "react-icons/ai";
import { IoIosCreate } from "react-icons/io";
import HomeTile from "./homeTile";
import { FaUserFriends } from "react-icons/fa";

export default function Dashboard() {
  return (
    <div className="flex flex-col w-full md:w-2/3">

      <HomeTile children={<AiFillCalendar />} title={"Calendar"} link={"/calendar"} />
      <HomeTile children={<FaUserFriends />} title={"Directory"} link={"/directory"} />
      <HomeTile children={<IoIosCreate />} title={"Create Event"} link={"/event/create"} />

    </div>
  )
}