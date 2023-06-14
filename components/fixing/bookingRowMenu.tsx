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
  fixOrUnfix: (fixOrUnfix: boolean, callId: number, musicianEmail: string) => void
  replace: (playerCallId) => void
}



export default function BookingRowMenu(props: TableRowMenuProps) {
  const { replace, musician, setShowMenu, removePlayer, sendMessage, pokePlayer, fixOrUnfix } = props;

  return (
    <MenuShell title={musician.name} setShowMenu={() => setShowMenu()}>
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
        onClick={(e) => {
          e.preventDefault();
          sendMessage(musician.name)
          }}  className="p-2 hover:bg-zinc-50 w-full">
            Send Message
        </button>
        {!musician.accepted 
      && <button onClick={e => {e.preventDefault(); fixOrUnfix(!musician.accepted, musician.id, musician.email)}} className="p-2 hover:bg-zinc-50 w-full">
        Fix Player
      </button>}
      {musician.accepted 
      && <button onClick={e => {e.preventDefault(); fixOrUnfix(!musician.accepted, musician.id, musician.email)}} className="p-2 hover:bg-zinc-50 w-full">
        Unfix Player
      </button>}
      {musician.accepted 
      && <button onClick={e => {e.preventDefault(); replace(musician.id)}} className="p-2 hover:bg-zinc-50 w-full">
        Replace
      </button>}
      {musician.recieved && musician.accepted === null
      && <button onClick={e => {e.preventDefault(); pokePlayer(musician.name)}} className="p-2 hover:bg-zinc-50 w-full">
        Poke
      </button>}
    </MenuShell>
  );
}


/* 
<button
        onClick={(e) => {e.preventDefault(); }}  className="text-center p-2 hover:bg-zinc-50 w-full">
          <Link  href={`/user/${name}`}>
            View Profile
          </Link>
        </button>
        
      <button 
        onClick={(e) => {e.preventDefault(); removePlayer()}}  className="p-2 hover:bg-zinc-50 w-full">
            Remove from list
        </button>
        <button 
        onClick={(e) => {
          e.preventDefault();
          sendMessage()
          }}  className="p-2 hover:bg-zinc-50 w-full">
            Send Message
        </button>
      {!accepted 
      && <button onClick={e => {e.preventDefault(); fixOrUnfix("fix")}} className="p-2 hover:bg-zinc-50 w-full">
        Fix Player
      </button>}
      {recieved && !accepted 
      && <button onClick={e => {e.preventDefault(); pokePlayer()}} className="p-2 hover:bg-zinc-50 w-full">
        Poke
      </button>}
 */