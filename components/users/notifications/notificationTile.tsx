import ButtonPrimary from "../../index/buttonPrimary";
import { TiTick, TiTimes } from "react-icons/ti";
import axios from "axios";
import { useState } from "react";
import { AiOutlineLoading } from "react-icons/ai";
import Link from "next/link";
import { Prisma } from "@prisma/client";
import { DateTime } from "luxon";

export type PlayerCallWithEvent = Prisma.PlayerCallGetPayload<{
  include: {
    eventInstrument: {
      include: {
        event: true
      }
    }
  }
}>

export type NotificationTileProps = {
  notification: PlayerCallWithEvent,
  mutate: () => void
}

export default function NotificationTile(props: NotificationTileProps) {
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
    <div data-testid="notification-tile" className="border rounded shadow m-1">
      <div className="p-4">
      <p data-testid="notification-created-at" className="text-sm text-center text-zinc-400">{DateTime.fromJSDate(new Date(notification.createdAt)).toFormat("h:mma ddd Do MMMM YYYY")}</p>
      <div>
        <p data-testid="fixer-name">
          {notification.eventInstrument.event.fixerName}
        </p>
        <p data-testid="offer-or-check">
          {notification.bookingOrAvailability === "Booking" ? "offers:" : "checks availability for:"}
        </p>
        </div>
        <p data-testid="event-title">
        {notification.eventInstrument.event.eventTitle} 
        </p>
        <p data-testid="ensemble-name">
        with {notification.eventInstrument.event.ensembleName}
        </p>
        <div className="flex flex-row justify-evenly my-4">
          <Link data-testid="event-link" href={`/event/${notification.eventInstrument.eventId}`}>
            <ButtonPrimary text="View Event" id="view-event-btn" className="border-indigo-600 text-indigo-600 hover:bg-indigo-50" />
          </Link>
{/*         <ButtonPrimary text="Contact Fixer" id="contact-btn" className="border-yellow-500 text-yellow-500 hover:bg-yellow-50" />
 */}        </div>
        <div data-testid="accepted-status" className="flex flex-col items-center ">
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
          <button data-testid="decline-btn" disabled={updateStatus === 'updating' ? true: false} onClick={() => handleSubmit(false, notification.id, notification.eventInstrumentId)} className="disabled:text-zinc-400 border-r text-white bg-amber-600 rounded hover:bg-amber-500 h-12 w-1/2  flex flex-row justify-center items-center">
            <TiTimes />
            <p className="p-2">Decline</p>
            </button>
          <button data-testid="accept-btn" disabled={updateStatus === 'updating' ? true: false} onClick={() => handleSubmit(true, notification.id, notification.eventInstrumentId)} className="disabled:text-zinc-400 bg-indigo-600 rounded text-white hover:bg-indigo-500 h-12 w-1/2 flex flex-row justify-center items-center">
            <TiTick />
            <p className="p-2">Accept</p>
          </button>
       </div>}
      </div>
  )
}