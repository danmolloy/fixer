import { FieldArray } from "formik"
import Link from "next/link"
import React from "react"
import MenuShell from "../index/menuShell"

interface TableRowMenuProps {
  /* removePlayer: () => void
  fixOrUnfix: (arg:"unfix"|"fix") => void
  sendMessage: () => void
  pokePlayer: () => void
  recieved: boolean
  accepted: boolean|null
  name: string */
  musician: {
    id: number
    email: string
    name: string
    calls: {
      id: string
      startTime: string
    }[]
    recieved: boolean
    accepted: boolean|null
    }
  setShowMenu: () => void
  removePlayer: (callId: number) => void
  sendMessage: (name: string) => void
  pokePlayer: (name: string) => void
  offerOrDecline: (offerOrDecline: boolean, callId: number, musicianEmail: string) => void

}



export default function AvailabilityRowMenu(props: TableRowMenuProps) {
  const { musician, setShowMenu, removePlayer, sendMessage, pokePlayer, offerOrDecline } = props;

  return (
    <MenuShell testId={"availability-row-menu"} title={musician.name} setShowMenu={() => setShowMenu()}>
          <Link  href={`/user/${musician.name}`} className="text-center p-2 hover:bg-zinc-50 w-full ">
            <p className="">
            View Profile
            </p>
          </Link>
        {musician.recieved === false || musician.accepted === false
        && <button 
        onClick={(e) => {e.preventDefault(); removePlayer(musician.id)}}  className="p-2 hover:bg-zinc-50 w-full">
            Remove from list
        </button>}
        <button
        data-testid="send-msg-btn" 
        onClick={(e) => {
          e.preventDefault();
          sendMessage(musician.name)
          }}  className="p-2 hover:bg-zinc-50 w-full">
            Send Message
        </button>
        <button data-testid="offer-btn" onClick={e => {e.preventDefault(); offerOrDecline(true, musician.id, musician.email)}} className="p-2 hover:bg-zinc-50 w-full">
        Offer
      </button>
{/*       <button data-testid="offer-btn" onClick={e => alert("Not yet implemented")} className="p-2 hover:bg-zinc-50 w-full">
        Offer to replace..
      </button> */}
      <button data-testid="decline-btn" onClick={e => {e.preventDefault(); offerOrDecline(false, musician.id, musician.email)}} className="p-2 hover:bg-zinc-50 w-full">
        Decline
      </button>
      {musician.recieved && musician.accepted === null
      && <button onClick={e => {e.preventDefault(); pokePlayer(musician.name)}} className="p-2 hover:bg-zinc-50 w-full">
        Poke
      </button>}
    </MenuShell>
  );
}