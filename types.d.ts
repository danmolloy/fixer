
// Fixing

interface InstrumentSection {
  id: number
  createdAt: string
  updatedAt: string
  eventId: string
  instrumentName: string
  numToBook: number
  callOrder: string
  musicians: Musician[]
}

interface EventCall {
  id: number
  createdAt: string
  updatedAt: string
  startTime: string
  endTime: string
  venue: string
  eventId: number
  fixerEmail: string
}

interface Musician {
    id: string
    createdAt: string
    updatedAt: string
    recieved: boolean
    accepted: boolean | null
    musicianEmail: string
    eventInstrumentId: number
    bookingOrAvailability: "Booking"|"Availability"
    musician: {
      name: string
    }
    calls: {
      id: number
    }
}