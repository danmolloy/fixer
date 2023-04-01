import Link from "next/link"
import React from "react"

interface TableRowMenuProps {
  removePlayer: () => void
  fixOrUnfix: (arg:"unfix"|"fix") => void
  sendMessage: () => void
  pokePlayer: () => void
  recieved: boolean
  accepted: boolean|null
  name: string
}



export default function BookingRowMenu(props: TableRowMenuProps) {
  const { removePlayer, sendMessage, fixOrUnfix, pokePlayer, recieved, accepted, name } = props;

  return (
    <div data-testid="table-row-menu" className="border absolute mr-4 bg-white shadow-sm rounded">
      
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
      </div>
  );
}