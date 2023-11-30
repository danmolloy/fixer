import { EnsembleMember, Prisma, User } from "@prisma/client";
import {faker} from '@faker-js/faker'
import { sectionsArr } from "../../components/fixing/fixing";
import { EnsembleMemberWithUser } from "../../components/fixing/instrument/ensembleMembers/memberTile";

const mockUserId = faker.string.uuid()

export const mockEnsembleMember: EnsembleMember = {
  id: faker.string.uuid(),
  userId: faker.string.uuid(),
  ensembleId: faker.string.uuid(),
  positionNumber: String(Math.ceil(Math.random() * 10)),
  positionTitle: faker.lorem.word(),
  sectionId: faker.string.uuid(),
}

export const mockEnsembleMemberWithUser: EnsembleMemberWithUser = {
  id: faker.string.uuid(),
  ensembleId: faker.string.uuid(),
  positionNumber: String(Math.ceil(Math.random() * 10)),
  positionTitle: faker.lorem.word(),
  sectionId: faker.string.uuid(),
  userId: mockUserId,
  user: {
    id: faker.string.uuid(),
    name: faker.person.fullName(),
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
