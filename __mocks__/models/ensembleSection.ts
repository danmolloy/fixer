import { faker } from '@faker-js/faker';
import { EnsembleSection } from '@prisma/client';
import { mockCall } from './call';
import { instrumentSections } from '../../app/contacts/lib';
import { sectionNamesArr } from '../../app/ensembles/create/api/functions';

export const mockSection: EnsembleSection = {
  id: faker.string.uuid(),
  ensembleId: faker.string.uuid(),
  name: sectionNamesArr[
    Math.floor(Math.random() * instrumentSections.length)
  ]
};

const mockSectionId = faker.string.uuid();
const mockEnsembleId = faker.string.uuid();
