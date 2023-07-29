import { User } from "@prisma/client";
import {faker} from '@faker-js/faker'
import { UserWithCalls } from "../../components/fixing/editCalls/editCalls";


export const mockUser: User = {
  id: faker.string.uuid(),
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

export const mockUserWithCalls: UserWithCalls = {
  ...mockUser,
  calls: [
    "1", "2", "3"
  ]
}