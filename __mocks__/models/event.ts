import { faker } from "@faker-js/faker";
import { Event } from "@prisma/client";
import { randBool } from "./playerCall";

export const mockEvent: Event = {
  id: faker.number.int(),
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