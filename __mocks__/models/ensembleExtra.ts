import { EnsembleExtra, Prisma, User } from "@prisma/client";
import {faker} from '@faker-js/faker'
import { sectionsArr } from "../../components/fixing/fixing";
import { SectionExtraWithUser } from "../../components/ensemble/sections/sectionExtra";

const mockUserId = faker.string.uuid()

export const mockEnsembleExtra: EnsembleExtra = {
  id: faker.string.uuid(),
  userId: faker.string.uuid(),
  ensembleId: faker.string.uuid(),
  positionNumber: String(Math.ceil(Math.random() * 10)),
  positionTitle: faker.lorem.word(),
  sectionId: faker.string.uuid(),
}

export const mockEnsembleExtraWithUser: SectionExtraWithUser = {
  id: faker.string.uuid(),
  ensembleId: faker.string.uuid(),
  positionNumber: String(Math.ceil(Math.random() * 10)),
  positionTitle: faker.lorem.word(),
  sectionId: faker.string.uuid(),
  userId: mockUserId,
  user: {
    id: faker.string.uuid(),
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
}
