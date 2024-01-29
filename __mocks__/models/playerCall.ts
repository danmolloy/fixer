import { PlayerCall, Prisma } from "@prisma/client";
import { faker } from "@faker-js/faker";
import { PlayerCallsForTable } from "../../components/fixing/instrument/update/table";

export const randBool = () => Math.random() > .5 ? false : true


export const mockPlayerCall: PlayerCall = {
  id: faker.number.int(),
  createdAt: new Date(),
  updatedAt: new Date(),
  recieved: Math.random() > .5 ? false : true,
  accepted: Math.random() > .3 ? true: Math.random() > .6 ? false : null,
  musicianId: /* mockUserId, */faker.string.uuid(),
  indexNumber: Math.floor(Math.random() * 10),
  eventSectionId: faker.number.int(),
  playerMessage: null,
  bookingOrAvailability: Math.random() > .5 ?  "Booking" : "Availability",
  offerExpiry: null,
  status: "active"
}





export const mockPlayerCallForTable: PlayerCallsForTable = {
  id: faker.number.int(),
  createdAt: new Date(),
  updatedAt: new Date(),
  recieved: Math.random() > .5 ? false : true,
  accepted: Math.random() > .3 ? true: Math.random() > .6 ? false : null,
  musicianId: /* mockUserId, */faker.string.uuid(),
  indexNumber: Math.floor(Math.random() * 10),
  eventSectionId: faker.number.int(),  playerMessage: null,
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

