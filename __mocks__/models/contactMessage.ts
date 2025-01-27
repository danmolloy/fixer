import { faker } from '@faker-js/faker';
import {
  Call,
  ContactMessage,
  EnsembleContact,
  ContactMessageType,
  ContactMessageStatus,
} from '@prisma/client';

const statusArr = Object.values(ContactMessageStatus);
const typeArr = Object.values(ContactMessageType);

export const mockContactMessage: ContactMessage = {
  strictlyTied: false,
  urgent: false,
  availableFor: [],
  contactId: faker.string.uuid(),
  token: faker.string.uuid(),
  position: 'Tutti',
  playerMessage: faker.lorem.words(8),
  id: faker.number.int(),
  createdAt: new Date(),
  updatedAt: new Date(),
  received: Math.random() > 0.5 ? false : true,
  receivedDate: new Date(),
  acceptedDate: new Date(),
  accepted: Math.random() > 0.3 ? true : Math.random() > 0.6 ? false : null,
  indexNumber: Math.floor(Math.random() * 10),
  eventSectionId: faker.number.int(),
  offerExpiry: null,
  type: typeArr[Math.floor(Math.random() * typeArr.length)],
  status: statusArr[Math.floor(Math.random() * statusArr.length)],
};

export const mockNotContactedContactMessage: ContactMessage = {
  strictlyTied: false,
  urgent: false,
  availableFor: [],
  contactId: faker.string.uuid(),
  token: faker.string.uuid(),
  position: 'Tutti',
  playerMessage: faker.lorem.words(8),
  id: faker.number.int(),
  createdAt: new Date(),
  updatedAt: new Date(),
  received: Math.random() > 0.5 ? false : true,
  receivedDate: new Date(),
  acceptedDate: new Date(),
  accepted: Math.random() > 0.3 ? true : Math.random() > 0.6 ? false : null,
  indexNumber: Math.floor(Math.random() * 10),
  eventSectionId: faker.number.int(),
  offerExpiry: null,
  type: typeArr[Math.floor(Math.random() * typeArr.length)],
  status: 'NOTCONTACTED',
};

export const mockContactMessageForTable: ContactMessage & {
  calls: Call[];
  contact: EnsembleContact;
} = {
  strictlyTied: false,
  urgent: false,
  availableFor: [],
  contactId: faker.string.uuid(),
  playerMessage: faker.lorem.words(8),
  position: 'Tutti',
  token: faker.string.uuid(),
  id: faker.number.int(),
  createdAt: new Date(),
  updatedAt: new Date(),
  received: Math.random() > 0.5 ? false : true,
  receivedDate: new Date(),
  acceptedDate: new Date(),
  accepted: Math.random() > 0.3 ? true : Math.random() > 0.6 ? false : null,
  indexNumber: Math.floor(Math.random() * 10),
  eventSectionId: faker.number.int(),
  offerExpiry: null,
  type: typeArr[Math.floor(Math.random() * typeArr.length)],
  status: statusArr[Math.floor(Math.random() * statusArr.length)],
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
  contact: {
    id: faker.string.uuid(),
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    category: faker.lorem.word(),
    email: faker.internet.email(),
    phoneNumber: faker.phone.number(),
    ensembleId: faker.string.uuid(),
    role: faker.lorem.word(),
    sectionId: faker.string.uuid(),
    status: 'OK',
    indexNumber: Math.ceil(Math.random() * 10),
  },
};
