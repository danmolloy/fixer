import { AiOutlineCalendar } from "react-icons/ai";
import { IoCreateOutline } from "react-icons/io5";
import HomeTile from "./homeTile";
import { FiUsers } from "react-icons/fi";

export default function Dashboard() {
  return (
    <div className="flex flex-col w-full md:w-2/3">

      <HomeTile title={"Calendar"} link={"/calendar"}>
        <div className="text-2xl m-1 text-zinc-900">
          <AiOutlineCalendar />
        </div>
      </HomeTile>
      <HomeTile title={"Directory"} link={"/directory"}>
      <div className="text-2xl m-1 text-zinc-900">
          <FiUsers />
        </div>
      </HomeTile>

      <HomeTile title={"Create Event"} link={"/event/create"}>
        <div className="text-2xl m-1 text-zinc-900">
          <IoCreateOutline />
        </div>
      </HomeTile>

    </div>
  )
}