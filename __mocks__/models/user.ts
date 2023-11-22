import { Prisma, User } from "@prisma/client";
import {faker} from '@faker-js/faker'
import { UserWithEventsAndCalls } from "../../components/calendar"; 

export const mockUserId = faker.string.uuid()

export const mockUser: User = {
  id: mockUserId,
  name: faker.person.fullName(),
  email: faker.internet.email(),
  emailVerified: new Date(),
  image: faker.image.urlLoremFlickr(),
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  mobileNumber: faker.phone.number(),
  fixingEnsembles: [faker.lorem.words(3)],
  profileText: faker.lorem.paragraph(),
  preferredMethod: "WhatsApp",
  instrumentsList: ["Cello", "Viola"]
}



export const mockUserWithCallsAndEvents: UserWithEventsAndCalls = {
  id: mockUserId,
  name: faker.person.fullName(),
  email: faker.internet.email(),
  emailVerified: new Date(),
  image: faker.image.urlLoremFlickr(),
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  mobileNumber: faker.phone.number(),
  fixingEnsembles: [faker.lorem.words(3)],
  profileText: faker.lorem.paragraph(),
  preferredMethod: "WhatsApp",
  instrumentsList: ["Cello", "Viola"],
  calls: [{
    id: faker.number.int(),
    createdAt: new Date(),
    updatedAt: new Date(),
    startTime: new Date(),
    endTime: new Date(),
    venue: faker.lorem.words(),
    eventId: faker.number.int(),
    fixerId: faker.string.uuid(),
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
  }],
  events: [{
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
    calls: [{
      id: faker.number.int(),
      createdAt: new Date(),
      updatedAt: new Date(),
      startTime: new Date(),
      endTime: new Date(),
      venue: faker.lorem.words(),
      eventId: faker.number.int(),
      fixerId: faker.string.uuid(),
    }]
  }]
}