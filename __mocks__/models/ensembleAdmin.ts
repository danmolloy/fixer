import { EnsembleAdmin, EnsembleMember, Prisma, User } from "@prisma/client";
import {faker} from '@faker-js/faker'
import { sectionsArr } from "../../components/fixing/fixing";
import { EnsembleMemberWithUser } from "../../components/fixing/instrument/ensembleMembers/memberTile";
import { AdminWithEnsemble } from "../../components/users/settings/accountInfo/ensembleAdmin";

const mockUserId = faker.string.uuid()

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
