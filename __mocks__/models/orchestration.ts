import { faker } from "@faker-js/faker/.";
import { Orchestration } from "@prisma/client";


export const mockOrchestration: Orchestration = {
  id: faker.number.int(),
  callId: faker.number.int(),
  eventSectionId: faker.number.int(),
  createdAt: new Date(),
  updatedAt: new Date(),
  numRequired: Math.ceil(Math.random() * 10)
};