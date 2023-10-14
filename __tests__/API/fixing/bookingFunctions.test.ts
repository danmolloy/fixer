import { mockEventInstrumentWithMusiciansAndEvent } from '../../../__mocks__/models/eventInstrument'
import { mockPlayerCall, mockPlayerCallWithInstrumentAndMs } from '../../../__mocks__/models/playerCall'
import { prismaMock } from '../../../__mocks__/singleton'
import * as bookingFunctions from '../../../pages/api/fixing/bookingFunctions'


describe("updatePlayerCall()", () => {
  const updatePlayerCall = bookingFunctions.updatePlayerCall
  it("resolves with expected object", async() => {
    const data = {accepted: true}
    prismaMock.playerCall.update.mockResolvedValue(mockPlayerCall)
    await expect(updatePlayerCall(mockPlayerCall.id, data)).resolves.toEqual(mockPlayerCall)
  })
})

describe("getEventInstrumentStatus()", () => {
  const getEventInstrumentStatus = bookingFunctions.getEventInstrumentStatus

  it("returns expected object", async () => {
    const mockEvenInstrument = mockEventInstrumentWithMusiciansAndEvent
    prismaMock.eventInstrument.findUnique.mockResolvedValue(mockEvenInstrument)
    const obj = {
      deppers: mockEvenInstrument.musicians.filter(i => i.status === "DEP OUT"),
      instrumentSectionId: mockEvenInstrument.id,
      instrumentName: mockEvenInstrument.instrumentName,
      eventTitle: mockEvenInstrument.event.eventTitle,
      numYetToBook: mockEvenInstrument.numToBook - mockEvenInstrument.musicians.filter(i => i.accepted === true && i.bookingOrAvailability === "Booking").length
    }
    await expect(getEventInstrumentStatus(mockEvenInstrument.id)).resolves.toEqual(obj)
  })
})

describe("getEventInstrumentandMusiciansFromCall()", () => {
  const getInstrumentFromCallId = bookingFunctions.getEventInstrumentandMusiciansFromCall
  it("returns expected event obj", async () => {
    prismaMock.playerCall.findUnique.mockResolvedValue(mockPlayerCallWithInstrumentAndMs)
    await expect(getInstrumentFromCallId(2)).resolves.toEqual(mockPlayerCallWithInstrumentAndMs.eventInstrument)
  })
})

describe("getNumToBook()", () => {
  const getNumToBook = bookingFunctions.getNumToBook
  it("returns expected number", () => {
    const instrumentWithMs = mockEventInstrumentWithMusiciansAndEvent
    const numBooked = instrumentWithMs.musicians.filter(i => i.accepted === true && i.bookingOrAvailability === "Booking").length
    expect(getNumToBook(instrumentWithMs)).toBe(instrumentWithMs.numToBook - numBooked)
  })
})

describe("getEventInstrumentAndMusicians()", () => {
  const getInstrument = bookingFunctions.getEventInstrumentAndMusicians
  it("returns expected value", async () => {
    const mock = mockEventInstrumentWithMusiciansAndEvent
    prismaMock.eventInstrument.findUnique.mockResolvedValue(mock)
    await expect(getInstrument(mock.id)).resolves.toEqual(mock)
  })
})

describe("releaseDeppers()", () => {
  const releaseDeppers = bookingFunctions.releaseDeppers
  //const updatePlayerCall = jest.fn()
  it("returns expected", () => {})
})
describe("makeOffers()", () => {
  
})

describe("availabilityCheck()", () => {
  
})