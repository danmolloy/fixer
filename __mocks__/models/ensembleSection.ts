import { faker } from "@faker-js/faker";
import { EnsembleSection } from "@prisma/client";
import { SectionWithPlayersAndBulletins } from "../../components/ensemble/sections";


export const mockSection: EnsembleSection = {
  name: faker.lorem.word(),
  id: faker.string.uuid(),
  ensembleId: faker.string.uuid(),
}

const mockSectionId = faker.string.uuid()
const mockEnsembleId = faker.string.uuid()
export const mockSectionWithPlayersAndBulletins: SectionWithPlayersAndBulletins = {
  name: faker.lorem.word(),
  id: mockSectionId,
  ensembleId: mockEnsembleId,
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
  bulletins: [{
    id: faker.string.uuid(),
    title: faker.lorem.words(3),
    date: new Date(),
    authorId: faker.string.uuid(),
    body: faker.lorem.paragraph()
  }]
}