import {faker} from '@faker-js/faker'
import { EnsembleContact } from '@prisma/client'

export const mockEnsembleContact: EnsembleContact = {
  indexNumber: Math.floor(Math.random() * 10),
  status: "OK",
  id: faker.string.uuid(),
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  category: faker.lorem.word(),
  email: faker.internet.email(),
  phoneNumber: faker.phone.number(),
  ensembleId: faker.string.uuid(),
  role: faker.lorem.word(),
  sectionId: faker.string.uuid(),
}