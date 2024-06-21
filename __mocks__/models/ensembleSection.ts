import { faker } from "@faker-js/faker";
import { EnsembleSection } from "@prisma/client";
import { mockCall } from "./call";
import { randBool } from "./playerCall";


export const mockSection: EnsembleSection = {
  name: faker.lorem.word(),
  id: faker.string.uuid(),
  ensembleId: faker.string.uuid(),
  instrument: faker.lorem.word(),
}

const mockSectionId = faker.string.uuid()
const mockEnsembleId = faker.string.uuid()
