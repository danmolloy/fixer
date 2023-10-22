import moment from "moment";
import ButtonPrimary from "../index/buttonPrimary";
import { TiTick, TiTimes } from "react-icons/ti";
import axios from "axios";
import { useState } from "react";
import { AiOutlineLoading } from "react-icons/ai";
import Link from "next/link";

export default function NotificationTile(props) {
  const { notification, mutate } = props;
  const [updateStatus, setUpdateStatus] = useState<string>("idle")

  const handleSubmit = (accepted: boolean, callId: number, eventInstrumentId: number) => {
    setUpdateStatus("updating")
    const data = {
      accepted: accepted
    }
    axios.post('/api/fixing/updatePlayerCall', {playerCallId: callId, data: data}).then(() => {
      mutate();
      setUpdateStatus("idle");
    }).catch(() => {
      setUpdateStatus("error")
    })
  }

  return (
    <div className="border rounded shadow m-1">
      <div className="p-4">
      <p className="text-sm text-center text-zinc-400">{moment(new Date(notification.createdAt)).format("h:mma ddd Do MMMM YYYY")}</p>
      <p>{`
        ${notification.eventInstrument.event.fixerName}
        ${notification.bookingOrAvailability === "Booking" ? "offers:" : "checks availability for:"}
        `}</p>
        <p>
        {`
        ${notification.eventInstrument.event.eventTitle} 
        with ${notification.eventInstrument.event.ensembleName}
        `}
        </p>
        <div className="flex flex-row justify-evenly my-4">
          <Link href={`/event/${notification.eventInstrument.eventId}`}>
            <ButtonPrimary text="View Event" id="view-event-btn" className="border-indigo-600 text-indigo-600 hover:bg-indigo-50" />
          </Link>
{/*         <ButtonPrimary text="Contact Fixer" id="contact-btn" className="border-yellow-500 text-yellow-500 hover:bg-yellow-50" />
 */}        </div>
        <div className="flex flex-col items-center ">
          {updateStatus === "updating" 
          ? <div className="self-center animate-spin text-blue-600">
            <AiOutlineLoading />
            </div>
          : <p className="text-center text-zinc-600 text-sm">
            {notification.accepted === true 
            && "You accepted this offer" }
            {notification.accepted === false && "You declined this offer"}
          </p>}
        </div>
        </div>
        {notification.accepted === null 
        && <div className="flex flex-row justify-evenly ">
          <button disabled={updateStatus === 'updating' ? true: false} onClick={() => handleSubmit(false, notification.id, notification.eventInstrumentId)} className="disabled:text-zinc-400 border-r text-white bg-amber-600 rounded hover:bg-amber-500 h-12 w-1/2  flex flex-row justify-center items-center">
            <TiTimes />
            <p className="p-2">Decline</p>
            </button>
          <button disabled={updateStatus === 'updating' ? true: false} onClick={() => handleSubmit(true, notification.id, notification.eventInstrumentId)} className="disabled:text-zinc-400 bg-indigo-600 rounded text-white hover:bg-indigo-500 h-12 w-1/2 flex flex-row justify-center items-center">
            <TiTick />
            <p className="p-2">Accept</p>
          </button>
       </div>}
      </div>
  )
}