import { faker } from '@faker-js/faker';
import { AdminInvite } from '@prisma/client';

export const mockAdminInvite: AdminInvite = {
  senderName: 'Bradley Clegg',
  id: faker.string.uuid(),
  ensembleId: faker.string.alpha(10),
  accepted: Math.random() > 0.5 ? true : false,
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  email: faker.internet.email(),
  positionTitle: faker.lorem.word(),
  accessType: Math.random() > 0.5 ? 'RESTRICTED' : 'FULL',
};
