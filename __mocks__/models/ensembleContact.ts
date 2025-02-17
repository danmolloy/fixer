import { faker } from '@faker-js/faker';
import { EnsembleContact } from '@prisma/client';
import { CreateEnsembleContact } from '../../app/contacts/api/create/functions';
import { instrumentSections } from '../../app/contacts/lib';
import { sectionNamesArr } from '../../app/ensembles/create/api/functions';

export const mockEnsembleContact: EnsembleContact = {
  indexNumber: Math.floor(Math.random() * 10),
  status: 'OK',
  id: faker.string.uuid(),
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  category: Math.random() > 0.5 ? 'Extra' : 'Member',
  email: faker.internet.email(),
  phoneNumber: faker.phone.number({ style: 'international' }),
  ensembleId: faker.string.uuid(),
  role: Math.random() > 0.3 ? 'Tutti' : 'Principal',
  sectionId: faker.string.uuid(),
};

export const mockCreateEnsembleContact: CreateEnsembleContact = {
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  section: sectionNamesArr[Math.floor(Math.random() * sectionNamesArr.length)],
  role: faker.string.alpha(10),
  ensembleId: faker.string.uuid(),
  email: faker.internet.email(),
  phone: faker.phone.number({ style: 'international' }),
  category: Math.random() > 0.5 ? 'Extra' : 'Principal',
};
