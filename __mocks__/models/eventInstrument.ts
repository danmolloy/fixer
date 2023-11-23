import { faker } from "@faker-js/faker";
import { EventInstrument } from "@prisma/client";
import { mockEvent } from "./event";
import { randBool } from "./playerCall";
import { EventInstrumentWithMusiciansWithMusician } from "../../components/fixing/fixing"; 
import { mockCall } from "./call";
import { EventInstrumentWithMusiciansAndEvent } from "../../pages/api/fixing/bookingFunctions/prismaFunctions"; 
import { OfferMessageArg } from "../../pages/api/fixing/messages";
import { EventInstrumentWithMusicians } from "../../pages/api/fixing/bookingFunctions/prismaFunctions";

export const mockEventInstrument: EventInstrument = {
  id: faker.number.int(),
  createdAt: new Date(),
  updatedAt: new Date(),
  eventId: faker.number.int(),
  instrumentName: faker.lorem.word(),
  fixerNote: "",
  messageToAll: "",
  bookingStatus: Math.random() > .5 ? "Booking": "Availability",
  numToBook: faker.number.int(12),
  callOrder: "Ordered"
}

let fakeMusicianId = faker.string.uuid()

export const mockEventInstrumentWithMAndM: EventInstrumentWithMusiciansWithMusician = {
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
    recieved: randBool(),
    accepted: Math.random() > .5 ? randBool() : null,
    musicianId: fakeMusicianId,
    eventInstrumentId: faker.number.int(),
    playerMessage: null,
    bookingOrAvailability: randBool() === true ? "Booking" : "Availability",
    offerExpiry: null,
    status: "active",
    musician: {
      id: fakeMusicianId,
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
    },
    calls: [
      mockCall
    ]
  }
  ]
}

export const mockEventInstrumentWithMusiciansAndEvent: EventInstrumentWithMusiciansAndEvent = {
  ...mockEventInstrument,
  musicians: [
    {
      id: faker.number.int(),
    createdAt: new Date(),
    updatedAt: new Date(),
    recieved: randBool(),
    accepted: Math.random() > .5 ? randBool() : null,
    musicianId: fakeMusicianId,
    eventInstrumentId: faker.number.int(),
    playerMessage: null,
    bookingOrAvailability: randBool() === true ? "Booking" : "Availability",
    offerExpiry: null,
    status: "active",
}],
event: {
  id: mockEventInstrument.eventId,
  createdAt: new Date("2025-10-10T14:48:00"),
  updatedAt: new Date("2025-10-10T14:48:00"),
  ensembleName: faker.lorem.words(),
  eventTitle: faker.lorem.words(),
  concertProgram: faker.lorem.words(),
  confirmedOrOnHold: randBool() === true ? "confirmed" : "onHold",
  dressCode: faker.lorem.words(),
  fee: faker.lorem.words(),
  additionalInfo: faker.lorem.words(),
  fixerId: faker.string.uuid(),
  fixerName: faker.person.fullName()
}
}

export const mockOfferMsgArg: OfferMessageArg = {
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
  recieved: randBool(),
  accepted: Math.random() > .5 ? randBool() : null,
  musicianId: fakeMusicianId,
  eventInstrumentId: faker.number.int(),
  playerMessage: null,
  bookingOrAvailability: randBool() === true ? "Booking" : "Availability",
  offerExpiry: null,
  status: "active",
  musician: {
    id: fakeMusicianId,
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
}],
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

export const mockEvenInstrumentWithMusicians: EventInstrumentWithMusicians = {
  ...mockEventInstrument,
  musicians: [
    {
      id: faker.number.int(),
    createdAt: new Date(),
    updatedAt: new Date(),
    recieved: randBool(),
    accepted: Math.random() > .5 ? randBool() : null,
    musicianId: fakeMusicianId,
    eventInstrumentId: faker.number.int(),
    playerMessage: null,
    bookingOrAvailability: randBool() === true ? "Booking" : "Availability",
    offerExpiry: null,
    status: "active",
}],
}