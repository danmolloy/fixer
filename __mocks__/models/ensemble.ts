import { faker } from '@faker-js/faker';
import { Ensemble, EnsembleAdmin } from '@prisma/client';

export const mockEnsemble: Ensemble = {
  stripeSubscriptionId: faker.string.uuid(),
  stripeCustomerId: faker.string.uuid(),
  subscriptionStatus: 'ACTIVE',

  name: faker.lorem.words(3),
  ensembleNames: [faker.lorem.words(3)],
  id: faker.string.uuid(),
};

const ensembleId = faker.string.uuid();

export const mockEnsembleWithAdmin: Ensemble & {
  admin: EnsembleAdmin[];
} = {
  stripeSubscriptionId: faker.string.uuid(),
  stripeCustomerId: faker.string.uuid(),
  subscriptionStatus: 'ACTIVE',

  name: faker.lorem.words(3),
  ensembleNames: [faker.lorem.words(3)],
  id: ensembleId,
  admin: [
    {
      id: faker.string.uuid(),
      ensembleId: ensembleId,
      userId: faker.string.uuid(),
      positionTitle: faker.lorem.words(2),
      accessType: Math.random() > 0.5 ? 'restricted' : 'full',
    },
  ],
};
