import { Event, EventSection } from '@prisma/client';
import { faker } from '@faker-js/faker';
import { EventSectionWithMusiciansWithMusician } from '../../components/fixing/fixing';
import { mockCall } from './call';
import { randBool } from './playerCall';

export const mockEventSection: EventSection = {
  id: Math.ceil(Math.random() * 20),
  createdAt: new Date(),
  updatedAt: new Date(),
  eventId: Math.ceil(Math.random() * 20),
  ensembleSectionId: faker.string.uuid(),
  bookingStatus: 'ok',
  numToBook: Math.ceil(Math.random() * 10),
};

export const mockEventSectionWithMusicians: EventSectionWithMusiciansWithMusician =
  {
    id: Math.ceil(Math.random() * 20),
    createdAt: new Date(),
    updatedAt: new Date(),
    eventId: Math.ceil(Math.random() * 20),
    ensembleSectionId: faker.string.uuid(),
    bookingStatus: 'ok',
    numToBook: Math.ceil(Math.random() * 10),
    ensembleSection: {
      name: faker.lorem.word(),
      id: faker.string.uuid(),
      ensembleId: faker.string.uuid(),
      instrument: faker.lorem.word(),
      members: [
        {
          id: faker.string.uuid(),
          positionTitle: faker.lorem.word(),
          ensembleId: faker.string.uuid(),
          userId: faker.string.uuid(),
          positionNumber: String(Math.ceil(Math.random() * 10)),
          sectionId: faker.string.uuid(),
        },
      ],
      extras: [
        {
          id: faker.string.uuid(),
          positionTitle: faker.lorem.word(),
          ensembleId: faker.string.uuid(),
          userId: faker.string.uuid(),
          positionNumber: String(Math.ceil(Math.random() * 10)),
          sectionId: faker.string.uuid(),
        },
      ],
    },
    musicians: [
      {
        indexNumber: Math.floor(Math.random() * 10),
        id: faker.number.int(),
        createdAt: new Date(),
        updatedAt: new Date(),
        recieved: randBool(),
        accepted: Math.random() > 0.5 ? randBool() : null,
        musicianId: faker.string.uuid(),
        eventSectionId: Math.ceil(Math.random() * 20),
        playerMessage: null,
        bookingOrAvailability: randBool() === true ? 'Booking' : 'Availability',
        offerExpiry: null,
        status: 'active',
        musician: {
          id: faker.string.uuid(),
          name: faker.person.fullName(),
          email: faker.internet.email(),
          emailVerified: new Date(),
          image: faker.image.urlLoremFlickr(),
          firstName: faker.person.firstName(),
          lastName: faker.person.lastName(),
          instrumentsList: ['Viola'],
          mobileNumber: faker.phone.number(),
          profileText: faker.lorem.paragraph(),
          preferredMethod: 'WhatsApp',
          fixingEnsembles: [],
        },
        calls: [mockCall],
      },
    ],
  };

export const mockEventSectionAndMusicians: EventSectionWithMusiciansWithMusician & {
  event: Event;
} = {
  id: Math.ceil(Math.random() * 20),
  createdAt: new Date(),
  updatedAt: new Date(),
  eventId: Math.ceil(Math.random() * 20),
  event: {
    id: faker.number.int(),
    ensembleId: faker.string.uuid(),
    createdAt: new Date('2025-10-10T14:48:00'),
    updatedAt: new Date('2025-10-10T14:48:00'),
    eventTitle: faker.lorem.words(),
    concertProgram: faker.lorem.words(),
    confirmedOrOnHold: Math.random() > 0.5 ? 'confirmed' : 'onHold',
    dressCode: faker.lorem.words(),
    fee: faker.lorem.words(),
    additionalInfo: faker.lorem.words(),
    fixerId: faker.string.uuid(),
    fixerName: faker.person.fullName(),
  },
  ensembleSectionId: faker.string.uuid(),
  bookingStatus: 'ok',
  numToBook: Math.ceil(Math.random() * 10),
  ensembleSection: {
    name: faker.lorem.word(),
    id: faker.string.uuid(),
    ensembleId: faker.string.uuid(),
    instrument: faker.lorem.word(),
    members: [
      {
        id: faker.string.uuid(),
        positionTitle: faker.lorem.word(),
        ensembleId: faker.string.uuid(),
        userId: faker.string.uuid(),
        positionNumber: String(Math.ceil(Math.random() * 10)),
        sectionId: faker.string.uuid(),
      },
    ],
    extras: [
      {
        id: faker.string.uuid(),
        positionTitle: faker.lorem.word(),
        ensembleId: faker.string.uuid(),
        userId: faker.string.uuid(),
        positionNumber: String(Math.ceil(Math.random() * 10)),
        sectionId: faker.string.uuid(),
      },
    ],
  },
  musicians: [
    {
      indexNumber: Math.floor(Math.random() * 10),
      id: faker.number.int(),
      createdAt: new Date(),
      updatedAt: new Date(),
      recieved: randBool(),
      accepted: Math.random() > 0.5 ? randBool() : null,
      musicianId: faker.string.uuid(),
      eventSectionId: Math.ceil(Math.random() * 20),
      playerMessage: null,
      bookingOrAvailability: randBool() === true ? 'Booking' : 'Availability',
      offerExpiry: null,
      status: 'active',
      musician: {
        id: faker.string.uuid(),
        name: faker.person.fullName(),
        email: faker.internet.email(),
        emailVerified: new Date(),
        image: faker.image.urlLoremFlickr(),
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        instrumentsList: ['Viola'],
        mobileNumber: faker.phone.number(),
        profileText: faker.lorem.paragraph(),
        preferredMethod: 'WhatsApp',
        fixingEnsembles: [],
      },
      calls: [mockCall],
    },
  ],
};
