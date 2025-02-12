import { faker } from '@faker-js/faker';
import { Call, Ensemble, Event } from '@prisma/client';

export const mockEventWithEnsemble: Event & { ensemble: Ensemble } = {
  id: faker.number.int(),
  adminAccess: [],
  ensembleId: faker.string.uuid(),
  createdAt: new Date('2025-10-10T14:48:00'),
  updatedAt: new Date('2025-10-10T14:48:00'),
  eventTitle: faker.lorem.words(),
  concertProgram: faker.lorem.words(),
  status: Math.random() > 0.5 ? 'CONFIRMED' : 'ONHOLD',
  dressCode: faker.lorem.words(),
  fee: faker.lorem.words(),
  additionalInfo: faker.lorem.words(),
  fixerId: faker.string.uuid(),
  fixerName: faker.person.fullName(),
  ensembleName: faker.lorem.words(3),
  ensemble: {
    stripeSubscriptionId: faker.string.uuid(),
    stripeCustomerId: faker.string.uuid(),
    subscriptionStatus: 'ACTIVE',
    ensembleNames: [faker.lorem.words(3), faker.lorem.words(3)],
    name: faker.lorem.words(3),
    id: faker.string.uuid(),
  },
};

export const mockEvent: Event = {
  id: faker.number.int(),
  adminAccess: [],
  ensembleId: faker.string.uuid(),
  ensembleName: faker.lorem.words(3),
  createdAt: new Date('2025-10-10T14:48:00'),
  updatedAt: new Date('2025-10-10T14:48:00'),
  eventTitle: faker.lorem.words(),
  concertProgram: faker.lorem.words(),
  status: Math.random() > 0.5 ? 'CONFIRMED' : 'ONHOLD',
  dressCode: faker.lorem.words(),
  fee: faker.lorem.words(),
  additionalInfo: faker.lorem.words(),
  fixerId: faker.string.uuid(),
  fixerName: faker.person.fullName(),
};

export const mockEventWithCalls: Event & { calls: Call[] } = {
  id: faker.number.int(),
  adminAccess: [],
  ensembleId: faker.string.uuid(),
  ensembleName: faker.lorem.words(3),
  createdAt: new Date('2025-10-10T14:48:00'),
  updatedAt: new Date('2025-10-10T14:48:00'),
  eventTitle: faker.lorem.words(),
  concertProgram: faker.lorem.words(),
  status: Math.random() > 0.5 ? 'CONFIRMED' : 'ONHOLD',
  dressCode: faker.lorem.words(),
  fee: faker.lorem.words(),
  additionalInfo: faker.lorem.words(),
  fixerId: faker.string.uuid(),
  fixerName: faker.person.fullName(),
  calls: [
    {
      id: faker.number.int(),
      createdAt: new Date(),
      updatedAt: new Date(),
      startTime: new Date(),
      endTime: new Date(),
      venue: faker.lorem.words(),
      eventId: faker.number.int(),
      fixerId: faker.string.uuid(),
    },
  ],
};
