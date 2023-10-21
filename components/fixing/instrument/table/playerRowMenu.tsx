import { PlayerCall } from "@prisma/client"
import axios from "axios";
import Link from "next/link";
import { useEffect, useRef } from "react";

export type PlayerRowMenuProps = {
  playerCall: PlayerCall
  setShowMenu: (arg: boolean) => void

}

export default function PlayerRowMenu(props: PlayerRowMenuProps) {
  const { playerCall, setShowMenu } = props;
  const ref = useRef(null)

  useEffect(() => {
    ref.current.focus()
  }, [])

  const updatePlayer = async (data: {}) => {
    const reqBody = {playerCallId: playerCall.id, data: data}
    await axios.post("/api/fixing/updatePlayerCall", reqBody)
    setShowMenu(false)
  }

  const sendMessage = async (message?: string) => {
    if (!message) {
      message = `Dan Molloy sends the following message: "${prompt(`What is your message to this player?`)}"`
    }
    const reqBody = {
      message: message
    }
    if (reqBody.message === null || reqBody.message.length === 0) {
      return;
    } else {
      return axios.post("/api/fixing/messagePlayer", reqBody);
    }
  }

  const deletePlayerCall = async() => {
    const reqBody = {playerCallId: playerCall.id}

    await axios.post("/api/fixing/removePlayer", reqBody)
  }

  return (
    <div tabIndex={-1}  ref={ref} onBlur={() => setTimeout(() => setShowMenu(false), 150)} data-testid="player-row-menu" className="flex flex-col border rounded shadow items-center absolute w-40 bg-white -ml-1 -mt-36">
      <Link className="hover:text-indigo-600 w-full text-center px-1" data-testid="profile-link"  href={`/user/${playerCall.musicianId}`}>
        View profile
      </Link>
      <button className="hover:text-indigo-600 w-full px-2 py-1" onClick={() => {updatePlayer({accepted: true})}}>
        {playerCall.bookingOrAvailability === "Booking" 
        ? "Confirm booking":"Confirm availability"}
      </button>
      {playerCall.bookingOrAvailability === "Availability"  
      && <button className="hover:text-indigo-600 w-full px-2 py-1 text" onClick={() => {updatePlayer({recieved: false, accepted: false, bookingOrAvailability: "Booking"})}}>
        Make offer to book
      </button>}
      <button className="hover:text-indigo-600 w-full px-2 py-1" onClick={() => deletePlayerCall()}>
      {playerCall.bookingOrAvailability === "Booking" 
      && playerCall.recieved === true && playerCall.accepted !== false
        ? "Cancel offer":"Remove from list"}
      </button>
      {playerCall.bookingOrAvailability === "Booking" 
      && playerCall.accepted === true 
      && <button className="hover:text-indigo-600 w-full px-2 py-1" onClick={() => updatePlayer({status: "DEP OUT"})}>
        Dep player
      </button>}
      <button className="hover:text-indigo-600 w-full px-2 py-1" onClick={() => sendMessage()}>
        Send message
      </button>
      <button className="hover:text-indigo-600 w-full px-2 py-1" onClick={() => sendMessage(`Dan Molloy is reminding you to respond to his ${playerCall.bookingOrAvailability === "Booking" ? "offer": "availability check"}.`)}>
        Poke
      </button>
    </div>
  )
}
