import { twilioClient } from "../../../../twilio";
import MessagingResponse from "twilio/lib/twiml/MessagingResponse";
import { replyToMessage, getOfferMsgBody, sendMessage } from "../../../../deprecatedPagesApi/api/fixing/messages";
import { mockMessage } from "../../../../__mocks__/models/messages";
import { mockOfferMsgArg } from "../../../../__mocks__/models/eventInstrument";

jest.mock("twilio/lib/twiml/MessagingResponse");
jest.mock("../../../../twilio", () => require("../../../../__mocks__/twilio"))

describe("replyToMessage()", () => {
  it("calls twiml with expected arg", () => {
    const twiml = new MessagingResponse()
    const body = mockMessage
    replyToMessage(body, twiml)
    expect(twiml.message).toBeCalledWith(mockMessage)

  })
})

describe("getOfferMsgBody()", () => {
  it("returns expected string", () => {
  expect(getOfferMsgBody(mockOfferMsgArg, mockOfferMsgArg.musicians[0].id)).toBe(`Hi ${mockOfferMsgArg.musicians[0].musician.firstName},
  ${mockOfferMsgArg.event.fixerName} ${mockOfferMsgArg.musicians[0].bookingOrAvailability === "Booking" ? "offers:" : "checks availability for:"}
  ${`${process.env.URL}/event/${mockOfferMsgArg.eventId}`}
  ${mockOfferMsgArg.messageToAll !== "" ? `\n Dan says to all ${mockOfferMsgArg.instrumentName} players for this gig: "${mockOfferMsgArg.messageToAll}"` : ""}
  ${mockOfferMsgArg.musicians[0].playerMessage !== null ? `\n Dan says to you: "${mockOfferMsgArg.musicians[0].playerMessage}"`: ""}
  Reply YES ${mockOfferMsgArg.musicians[0].id} to accept or NO ${mockOfferMsgArg.musicians[0].id} to decline.
  For other options, contact ${mockOfferMsgArg.event.fixerName} directly.`)
  })
})

describe("sendMessage()", () => {
  beforeEach(() => {
    const message = {
      create: jest.fn()
    };
    twilioClient['messages'] = message
  })
  it("calls twiml with expected value", async () => {
    const number = process.env.PHONE
    sendMessage(mockMessage, number)
    expect(twilioClient.messages.create).toBeCalledWith({
      body: mockMessage,
      messagingServiceSid: "MGa3507a546e0e4a6374af6d5fe19e9e16",
      to: number
    })
  })
})