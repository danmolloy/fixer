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

  const handleSubmit = (accepted: boolean, callId: number) => {
    setUpdateStatus("updating")
    axios.post('/api/notifications/accept', {accepted, callId}).then(() => {
      mutate();
      setUpdateStatus("idle");
    }).catch(() => {
      setUpdateStatus("error")
    })
  }

  return (
    <div className="border rounded shadow-sm m-1 ">
      <div className="p-4">
      <p className="text-sm text-zinc-400">{moment(new Date(notification.createdAt)).format("h:mma ddd Do MMMM YYYY")}</p>
      <p>{`
        ${notification.eventInstrument.event.fixerName} 
        ${notification.bookingOrAvailability === "Booking" ? "offers:" : "checks availability for:"}
        `}</p>
        <p>
        {`
        ${notification.eventInstrument.event.eventTitle} with 
        ${notification.eventInstrument.event.ensembleName}
        `}
        </p>
        <div className="flex flex-row justify-evenly my-4">
          <Link href={`/event/${notification.eventInstrument.eventId}`}>
            <ButtonPrimary text="View Event" id="view-event-btn" className="border-emerald-500 text-emerald-500 hover:bg-emerald-50" />
          </Link>
        <ButtonPrimary text="Contact Fixer" id="contact-btn" className="border-yellow-500 text-yellow-500 hover:bg-yellow-50" />
        </div>
        <div className="flex flex-col items-center h-6">
          {updateStatus === "updating" 
          ? <div className="self-center animate-spin text-blue-600">
            <AiOutlineLoading />
            </div>
          : <p className="text-center text-zinc-600 text-sm">
            {notification.accepted === true 
            ? "You accepted this offer" 
            : notification.accepted === false ? "You declined this offer" : "You are yet to respond"}
          </p>}
        </div>
        </div>
        {notification.accepted === null 
        && <div className="flex flex-row justify-evenly border-t ">
          <button disabled={updateStatus === 'updating' ? true: false} onClick={() => handleSubmit(false, notification.id)} className="disabled:text-zinc-400 border-r hover:bg-slate-100 h-12 w-1/2 flex flex-row justify-center items-center">
            <p className="p-2">Decline</p>
            <TiTimes />
            </button>
          <button disabled={updateStatus === 'updating' ? true: false} onClick={() => handleSubmit(true, notification.id)} className="disabled:text-zinc-400 hover:bg-slate-100 h-12 w-1/2 flex flex-row justify-center items-center">
            <p className="p-2">Accept</p>
            <TiTick />
          </button>
       </div>}
      </div>
  )
}