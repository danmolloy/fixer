import { twilioClient } from "../../../twilio";
import { prismaMock } from "../../../__mocks__/singleton";
import { makeCalls, regExCheck, updateAccepted, updateDepOut } from "../../../pages/api/fixing/recieveCalls";
import MessagingResponse from "twilio/lib/twiml/MessagingResponse";
import { mockPlayerCall } from "../../../__mocks__/models/playerCall";
import { mockEventInstrument } from "../../../__mocks__/models/eventInstrument";


jest.mock("twilio/lib/twiml/MessagingResponse");
jest.mock("twilio", () => ({
  twiml: () => ({
    MessagingResponse: jest.fn()
  })
}))
jest.mock("../../../twilio", () => require("../../../__mocks__/twilio"))



describe("updateDepOut", () => {
  it("Returns expected value", async () => {
    const twml = new MessagingResponse()
    prismaMock.playerCall.update.mockResolvedValue(mockPlayerCall)
    await expect(updateDepOut(mockPlayerCall.id, twml)).resolves.toEqual(undefined)
    expect(twml.message).toBeCalledWith(`Dan Molloy has released you from offer ${mockPlayerCall.id}.`)
  })
})

describe("regExCheck", () => {
  it("returns true when expected", () => {
    expect(regExCheck("Yes 1")).toBe(true)
    expect(regExCheck("Yes 18291")).toBe(true)
    expect(regExCheck("YES 1")).toBe(true)
    expect(regExCheck("yes 1")).toBe(true)
    expect(regExCheck("    Yes 1")).toBe(true)
  })
  it("returns false when expected", () => {
    expect(regExCheck("No 1")).toBe(false)
    expect(regExCheck("NO 18291")).toBe(false)
    expect(regExCheck("no 1")).toBe(false)
    expect(regExCheck("nO 1")).toBe(false)
    expect(regExCheck("    no 1")).toBe(false)
    expect(regExCheck("no32")).toBe(false)

  })
  it("returns undefined when expected", () => {
    expect(regExCheck("")).toBe(undefined)
    expect(regExCheck("lwjr")).toBe(undefined)
    expect(regExCheck("yes no")).toBe(undefined)
    expect(regExCheck(" n o 23")).toBe(undefined)
    expect(regExCheck("n 22")).toBe(undefined)
  })
})

describe("updateAccepted", () => {
  it("returns", async () => {
  })
})

describe("makeCalls", () => {
  const twiml = new MessagingResponse()
  const updatedDepOut = jest.fn()
  const callPlayer = jest.fn()
  it("Alerts if more musicians required", async () => {
    expect(await makeCalls({ ...mockEventInstrument, musicians: [] }, twiml)).toBe("Add musicians to list.");
  })
  it("Alerts if instrument booked", async () => {
    expect(await makeCalls({ ...mockEventInstrument, numToBook: 1, musicians: [{...mockPlayerCall, accepted: true}] }, twiml)).toBe("Instrument booked.");

  })
})