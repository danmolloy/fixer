import { Prisma, User } from '@prisma/client';
import { faker } from '@faker-js/faker';
import { UserWithEventsAndCallsWithEnsemble } from '../../app/calendar';
import { mockCall } from './call';
import { mockEvent } from './event';
import { mockEnsemble } from './ensemble';
import { mockOrchestration } from './orchestration';
import { mockSection } from './ensembleSection';
import { mockEnsembleContact } from './ensembleContact';
import { mockContactEventCall } from './ContactEventCall';
import { mockContactMessage } from './contactMessage';
import { mockEventSection } from './eventSection';

export const mockUserId = faker.string.uuid();

export const mockUser: User = {
  name: 'mockName',
  id: mockUserId,
  email: faker.internet.email(),
  emailVerified: new Date(),
  image: faker.image.urlLoremFlickr(),
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  mobileNumber: faker.phone.number({ style: 'international' }),
  fixingEnsembles: [faker.lorem.words(3)],
  preferredMethod: 'WhatsApp',
  instrumentsList: ['Cello', 'Viola'],
};


export const mockUserWithCallsAndEvents: UserWithEventsAndCallsWithEnsemble = {
  name: 'mockName',
  id: mockUserId,
  email: faker.internet.email(),
  emailVerified: new Date(),
  image: faker.image.urlLoremFlickr(),
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  mobileNumber: faker.phone.number({ style: 'international' }),
  fixingEnsembles: [faker.lorem.words(3)],
  preferredMethod: 'WhatsApp',
  instrumentsList: ['Cello', 'Viola'],
  calls: [{
    id: faker.number.int(),
    createdAt: new Date(),
    updatedAt: new Date(),
    startTime: new Date(),
    endTime: new Date(),
    venue: faker.lorem.words(),
    eventId: faker.number.int(),
    fixerId: faker.string.uuid(),
    event: {
      ...mockEvent,
      ensemble: mockEnsemble
    },
  }],
  events: [{
    ...mockEvent,
    sections: [{
      ...mockEventSection,
      ensembleSection: mockSection,
      orchestration: [mockOrchestration],
      contacts: [{
        ...mockContactMessage,
        eventCalls: [{
          ...mockContactEventCall,
          call: mockCall
        }]
      }]
    }],
    calls: [{
      ...mockCall,
    }],
    
  }]
};
