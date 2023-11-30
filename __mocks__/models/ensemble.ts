import { faker } from "@faker-js/faker";
import { Ensemble } from "@prisma/client";
import { EnsembleWithAdmin } from "../../pages/api/ensemble/create";


export const mockEnsemble: Ensemble = {
  name: faker.lorem.words(3),
  id: faker.string.uuid()
}

const ensembleId = faker.string.uuid()

export const mockEnsembleWithAdmin: EnsembleWithAdmin = {
  name: faker.lorem.words(3),
  id: ensembleId,
  admin: [{
    id: faker.string.uuid(),
    ensembleId: ensembleId,
    userId: faker.string.uuid(),
    positionTitle: faker.lorem.words(2),
  }]
}