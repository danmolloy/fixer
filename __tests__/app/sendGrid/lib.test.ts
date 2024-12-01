import { mockSentEmail } from "../../../__mocks__/models/sentEmail";
import { prismaMock } from "../../../__mocks__/singleton";
import { createSentEmail } from "../../../app/sendGrid/lib";

Date.now = jest.fn().mockReturnValue("2024-11-29T17:08:58.684Z")

describe("createSentEmail()", () => {
  const mockArg = {
    subject: "Hello, world.",
    bodyText: "My first email!",
    reponseLink: "do-not-reply",
    email: ["michael@morgan.com.au"],
    templateID: "firemanSam",
    eventId: 4242
  }
  it("calls sentEmail.create with expected arg", async () => {
    prismaMock.sentEmail.create.mockResolvedValue(mockSentEmail);
    await createSentEmail(mockArg);
    expect(prismaMock.sentEmail.create).toHaveBeenCalledWith({
      data: {
        subject: mockArg.subject,
        bodyText: mockArg.bodyText,
        email: mockArg.email.toString(),
        timestamp: new Date(Date.now()),
        event: {
          connect: {
            id: Number(mockArg.eventId),
          },
        },
      },
    })
  })
});