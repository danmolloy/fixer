import { twilioClient } from "../../../twilio";
import { prismaMock } from "../../../__mocks__/singleton";
import * as recieveCalls from "../../../pages/api/fixing/recieveCalls";
import MessagingResponse from "twilio/lib/twiml/MessagingResponse";
import { mockPlayerCall, mockPlayerCallMsging } from "../../../__mocks__/models/playerCall";
import { mockEventInstrumentWithMusiciansAndEvent } from "../../../__mocks__/models/eventInstrument";
import { mockMessage } from "../../../__mocks__/models/messages";
import { mockAllEventBooked } from "../../../__mocks__/models/event";


jest.mock("twilio/lib/twiml/MessagingResponse");
jest.mock("../../../twilio", () => require("../../../__mocks__/twilio"))

describe("msgFixer()", () => {
  beforeEach(() => {
    const message = {
      create: jest.fn()
    };
    twilioClient['messages'] = message
  })
  it("calls twilio with expected arg", () => {
    recieveCalls.msgFixer(mockMessage)
    expect(twilioClient.messages.create).toBeCalledWith({ 
      body: `All instruments are booked for ${mockMessage}`,  
      messagingServiceSid: 'MGa3507a546e0e4a6374af6d5fe19e9e16',      
      to: process.env.PHONE 
    })
  })
})

describe("regExCheck", () => {
  const regExCheck = recieveCalls.regExCheck
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

describe("sendMessage()", () => {
  const sendMessage = recieveCalls.sendMessage
  beforeEach(() => {
    const message = {
      create: jest.fn()
    };
    twilioClient['messages'] = message
  })
  it("calls twilio.messages.create with expected args", () => {
    const createMsgObj = {
      body: mockMessage,
      messagingServiceSid: "MGa3507a546e0e4a6374af6d5fe19e9e16",
      to: "+447479016386"
    }
    sendMessage(mockMessage)
    expect(twilioClient['messages'].create).toBeCalledWith(createMsgObj)
  })
})

describe("msgBody()", () => {
  const msgBody = recieveCalls.msgBody
  it("returns expected value", () => {
    expect(msgBody(mockPlayerCallMsging)).toBe(`Hi ${mockPlayerCallMsging.musician.name},
    ${mockPlayerCallMsging.eventInstrument.event.fixerName} ${mockPlayerCallMsging.bookingOrAvailability === "Booking" ? "offers:" : "checks availability for:"}
    ${`${process.env.URL}/event/${mockPlayerCallMsging.eventInstrument.eventId}`}
    ${mockPlayerCallMsging.eventInstrument.messageToAll !== "" ? `\n Dan says to all ${mockPlayerCallMsging.eventInstrument.instrumentName} players for this gig: "${mockPlayerCallMsging.eventInstrument.messageToAll}"` : ""}
    ${mockPlayerCallMsging.playerMessage !== null ? `\n Dan says to you: "${mockPlayerCallMsging.playerMessage}"`: ""}
    Reply YES ${mockPlayerCallMsging.id} to accept or NO ${mockPlayerCallMsging.id} to decline.
    For other options, contact ${mockPlayerCallMsging.eventInstrument.event.fixerName} directly.`)
  })
})

describe("updateDepOut", () => {
  const updateDepOut = recieveCalls.updateDepOut
  beforeEach(() => {
    const message = {
      create: jest.fn()
    };
    twilioClient['messages'] = message
  })
  it("Returns expected value", async () => {
    const twml = new MessagingResponse()
    prismaMock.playerCall.update.mockResolvedValue(mockPlayerCall)
    await expect(updateDepOut(mockPlayerCall.id, twml)).resolves.toEqual(undefined)
    expect(twml.message).toBeCalledWith(`Dan Molloy has released you from offer ${mockPlayerCall.id}.`)
  })
})

describe("checkInstrumentBooked()", () => {
  const checkInstrumentBooked = recieveCalls.checkInstrumentBooked
  it("returns true if instrument booked", () => {
    let eventInstrument = mockEventInstrumentWithMusiciansAndEvent
    eventInstrument.numToBook = eventInstrument.musicians.length
    eventInstrument.musicians.map(i => i.accepted = true)
    eventInstrument.musicians.map(i => i.bookingOrAvailability = "Booking")
    console.log(eventInstrument)
    expect(checkInstrumentBooked(eventInstrument)).toBe(true)

  })

  it("returns false if incorrect number booked", () => {
    let eventInstrument = mockEventInstrumentWithMusiciansAndEvent
    eventInstrument.numToBook = eventInstrument.musicians.length + 1
    eventInstrument.musicians.map(i => i.accepted = true)
    eventInstrument.musicians.map(i => i.bookingOrAvailability = "Booking")
    expect(checkInstrumentBooked(eventInstrument)).toBe(false)

  })

  it("returns false if correct number are checked for availability", () => {
    let eventInstrument = mockEventInstrumentWithMusiciansAndEvent
    eventInstrument.numToBook = eventInstrument.musicians.length
    eventInstrument.musicians.map(i => i.accepted = true)
    eventInstrument.musicians.map(i => i.bookingOrAvailability = "Availability")
    expect(checkInstrumentBooked(eventInstrument)).toBe(false)

  })
})


describe("updateAccepted", () => {
  it("returns", async () => {})
})

describe("makeCalls()", () => {
  const twiml = new MessagingResponse()
  jest.mock("../../../pages/api/fixing/recieveCalls", () => ({
    ...jest.requireActual("../../../pages/api/fixing/recieveCalls"), // Use the actual implementation for everything else
    checkIfAllEventBooked: jest.fn(), 
  }));
  it("Alerts if more musicians required", async () => {
/*     expect(await makeCalls({ ...mockEventInstrument, musicians: [] }, twiml)).toBe("Add musicians to list.");
 */  })

  it("calls checkIfAllEventBooked if instrument booked", async () => {
/*     await makeCalls({ ...mockEventInstrumentWithMusiciansAndEvent, numToBook: 1, musicians: [{...mockPlayerCall, accepted: true}] }, twiml)
    expect(checkIfAllEventBooked).toBeCalled() */
  })
})

describe("allEventBooked()", () => {
  const allEventBooked = recieveCalls.allEventBooked
  it("returns true if all booked", async () => {
    let bookedEvent = mockAllEventBooked
    for (let i = 0; i < bookedEvent.instrumentSections.length; i++) {
      bookedEvent.instrumentSections[i].numToBook = bookedEvent.instrumentSections[i].musicians.length
      bookedEvent.instrumentSections[i].musicians.map(i => i.accepted = true)
      bookedEvent.instrumentSections[i].musicians.map(i => i.bookingOrAvailability = "Booking")

    } 
    prismaMock.event.findUnique.mockResolvedValue(bookedEvent)
    await expect(allEventBooked(bookedEvent.id)).resolves.toBe(true)
  })
  it("returns false if players only checked for availability", async () => {
    let bookedEvent = mockAllEventBooked
    for (let i = 0; i < bookedEvent.instrumentSections.length; i++) {
      bookedEvent.instrumentSections[i].numToBook = bookedEvent.instrumentSections[i].musicians.length
      bookedEvent.instrumentSections[i].musicians.map(i => i.accepted = true)
      bookedEvent.instrumentSections[i].musicians.map(i => i.bookingOrAvailability = "Avialability")

    } 
    prismaMock.event.findUnique.mockResolvedValue(bookedEvent)
    await expect(allEventBooked(bookedEvent.id)).resolves.toBe(false)
  })
  it("return false if not enough players booked", async () => {
    let bookedEvent = mockAllEventBooked
    for (let i = 0; i < bookedEvent.instrumentSections.length; i++) {
      bookedEvent.instrumentSections[i].numToBook = bookedEvent.instrumentSections[i].musicians.length + 1
      bookedEvent.instrumentSections[i].musicians.map(i => i.accepted = true)
      bookedEvent.instrumentSections[i].musicians.map(i => i.bookingOrAvailability = "Booking")
    } 
    prismaMock.event.findUnique.mockResolvedValue(bookedEvent)
    await expect(allEventBooked(bookedEvent.id)).resolves.toBe(false)
  })
})

describe("callPlayer()", () => {  
  const callPlayer = recieveCalls.callPlayer
  beforeEach(() => {
    const message = {
      create: jest.fn()
    };
    twilioClient['messages'] = message
  })
  it("sendMessage() is called", async () => {
    const mockSendMessage = jest.fn()
    prismaMock.playerCall.update.mockResolvedValue(mockPlayerCallMsging)
    await expect(callPlayer(mockEventInstrumentWithMusiciansAndEvent.id, mockSendMessage)).resolves.toBe(undefined)
    expect(mockSendMessage).toBeCalled()
  })
})