import {faker} from '@faker-js/faker'
import { EnsembleContact } from '@prisma/client'
import { CreateEnsembleContact } from '../../app/contacts/api/create/route'

export const mockEnsembleContact: EnsembleContact = {
  indexNumber: Math.floor(Math.random() * 10),
  status: "OK",
  id: faker.string.uuid(),
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  category: "Extra",
  email: faker.internet.email(),
  phoneNumber: faker.phone.number(),
  ensembleId: faker.string.uuid(),
  role: faker.lorem.word(),
  sectionId: faker.string.uuid(),
}

export const mockCreateEnsembleContact: CreateEnsembleContact = {
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  section: {
    name: faker.string.alpha(10),
    id: faker.string.uuid(),
  },
  role: faker.string.alpha(10),
  ensembleId: faker.string.uuid(),
  email: faker.internet.email(),
  phone: faker.phone.number(),
  category: Math.random() > .5? "Extra": "Principal",
}