import { EnsembleContact, EnsembleSection, Event, EventSection } from '@prisma/client';
import { faker } from '@faker-js/faker';
import { mockCall } from './call';
import { mockEnsembleContact } from './ensembleContact';

export const mockEventSection: EventSection = {
  id: Math.ceil(Math.random() * 20),
  createdAt: new Date(),
  updatedAt: new Date(),
  eventId: Math.ceil(Math.random() * 20),
  ensembleSectionId: faker.string.uuid(),
  bookingStatus: 'ok',
  numToBook: Math.ceil(Math.random() * 10),
};

