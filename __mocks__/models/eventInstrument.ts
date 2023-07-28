import { faker } from "@faker-js/faker";
import { EventInstrument } from "@prisma/client";
import { mockEvent } from "./event";
import { randBool } from "./playerCall";
import { EventInstrumentWithMusiciansWithMusician } from "../../components/fixing/instrumentTile";
import { mockCall } from "./call";

export const mockEventInstrument: EventInstrument = {
  id: faker.number.int(),
  createdAt: new Date(),
  updatedAt: new Date(),
  eventId: faker.number.int(),
  instrumentName: faker.lorem.word(),
  fixerNote: "",
  messageToAll: "",
  bookingStatus: randBool() === true ? "Booking": "Availability",
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
  bookingStatus: randBool() === true ? "Booking": "Availability",
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
      profileInfo: faker.lorem.paragraph(),
      emailVerified: new Date(),
      image: faker.image.urlLoremFlickr(),
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      instrument: "Viola",
      mobileNumber: faker.phone.number(),
    },
    calls: [
      mockCall
    ]
  }
  ]
}