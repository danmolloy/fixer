import { mockEvenInstrumentWithMusicians, mockEventInstrumentWithMusiciansAndEvent } from '../../../../__mocks__/models/eventInstrument'
import { mockPlayerCall, mockPlayerCallWithInstrumentAndMs } from '../../../../__mocks__/models/playerCall'
import { prismaMock } from '../../../../__mocks__/singleton'
import * as bookingFunctions from '../../../../pages/api/fixing/bookingFunctions'
import * as messaging from "../../../../pages/api/fixing/messages/index"
import * as prismaFunctions from '../../../../pages/api/fixing/bookingFunctions/prismaFunctions'

jest.mock("../../../../pages/api/fixing/messages/index", () => {})

describe("handleFixing()", () => {
  const handleFixing = bookingFunctions.handleFixing
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

describe("getNumToBook()", () => {
  const getNumToBook = bookingFunctions.getNumToBook
  it("returns expected number", () => {
    const instrumentWithMs = mockEventInstrumentWithMusiciansAndEvent
    const numBooked = instrumentWithMs.musicians.filter(i => i.accepted === true && i.bookingOrAvailability === "Booking").length
    expect(getNumToBook(instrumentWithMs)).toBe(instrumentWithMs.numToBook - numBooked)
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