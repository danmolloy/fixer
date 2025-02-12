import { EmailStatus, SentEmail } from '@prisma/client';
import { faker } from '@faker-js/faker';

const emailStatusArr: EmailStatus[] = ["BOUNCE", "CLICK", "DELIVERED", "OPEN", "PROCESSED"];

export const mockSentEmail: SentEmail = {
  id: faker.string.uuid(),
  createdAt: new Date(),
  updatedAt: new Date(),
  email: faker.internet.email(),
  subject: faker.lorem.words(3),
  bodyText: faker.lorem.paragraph(1),
  status: emailStatusArr[Math.floor(Math.random() * emailStatusArr.length)],
  eventId: Math.ceil(Math.random() * 1000),
  timestamp: new Date(),
};
