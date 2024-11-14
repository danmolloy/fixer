import { faker } from '@faker-js/faker';
import { EnsembleSection } from '@prisma/client';
import { mockCall } from './call';
import { randBool } from './playerCall';
import { instrumentSections } from '../../app/contacts/lib';

export const mockSection: EnsembleSection = {
  id: faker.string.uuid(),
  ensembleId: faker.string.uuid(),
  name: instrumentSections[Math.floor(Math.random() * instrumentSections.length)].name,
};

const mockSectionId = faker.string.uuid();
const mockEnsembleId = faker.string.uuid();
