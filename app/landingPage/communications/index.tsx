'use client'
import { useEffect, useRef, useState } from "react";
import { AiOutlineMail } from "react-icons/ai";
import { FaWhatsapp } from "react-icons/fa";
import { IoAlert } from "react-icons/io5";

const playerOne = "Fiona"
const playerTwo = "Aiden"
const fixer = "Brett"
const fixerFull = "Brett Sturdy"
const ensemble = "TQO"

export const notifications: {
  id: number
  type: 'email'|'whatsapp'|'response'|'alert'
  subject: string
  body: string
  caption: string
}[] = [
  {
    id: 0,
    type: "email",
    subject: "Gig Offer", 
    body: `Dear ${playerOne}, ${fixerFull} (${ensemble}) offers the following:`,
    caption: `Send gig offers instantly, no manual emails required.`,
  },
   {
    id: 7,
    type: "email",
    subject: "Availability Check",
    body: `Dear ${playerTwo}, ${fixerFull} (${ensemble}) checks your availability for:`,
    caption: `Check availability without lifting a finger.`
  },
  {
    id: 1,
    type: "email",
    subject: "Gig Offer", 
    body: `${fixer} adds a message to you: "Please invoice me directly."`,
    caption: `Keep things personal with custom notes.`,
  },
  {
    id: 2,
    type: "email",
    subject: "Availability Check",
    body: "The patch is **not** strictly tied.",
    caption: "Flexible fixing, however you like it."
  },
  {
    id: 3,
    type: "email",
    subject: "Response Confirmation",
    body: `You have accepted 24 July (${ensemble}). We have let the fixer know.`,
    caption: `We handle players responses instantly.`
  },
  {
    id: 4,
    type: "alert",
    subject: "List exhausted", 
    body: `Dear ${fixer}, we have exhausted your list of violists. Please add more players to continue fixing.`,
    caption: `We'll flag any issues before they become problems.'`
  },
  {
    id: 5,
    type: "response",
    subject: "Gig Fixed",
    body: `Dear ${fixer}, we are pleased to inform you that 24 July (${ensemble}}) is fixed.`,
    caption: `You'll know the moment a gig is fully fixed.`,
  },
  {
    id: 6,
    type: "whatsapp",
    subject: `URGENT: 24 July (${ensemble})`,
    body: `Hi, we have sent you an urgent email regarding 24 July (${ensemble}).`,
    caption: `We chase replies when time is tight.`,
  },
  {
    id: 8,
    type: "email",
    subject: `Released: 24 July (${ensemble})`,
    body: `Dear ${playerOne}, we have found a dep - you are now released from 24 July (${ensemble}).`,
    caption: `Find and notify deps automatically.`,
  },
  {
    id: 9,
    type: "email",
    subject: "Update: 24 July",
    body: `Dear ${playerTwo}, ${fixer} has updated the start time to the following:`,
    caption: `Notify players instantly about changes.`,
  },
  {
    id: 10,
    type: "email",
    subject: `Starting tomorrow: ${ensemble}`,
    body: `This is an automated reminder that the following patch starts tomorrow:`,
    caption: `We send reminders so no one forgets the gig.`
  }
]

export default function CommunicationsIndex() {
  const [focused, setFocused] = useState(0);

    const refs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visibleEntries.length > 0) {
          const topEntry = visibleEntries[0];
          const index = refs.current.findIndex((ref) => ref === topEntry.target);
          if (index !== -1) setFocused(index);
        }
      },
      {
        root: null,
        threshold: 0.5, // 50% of element must be visible
      }
    );

    refs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      observer.disconnect();
    };
  }, []);
  return (
    <div className="flex flex-col p-4">
        <h1>Automated Communications</h1>
      <div className=" sticky top-24">
        <p>{notifications[focused].caption}</p>
      </div>
      <div className="flex flex-col items-end">
      {notifications.map((i, idx) => (
        <div
        ref={(el) => {refs.current[idx] = el}}
        key={i.id} className="flex flex-row items-start border-black border w-[400px] my-[40vh] p-2 rounded shadow">
          <div className=" py-1">
          {
            i.type === 'whatsapp' 
            ? <FaWhatsapp size={24}/>
            : i.type === "alert"
            ? <IoAlert size={24}/>
            : <AiOutlineMail size={24}/>
          }
          </div>
          <div className="ml-4 ">
            <p className="font-semibold">{i.subject}</p>
            <p className="text-sm">{i.body}</p>

          </div>
        </div>
      ))}
      </div>
    </div>
  )
}