import { FieldArray } from "formik"
import Link from "next/link"
import React from "react"
import MenuShell from "../index/menuShell"

export type BookingTableRowMenuProps = {
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
  fixOrUnfix: (fixOrUnfix: boolean, callId: number, musicianEmail: string) => void
  replace: (playerCallId) => void
  preview?: boolean
}



export default function BookingRowMenu(props: BookingTableRowMenuProps) {
  const { replace, musician, setShowMenu, removePlayer, sendMessage, pokePlayer, fixOrUnfix, preview } = props;

  return (
    <MenuShell testId="booking-row-menu" title={musician.name} setShowMenu={() => setShowMenu()}>
          {preview 
          ? <button  className="text-center p-2 hover:bg-zinc-50 w-full ">
          <p className="">
          View Profile
          </p>
        </button>
          : <Link data-testid="profile-link"  href={`/user/${musician.name}`} className="text-center p-2 hover:bg-zinc-50 w-full ">
            <p className="">
            View Profile
            </p>
          </Link>}
        {musician.recieved === false || musician.accepted === false
        && <button 
        data-testid="remove-btn"
        onClick={(e) => {e.preventDefault(); removePlayer(musician.id)}}  className="p-2 hover:bg-zinc-50 w-full">
            Remove from list
        </button>}
        <button 
        data-testid="msg-btn"
        onClick={(e) => {
          e.preventDefault();
          sendMessage(musician.name)
          }}  className="p-2 hover:bg-zinc-50 w-full">
            Send Message
        </button>
        {!musician.accepted 
      && <button data-testid="fix-btn" onClick={e => {e.preventDefault(); fixOrUnfix(!musician.accepted, musician.id, musician.email)}} className="p-2 hover:bg-zinc-50 w-full">
        Fix Player
      </button>}
      {musician.accepted 
      && <button data-testid="unfix-btn" onClick={e => {e.preventDefault(); fixOrUnfix(!musician.accepted, musician.id, musician.email)}} className="p-2 hover:bg-zinc-50 w-full">
        Unfix Player
      </button>}
      {musician.accepted 
      && <button data-testid="replace-btn" onClick={e => {e.preventDefault(); replace(musician.id)}} className="p-2 hover:bg-zinc-50 w-full">
        Replace
      </button>}
      {musician.recieved && musician.accepted === null
      && <button data-testid="poke-btn" onClick={e => {e.preventDefault(); pokePlayer(musician.name)}} className="p-2 hover:bg-zinc-50 w-full">
        Poke
      </button>}
    </MenuShell>
  );
}