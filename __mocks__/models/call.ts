import { Call } from '@prisma/client';
import { faker } from '@faker-js/faker';
import { CallWithEventWithEnsemble } from '../../app/calendar/views/dayView';
import { mockEvent } from './event';

export const mockCall: Call = {
  id: faker.number.int(),
  createdAt: new Date(),
  updatedAt: new Date(),
  startTime: new Date(),
  endTime: new Date(),
  venue: faker.lorem.words(),
  eventId: faker.number.int(),
  fixerId: faker.string.uuid(),
};

export const mockCallWithEventWithEnsemble: CallWithEventWithEnsemble = {
  ...mockCall,
  event: {
    ...mockEvent,
    ensemble: {
      ensembleNames: [faker.lorem.words(2), faker.lorem.words(2)],
      name: faker.lorem.words(2),
      id: faker.string.uuid(),
    },
  },
};
