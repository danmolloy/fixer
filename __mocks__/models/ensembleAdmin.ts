import { Ensemble, EnsembleAdmin, Prisma, User } from "@prisma/client";
import {faker} from '@faker-js/faker'

const mockUserId = faker.string.uuid()

export const mockAdminWithUser: EnsembleAdmin & {user: User} = {
  id: faker.string.uuid(),
  accessType: Math.random() > .5 ? "full" : "restricted",
  ensembleId: faker.string.uuid(),
  positionTitle: faker.lorem.word(),
  userId: mockUserId,
  user: {
    id: mockUserId,
    email: faker.internet.email(),
    emailVerified: new Date(),
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    mobileNumber: faker.phone.number(),
    fixingEnsembles: [faker.lorem.words(3)],
    preferredMethod: "WhatsApp",
    instrumentsList: ["Cello", "Viola"]
  }
}

export const mockEnsembleAdmin: EnsembleAdmin = {
  accessType: Math.random() > .5 ? "full" : "restricted",
  id: faker.string.uuid(),
  ensembleId: faker.string.uuid(),
  positionTitle: faker.lorem.word(),
  userId: mockUserId,
  
}

export const mockAdminWithEnsemble: EnsembleAdmin & { ensemble: Ensemble } = {
  id: faker.string.uuid(),
  accessType: Math.random() > .5 ? "full" : "restricted",
  ensembleId: faker.string.uuid(),
  positionTitle: faker.lorem.word(),
  userId: mockUserId,
  ensemble: {
    ensembleNames: [faker.lorem.words(3),],
    name: faker.lorem.words(3),
    id: faker.string.uuid()
  }
}
