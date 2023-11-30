import { PlayerCall, Prisma } from "@prisma/client";
import { mockEventInstrument } from "./eventInstrument";
import { faker } from "@faker-js/faker";
import { mockUser, mockUserId } from "./user";
import { PlayerCallsForTable } from "../../components/fixing/instrument/table";
import { PlayerCallWithEventWithEnsemble } from "../../components/users/notifications/notificationTile";

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

export const mockPlayerCallForTable: PlayerCallsForTable = {
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
  calls: [{id: faker.number.int(),
    createdAt: new Date(),
    updatedAt: new Date(),
    startTime: new Date(),
    endTime: new Date(),
    venue: faker.lorem.words(),
    eventId: faker.number.int(),
    fixerId: faker.string.uuid()}],
  musician: {
    id: faker.string.uuid(),
    name: faker.person.fullName(),
    email: faker.internet.email(),
    emailVerified: new Date(),
    image: faker.image.urlLoremFlickr(),
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    instrumentsList: ["Viola"],
    mobileNumber: faker.phone.number(),
    profileText: faker.lorem.paragraph(),
    preferredMethod: "WhatsApp",
    fixingEnsembles: []
  }
}

export const mockPlayerCallWithEventWithEnsemble: PlayerCallWithEventWithEnsemble = {
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
  event: {
    id: faker.number.int(),
  ensembleId: faker.string.uuid(),
  createdAt: new Date("2025-10-10T14:48:00"),
  updatedAt: new Date("2025-10-10T14:48:00"),
  eventTitle: faker.lorem.words(),
  concertProgram: faker.lorem.words(),
  confirmedOrOnHold: Math.random() > .5 ? "confirmed" : "onHold",
  dressCode: faker.lorem.words(),
  fee: faker.lorem.words(),
  additionalInfo: faker.lorem.words(),
  fixerId: faker.string.uuid(),
  fixerName: faker.person.fullName(),
  ensemble: {
    name: faker.lorem.words(3),
    id: faker.string.uuid()
  }
  }
  }
}