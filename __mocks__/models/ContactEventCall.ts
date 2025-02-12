import { faker } from "@faker-js/faker/.";
import { ContactEventCall, ContactEventCallStatus } from "@prisma/client";

const status: ContactEventCallStatus[] = ["ACCEPTED", "AVAILABLE", "CHECKING", "DECLINED", "OFFERING", "TOCHECK", "TOOFFER"]

export const mockContactEventCall: ContactEventCall = {
  id: faker.string.uuid(),
  callId: faker.number.int(),
  contactMessageId: faker.number.int(),
  status: status[Math.floor(Math.random() * status.length)]
};