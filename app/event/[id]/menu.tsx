'use client'
import axios from "axios";
import Link from "next/link"
import { useState } from "react"
import { SlOptions } from "react-icons/sl"
import { useRouter } from "next/navigation";

export default function EventMenu(props: {eventId:string}) {
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
    <div >
      <button className="rounded-full  hover:bg-slate-200 p-1 text-center" data-testid="options-btn"  onClick={() => setShowMenu(!showMenu)}>
        <SlOptions />
      </button>
      {showMenu 
      && <div data-testid="external-menu" className="absolute bg-white z-10 right-0 border mr-2 mt-3 w-1/2 shadow flex flex-col">
      <Link href={`update/${eventId}`} className="hover:bg-slate-100 hover:text-indigo-500 w-full">Update Event</Link> 
      <button>Message All</button>
      <button>Export Event</button>
      <button>Export Orchestra List</button>
      <button className="hover:bg-slate-100 hover:text-red-500 w-full" onClick={() => {handleDelete(); setShowMenu(false)}}>Cancel Event</button>   
</div>}
    </div>
  )
}