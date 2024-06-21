import { EnsembleAdmin, EnsembleMember, Prisma, User } from "@prisma/client";
import {faker} from '@faker-js/faker'
import { sectionsArr } from "../../components/fixing/fixing";
import { EnsembleMemberWithUser } from "../../components/fixing/instrument/players/memberTile";
import { AdminWithEnsemble } from "../../components/users/settings/accountInfo/ensembleAdmin";
import { AdminWithUser } from "../../app/ensembles/admin/adminTile";

const mockUserId = faker.string.uuid()

export const mockAdminWithUser: AdminWithUser = {
  id: faker.string.uuid(),
  ensembleId: faker.string.uuid(),
  positionTitle: faker.lorem.word(),
  userId: mockUserId,
  user: {
    id: mockUserId,
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

export const mockEnsembleAdmin: EnsembleAdmin = {
  id: faker.string.uuid(),
  ensembleId: faker.string.uuid(),
  positionTitle: faker.lorem.word(),
  userId: mockUserId,
  
}

export const mockAdminWithEnsemble: AdminWithEnsemble = {
  id: faker.string.uuid(),
  ensembleId: faker.string.uuid(),
  positionTitle: faker.lorem.word(),
  userId: mockUserId,
  ensemble: {
    name: faker.lorem.words(3),
    id: faker.string.uuid()
  }
}
