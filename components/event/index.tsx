import React, { useState } from "react"
import EventInfo from "./eventInfo"
import Menu, { MenuItems } from "../layout/menu"
import { Prisma } from "@prisma/client"

export type EventWithCalls = Prisma.EventGetPayload<{
  include: {
    calls: true
  }
}>

export type EventIndexProps = {
  event: EventWithCalls
  session: any
  preview?: boolean
}




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

  const fixerMenu: MenuItems = [
    {
      name: "Edit Event",
      id: "0",
      link: `/event/edit/${props.event.id}`
    },
    {
      name: "Message Players",
      id: "1",
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



  return (
    <div data-testid="event-index-div" className="w-full lg:w-2/3 flex flex-col items-center">
      {showOptions && <Menu data={props.event.fixerId === props.session.user.id ? props.event : null} eventId={props.event.id} fixerMenu={props.event.fixerId === props.session.user.id && true} menuItems={props.event.fixerId === props.session.user.id ? fixerMenu : playerMenu} setShowMenu={() => setShowOptions(!showOptions)} signedIn={true} signInBtn={false}/>}
      <EventInfo {...props} setShowOptions={() => setShowOptions(!showOptions)} showOptions={showOptions}/>
    </div>
  )
}