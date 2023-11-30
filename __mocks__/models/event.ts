import { faker } from "@faker-js/faker";
import { Event } from "@prisma/client";
import { randBool } from "./playerCall";
import { EventWithCalls } from "../../components/event/eventDetail/menu/calendarEventLink";
import { EventWithEnsemble } from "../../components/event/eventDetail";

export const mockEventWithEnsemble: EventWithEnsemble = {
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

export const mockEvent: Event = {
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
  fixerName: faker.person.fullName()
}

export const mockEventWithCalls: EventWithCalls = {
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

