'use client'
import axios from "axios";
import Link from "next/link"
import { useState } from "react"
import { SlOptions } from "react-icons/sl"
import { useRouter } from "next/navigation";

export type EventMenuProps = {
  eventId: string
}

export default function EventMenu(props: EventMenuProps) {
  const { eventId } = props;
  const [showMenu, setShowMenu] = useState<boolean>(false)
  const router = useRouter();

  const handleDelete = async () => {
    return confirm(`Are you sure you want to delete this event?`)
    && await axios.post("/event/delete", {eventId: eventId}).then(() => {
      router.push("/")
      })
    
  }

  return (
    <div data-testid="event-menu">
      <button className="rounded-full  hover:bg-slate-50 p-1 text-center" data-testid="options-btn"  onClick={() => setShowMenu(!showMenu)}>
        <SlOptions />
      </button>
      {showMenu 
      && <div data-testid="menu-options" className="absolute bg-white border shadow flex flex-col text-sm font-medium w-48 -ml-36 rounded">
        <Link href={`update/${eventId}`} className="hover:bg-gray-50 px-2 py-1 w-full">Update Event</Link> 
        <button className="hover:bg-gray-50 px-2 py-1 w-full">Message All</button>
        <button className="hover:bg-gray-50 px-2 py-1 w-full">Export Event Details</button>
        <button className="hover:bg-gray-50 px-2 py-1 w-full">Export Orchestra List</button>
        <button data-testid="cancel-btn" className="hover:bg-gray-50 px-2 py-1 hover:text-red-600 w-full" onClick={() => {handleDelete(); setShowMenu(false)}}>Cancel Event</button>   
      </div>}
    </div>
  )
}