import { faker } from "@faker-js/faker";
import { Event } from "@prisma/client";
import { randBool } from "./playerCall";
import { EventWithCalls } from "../../components/upcomingEvents/eventsIndex";
import { EventAllBooked, allEventBooked } from "../../pages/api/fixing/recieveCalls";

export const mockEvent: Event = {
  id: faker.number.int(),
  createdAt: new Date("2025-10-10T14:48:00"),
  updatedAt: new Date("2025-10-10T14:48:00"),
  ensembleName: faker.lorem.words(),
  eventTitle: faker.lorem.words(),
  concertProgram: faker.lorem.words(),
  confirmedOrOnHold: Math.random() > .5 ? "confirmed" : "onHold",
  dressCode: faker.lorem.words(),
  fee: faker.lorem.words(),
  additionalInfo: faker.lorem.words(),
  fixerId: faker.string.uuid(),
  fixerName: faker.person.fullName()
}

export const mockEventWithCalls: EventWithCalls = {
  id: faker.number.int(),
  createdAt: new Date("2025-10-10T14:48:00"),
  updatedAt: new Date("2025-10-10T14:48:00"),
  ensembleName: faker.lorem.words(),
  eventTitle: faker.lorem.words(),
  concertProgram: faker.lorem.words(),
  confirmedOrOnHold: Math.random() > .5 ? "confirmed" : "onHold",
  dressCode: faker.lorem.words(),
  fee: faker.lorem.words(),
  additionalInfo: faker.lorem.words(),
  fixerId: faker.string.uuid(),
  fixerName: faker.person.fullName(),
  calls: [
    {
      id: faker.number.int(),
      createdAt: new Date(),
      updatedAt: new Date(),
      startTime: new Date(),
      endTime: new Date(),
      venue: faker.lorem.words(),
      eventId: faker.number.int(),
      fixerId: faker.string.uuid()
    }
  ]
}

export const mockAllEventBooked: EventAllBooked = {
  id: faker.number.int(),
  createdAt: new Date("2025-10-10T14:48:00"),
  updatedAt: new Date("2025-10-10T14:48:00"),
  ensembleName: faker.lorem.words(),
  eventTitle: faker.lorem.words(),
  concertProgram: faker.lorem.words(),
  confirmedOrOnHold: Math.random() > .5 ? "confirmed" : "onHold",
  dressCode: faker.lorem.words(),
  fee: faker.lorem.words(),
  additionalInfo: faker.lorem.words(),
  fixerId: faker.string.uuid(),
  fixerName: faker.person.fullName(),
  instrumentSections: [{
    id: faker.number.int(),
    createdAt: new Date(),
    updatedAt: new Date(),
    eventId: faker.number.int(),
    instrumentName: faker.lorem.word(),
    fixerNote: "",
    messageToAll: "",
    bookingStatus: Math.random() > .5 ? "Booking": "Availability",
    numToBook: faker.number.int(12),
    callOrder: "Ordered",
    musicians: [{
      id: faker.number.int(),
      createdAt: new Date(),
      updatedAt: new Date(),
      recieved: Math.random() > .5 ? false : true,
      accepted: Math.random() > .3 ? true: Math.random() > .6 ? false : null,
      musicianId: /* mockUserId, */faker.string.uuid(),
      eventInstrumentId: faker.number.int(),
      playerMessage: null,
      bookingOrAvailability: Math.random() > .5 ?  "Booking" : "Availability",
      offerExpiry: null,
      status: "active"
    }]
  }]
}