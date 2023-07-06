import { faker } from "@faker-js/faker";
import { EventInstrument } from "@prisma/client";
import { mockEvent } from "./event";
import { randBool } from "./playerCall";

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