import { Prisma, User } from "@prisma/client";
import {faker} from '@faker-js/faker'
import { mockEventWithCalls } from "./event";
import { mockCallWithEvent } from "./call";
import { UserWithEventsAndCalls } from "../../components/calendar"; 

export const mockUserId = faker.string.uuid()

export const mockUser: User = {
  id: mockUserId,
  name: faker.person.fullName(),
  email: faker.internet.email(),
  profileInfo: faker.lorem.paragraph(),
  emailVerified: new Date(),
  image: faker.image.urlLoremFlickr(),
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  instrument: "Viola",
  mobileNumber: faker.phone.number(),
}



export const mockUserWithCallsAndEvents: UserWithEventsAndCalls = {
  ...mockUser,
  calls: [mockCallWithEvent],
  events: [mockEventWithCalls]
}