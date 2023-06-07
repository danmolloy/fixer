import { AiFillCalendar } from "react-icons/ai";
import { IoIosCreate } from "react-icons/io";
import HomeTile from "./homeTile";
import { FaUserFriends } from "react-icons/fa";

export default function Dashboard() {
  return (
    <div className="flex flex-col w-full md:w-2/3">

      <HomeTile title={"Calendar"} link={"/calendar"}>
        <div className="text-2xl m-1 text-zinc-900">
          <AiFillCalendar />
        </div>
      </HomeTile>
      <HomeTile title={"Directory"} link={"/directory"}>
      <div className="text-2xl m-1 text-zinc-900">
          <FaUserFriends />
        </div>
      </HomeTile>

      <HomeTile title={"Create Event"} link={"/event/create"}>
        <div className="text-2xl m-1 text-zinc-900">
          <IoIosCreate />
        </div>
      </HomeTile>

    </div>
  )
}