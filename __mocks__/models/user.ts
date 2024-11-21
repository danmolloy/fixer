import { Prisma, User } from '@prisma/client';
import { faker } from '@faker-js/faker';
import { UserWithEventsAndCallsWithEnsemble } from '../../app/calendar';

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
