import { twilioClient } from "../../../twilio";

const mockMessage = "Hey baby"

jest.mock("../../../twilio", () => require("../../../__mocks__/twilio"))

describe("handler", () => {
  it("calls sendMessage with args", async () => {})
})