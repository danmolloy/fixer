import { useState } from "react"
import ContactMessageForm from "./form"
import { Call, ContactMessage, EnsembleContact } from "@prisma/client"
import CurrentContactMessages from "./current"

export type EventSectionContactsProps = {
  eventSectionId: number
  sectionContacts: EnsembleContact[]
  eventCalls: Call[]
  currentContacts: (ContactMessage & {
    contact: EnsembleContact
    calls: Call[]
  })[]
}

export default function EventSectionContacts(props: EventSectionContactsProps) {
  const { currentContacts, eventSectionId, sectionContacts, eventCalls } = props;
  const [editContacts, setEditContacts] = useState<boolean>(false)
  const [bookingOrAvailability, setBookingOrAvailability] = useState<string>("Booking")

  return (
    <div>
      <label>
      <input
      disabled={editContacts}
      type="radio"
      value={"Booking"} 
      onChange={() => setBookingOrAvailability("Booking")}
      checked={bookingOrAvailability === "Booking"} 
    />
  Booking
      </label>
      <label>
      <input
      disabled={editContacts}
      type="radio"
      value={"Availability"} 
      checked={bookingOrAvailability === "Availability"}
      onChange={() => setBookingOrAvailability("Availability")} 
    />
  Availability
      </label>
      <CurrentContactMessages bookingOrAvailability={bookingOrAvailability} eventCalls={eventCalls} contacts={currentContacts} />
      <button onClick={() => setEditContacts(!editContacts)}>
        Edit Contacts
      </button>
      {editContacts 
      && <ContactMessageForm
        currentContacts={currentContacts}
        eventCalls={eventCalls}
        cancelForm={() => setEditContacts(false)} 
        eventContacts={[]}
        eventSectionId={eventSectionId} 
        bookingOrAvailability={bookingOrAvailability} 
        sectionContacts={sectionContacts} />}
    </div>
  )
}