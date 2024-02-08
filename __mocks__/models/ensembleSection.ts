import { faker } from "@faker-js/faker";
import { EnsembleSection } from "@prisma/client";
import { SectionWithPlayers } from "../../components/ensemble/sections";
import { EnsembleSectionWithMusicians, FixingSection } from "../../components/fixing/fixing";
import { mockCall } from "./call";
import { randBool } from "./playerCall";


export const mockSection: EnsembleSection = {
  name: faker.lorem.word(),
  id: faker.string.uuid(),
  ensembleId: faker.string.uuid(),
  instrument: faker.lorem.word(),
}

export const mockFixingSection: FixingSection = {
  numToBook: 3,
  ensembleSectionId: faker.string.uuid(),
  createdAt: new Date(),
  updatedAt: new Date(),
  id: Math.ceil(Math.random() * 20),
  eventId:  Math.ceil(Math.random() * 20),
  bookingStatus: "ok",
  musicians: [{
    recievedDate: new Date(),
    acceptedDate: new Date(),
    indexNumber: Math.floor(Math.random() * 10),
    id: faker.number.int(),
  createdAt: new Date(),
  updatedAt: new Date(),
  recieved: randBool(),
  accepted: Math.random() > .5 ? randBool() : null,
  musicianId: faker.string.uuid(),
  eventSectionId: Math.ceil(Math.random() * 20),
  playerMessage: null,
  bookingOrAvailability: randBool() === true ? "Booking" : "Availability",
  offerExpiry: null,
  status: "active",
  musician: {
    id: faker.string.uuid(),
    name: faker.person.fullName(),
    email: faker.internet.email(),
    emailVerified: new Date(),
    image: faker.image.urlLoremFlickr(),
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    instrumentsList: ["Viola"],
    mobileNumber: faker.phone.number(),
    profileText: faker.lorem.paragraph(), 
    preferredMethod: "WhatsApp", 
    fixingEnsembles: []
  },
  calls: [
    mockCall
  ]
  }],
  ensembleSection: {
    instrument: faker.lorem.word(),
    name: faker.lorem.word(),
    id: faker.string.uuid(),
    ensembleId: faker.string.uuid(),
    members: [],
    extras: []
  }
}

const mockSectionId = faker.string.uuid()
const mockEnsembleId = faker.string.uuid()
export const mockSectionWithPlayers: SectionWithPlayers = {
  name: faker.lorem.word(),
  id: mockSectionId,
  ensembleId: mockEnsembleId,
  instrument: faker.lorem.word(),
  members: [{
    id: faker.string.uuid(),
    ensembleId: mockEnsembleId,
    userId: faker.string.uuid(),
    positionNumber: String(Math.ceil(Math.random() * 5)),
    positionTitle: faker.lorem.word(),
    sectionId: mockSectionId,
    user: {
      id: faker.string.uuid(),
      name: faker.person.fullName(),
      email: faker.internet.email(),
      emailVerified: new Date(),
      image: faker.image.urlLoremFlickr(),
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      mobileNumber: faker.phone.number(),
      fixingEnsembles: [faker.lorem.words(3)],
      profileText: faker.lorem.paragraph(),
      preferredMethod: "WhatsApp",
      instrumentsList: ["Cello", "Viola"]
    }
  }],
  extras: [{
    id: faker.string.uuid(),
    ensembleId: mockEnsembleId,
    userId: faker.string.uuid(),
    positionNumber: String(Math.ceil(Math.random() * 5)),
    positionTitle: faker.lorem.word(),
    sectionId: mockSectionId,
    user: {
      id: faker.string.uuid(),
      name: faker.person.fullName(),
      email: faker.internet.email(),
      emailVerified: new Date(),
      image: faker.image.urlLoremFlickr(),
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      mobileNumber: faker.phone.number(),
      fixingEnsembles: [faker.lorem.words(3)],
      profileText: faker.lorem.paragraph(),
      preferredMethod: "WhatsApp",
      instrumentsList: ["Cello", "Viola"]
    }
  }],

}

export const mockSectionWithMusicians: EnsembleSectionWithMusicians = {
  name: faker.lorem.word(),
  id: faker.string.uuid(),
  ensembleId: faker.string.uuid(),
  instrument: faker.lorem.word(),
  members: [{
    id: faker.string.uuid(),
    ensembleId: mockEnsembleId,
    userId: faker.string.uuid(),
    positionNumber: String(Math.ceil(Math.random() * 5)),
    positionTitle: faker.lorem.word(),
    sectionId: mockSectionId,
    user: {
      id: faker.string.uuid(),
      name: faker.person.fullName(),
      email: faker.internet.email(),
      emailVerified: new Date(),
      image: faker.image.urlLoremFlickr(),
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      mobileNumber: faker.phone.number(),
      fixingEnsembles: [faker.lorem.words(3)],
      profileText: faker.lorem.paragraph(),
      preferredMethod: "WhatsApp",
      instrumentsList: ["Cello", "Viola"]
    }
  }],
  extras: [{
    id: faker.string.uuid(),
    ensembleId: mockEnsembleId,
    userId: faker.string.uuid(),
    positionNumber: String(Math.ceil(Math.random() * 5)),
    positionTitle: faker.lorem.word(),
    sectionId: mockSectionId,
    user: {
      id: faker.string.uuid(),
      name: faker.person.fullName(),
      email: faker.internet.email(),
      emailVerified: new Date(),
      image: faker.image.urlLoremFlickr(),
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      mobileNumber: faker.phone.number(),
      fixingEnsembles: [faker.lorem.words(3)],
      profileText: faker.lorem.paragraph(),
      preferredMethod: "WhatsApp",
      instrumentsList: ["Cello", "Viola"]
    }
  }]
}