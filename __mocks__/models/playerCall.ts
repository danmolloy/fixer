import { PlayerCall, Prisma } from "@prisma/client";
import { mockEventInstrument } from "./eventInstrument";
import { faker } from "@faker-js/faker";
import { mockUser, mockUserId } from "./user";
import { playerCallMsging } from "../../pages/api/fixing/recieveCalls";

export const randBool = () => Math.random() > .5 ? false : true

export type PlayerCallWithInstrumentAndMs = Prisma.PlayerCallGetPayload<{
  include: {
    eventInstrument: {
      include: {
        musicians: true
      }
    }
  }
}>

export const mockPlayerCall: PlayerCall = {
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
}


export const mockPlayerCallMsging: playerCallMsging = {
  ...mockPlayerCall,
  musician: mockUser,
  eventInstrument: {
    id: faker.number.int(),
  createdAt: new Date(),
  updatedAt: new Date(),
  eventId: faker.number.int(),
  instrumentName: faker.lorem.word(),
  fixerNote: "mock fixerNot",
  messageToAll: "this is a message to all",
  bookingStatus: Math.random() > .5 ? "Booking": "Availability",
  numToBook: faker.number.int(12),
  callOrder: "Ordered",
  event: {
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
  }
}

export const mockPlayerCallWithInstrumentAndMs: PlayerCallWithInstrumentAndMs = {
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
  status: "active",
  eventInstrument: {
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
  musicians: [
    {
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
    }
  ]
  }
}