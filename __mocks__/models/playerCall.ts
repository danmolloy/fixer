import { PlayerCall } from "@prisma/client";
import { mockEventInstrument } from "./eventInstrument";
import { faker } from "@faker-js/faker";
import { mockUser } from "./user";

export const randBool = () => Math.random() > .5 ? false : true

export const mockPlayerCall: PlayerCall = {
  id: faker.number.int(),
  createdAt: new Date(),
  updatedAt: new Date(),
  recieved: randBool(),
  accepted: Math.random() > .5 ? randBool() : null,
  musicianId: mockUser.id,
  eventInstrumentId: faker.number.int(),
  playerMessage: null,
  bookingOrAvailability: randBool() === true ? "Booking" : "Availability",
  offerExpiry: null,
  status: "active"
}