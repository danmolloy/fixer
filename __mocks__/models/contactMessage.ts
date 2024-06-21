import { faker } from "@faker-js/faker";
import { ContactMessage } from "@prisma/client";
import { ContactMessageForTable } from "../../components/fixing/instrument/update/table/playerRow";


export const mockContactMessage: ContactMessage = {
  contactId: faker.string.uuid(),
  playerMessage: faker.lorem.words(8),
  id: faker.number.int(),
  createdAt: new Date(),
  updatedAt: new Date(),
  recieved: Math.random() > .5 ? false : true,
  recievedDate: new Date(),
  acceptedDate: new Date(),
  accepted: Math.random() > .3 ? true: Math.random() > .6 ? false : null,
  indexNumber: Math.floor(Math.random() * 10),
  eventSectionId: faker.number.int(),
  bookingOrAvailability: Math.random() > .5 ?  "Booking" : "Availability",
  offerExpiry: null,
  status: "active"
}

export const mockContactMessageForTable: ContactMessageForTable = {
  contactId: faker.string.uuid(),
  playerMessage: faker.lorem.words(8),
  id: faker.number.int(),
  createdAt: new Date(),
  updatedAt: new Date(),
  recieved: Math.random() > .5 ? false : true,
  recievedDate: new Date(),
  acceptedDate: new Date(),
  accepted: Math.random() > .3 ? true: Math.random() > .6 ? false : null,
  indexNumber: Math.floor(Math.random() * 10),
  eventSectionId: faker.number.int(),
  bookingOrAvailability: Math.random() > .5 ?  "Booking" : "Availability",
  offerExpiry: null,
  status: "active",
  calls: [{
    id: faker.number.int(),
  createdAt: new Date(),
  updatedAt: new Date(),
  startTime: new Date(),
  endTime: new Date(),
  venue: faker.lorem.words(),
  eventId: faker.number.int(),
  fixerId: faker.string.uuid(),
  }],
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
  }
}

