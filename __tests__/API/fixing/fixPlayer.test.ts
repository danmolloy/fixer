import { updatePlayerCall, sendMessage } from "../../../pages/api/fixing/fixPlayer";
import { prismaMock } from "../../../__mocks__/singleton";
import { twilioClient } from "../../../twilio";
import { mockPlayerCall } from "../../../__mocks__/models/playerCall";

jest.mock("../../../twilio", () => require("../../../__mocks__/twilio"))
const smsMessageResultMock = {
  status: 'sent',
  sid: 'AC-lorem-ipsum',
  errorCode: undefined,
  errorMessage: undefined,
};

const mockRes = {
  id: "1",
  musician: {
    name: "Greg Ievers"
  }
}



describe("updatePlayerCall", () => {
  it("Returns expected value", async () => {
    prismaMock.playerCall.update.mockResolvedValue(mockPlayerCall)
    await expect(updatePlayerCall(mockPlayerCall.id)).resolves.toEqual(mockPlayerCall)
  })
})
//describe("updateAndMessage", () => {})


describe("sendMessage", () => {
  beforeEach(() => {
    const message = {
      create: jest.fn()
    };
    twilioClient['messages'] = message
  })
  
  it("Returns expected value", async() => {
    await expect(sendMessage(mockRes)).resolves
  }) 
})