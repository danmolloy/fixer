import { messagePlayer } from '../../../pages/api/fixing/messagePlayer'
import { twilioClient } from "../../../twilio";

const mockMessage = "Hey baby"

jest.mock("../../../twilio", () => require("../../../__mocks__/twilio"))

describe("messagePlayer", () => {
  it("Resolves", async () => {
    expect(await messagePlayer(mockMessage)).resolves
  })
})