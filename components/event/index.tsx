import React, { useState } from "react"
import EventInfo from "./eventInfo"
import EventOptions from "./eventOptions"
import Menu, { MenuItems } from "../layout/menu"

interface EventIndexProps {
  confirmed: string
  ensembleName: string
  concertProgram: string
  dressCode: string
  fee: string
  additionalInfo: string
  fixerEmail: string
  createdAt: string
  updatedAt: string
  id: string
  session: any
  calls: {
    id: string
    startTime: string
    endTime: string
    venue: string
  }[]
}

const fixerMenu: MenuItems = [
  {
    name: "Edit Event",
    id: "0"
  },
  {
    name: "Message Players",
    id: "1"
  },
  {
    name: "Export CSV",
    id: "2"
  },
  {
    name: "Add to Calendar",
    id: "3"
  },
  {
    name: "Cancel Event",
    id: "4"
  }
]


const playerMenu: MenuItems = [
  {
    name: "Contact Fixer",
    id: "0"
  },
  {
    name: "Request Parts",
    id: "1"
  },
  {
    name: "Add to Calendar",
    id: "2"
  },
]

export default function EventIndex(props: EventIndexProps) {
  const [showOptions, setShowOptions] = useState<boolean>(false)

  return (
    <div data-testid="event-index-div" className="w-full lg:w-2/3 flex flex-col items-center">
      {showOptions && <Menu menuItems={props.fixerEmail === props.session.userData.email ? fixerMenu : playerMenu} setShowMenu={() => setShowOptions(!showOptions)} signedIn={true} signInBtn={false}/>}
      <EventInfo {...props} setShowOptions={() => setShowOptions(!showOptions)} showOptions={showOptions}/>
    </div>
  )
}