import { twilioClient } from "../../../twilio";
import MessagingResponse from "twilio/lib/twiml/MessagingResponse";
import { prismaMock } from "../../../__mocks__/singleton";
import * as recieveTextMessage from '../../../pages/api/fixing/recieveTextMessage'
import { mockPlayerCall } from "../../../__mocks__/models/playerCall";
import { mockMessage } from "../../../__mocks__/models/messages";

jest.mock("twilio/lib/twiml/MessagingResponse");
jest.mock("../../../twilio", () => require("../../../__mocks__/twilio"))

//describe("checkMessage()", () => {})
describe("getYesOrNo()", () => {
  const getYesOrNo = recieveTextMessage.getYesOrNo
  it("returns true when expected", () => {
    expect(getYesOrNo("Yes 1")).toBe(true)
    expect(getYesOrNo("Yes 18291")).toBe(true)
    expect(getYesOrNo("YES 1")).toBe(true)
    expect(getYesOrNo("yes 1")).toBe(true)
    expect(getYesOrNo("    Yes 1")).toBe(true)
  })
  it("returns false when expected", () => {
    expect(getYesOrNo("No 1")).toBe(false)
    expect(getYesOrNo("NO 18291")).toBe(false)
    expect(getYesOrNo("no 1")).toBe(false)
    expect(getYesOrNo("nO 1")).toBe(false)
    expect(getYesOrNo("    no 1")).toBe(false)
    expect(getYesOrNo("no32")).toBe(false)

  })
  it("returns undefined when expected", () => {
    expect(getYesOrNo("")).toBe(undefined)
    expect(getYesOrNo("lwjr")).toBe(undefined)
    expect(getYesOrNo("yes no")).toBe(undefined)
    expect(getYesOrNo(" n o 23")).toBe(undefined)
    expect(getYesOrNo("n 22")).toBe(undefined)
  })
})
describe("getCallId()", () => {
  const getCallId = recieveTextMessage.getCallId
  it("returns callId when expected", () => {
    expect(getCallId("n 22")).toBe(22)
    expect(getCallId("dfwe2")).toBe(2)
    expect(getCallId("2 ldjfa-")).toBe(2)
    expect(getCallId("9832ncas")).toBe(9832)

  })
  it("returns undefined if no ID in message", () => {
    expect(getCallId("2 2")).toBe(undefined)
    expect(getCallId("n ")).toBe(undefined)
    expect(getCallId("dfwe")).toBe(undefined)
    expect(getCallId("  ldjfa-")).toBe(undefined)
    expect(getCallId("ncas")).toBe(undefined)
  })
})

//describe("getEventInstrumentFromCall()", () => {})
//describe("getEventInstrument()", () => {})
//describe("getEventInstrumentStatus()", () => {})

//describe("makeOffers()", () => {})

