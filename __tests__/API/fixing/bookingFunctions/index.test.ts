import { mockPlayerCall } from '../../../../__mocks__/models/playerCall'
import { prismaMock } from '../../../../__mocks__/singleton'
import * as bookingFunctions from '../../../../pages/api/fixing/bookingFunctions'
import * as messaging from "../../../../pages/api/fixing/messages/index"
import * as prismaFunctions from '../../../../pages/api/fixing/bookingFunctions/prismaFunctions'
import { mockEventSection, mockEventSectionAndMusicians, mockEventSectionWithMusicians } from '../../../../__mocks__/models/eventSection'

const mockEvenInstrument = mockEventSectionAndMusicians


jest.mock("../../../../pages/api/fixing/messages/index", () => {})
jest.mock('../../../../pages/api/fixing/bookingFunctions/prismaFunctions', () => ({
  getEventSectionAndMusicians: () => (
    mockEvenInstrument
  )
}))

describe("handleFixing()", () => {
  const handleFixing = bookingFunctions.handleFixing
  it("returns expected value", () => {})
})

describe("getEventInstrumentStatus()", () => {
  const getEventInstrumentStatus = bookingFunctions.getEventInstrumentStatus

  it("returns expected object", async () => {
    const obj = {
      deppers: mockEvenInstrument.musicians.filter(i => i.status === "DEP OUT") ,
      instrumentSectionId: mockEvenInstrument.id,
      instrumentName: mockEvenInstrument.ensembleSection.name,
      eventTitle: mockEvenInstrument.event.eventTitle,
      numYetToBook: mockEvenInstrument.numToBook - mockEvenInstrument.musicians.filter(i => i.accepted === true && i.bookingOrAvailability === "Booking").length
    }
    await expect(getEventInstrumentStatus(mockEvenInstrument.id)).resolves.toEqual(obj)
  })
})

describe("getNumToBook()", () => {
  const getNumToBook = bookingFunctions.getNumToBook
  it("returns expected number", () => {
    const instrumentWithMs = mockEventSectionWithMusicians
    const numBooked = instrumentWithMs.musicians.filter(i => i.accepted === true && i.bookingOrAvailability === "Booking").length
    expect(getNumToBook(instrumentWithMs)).toBe(instrumentWithMs.numToBook - numBooked)
  })
})


/* describe("releaseDeppers()", () => {
  const releaseDeppers = bookingFunctions.releaseDeppers
  //const updatePlayerCall = jest.fn()
  it("returns expected value", () => {

  })
}) */

/* describe("makeOffers()", () => {
  const makeOffers = bookingFunctions.makeOffers
  it("returns expected value", () => {})
  
}) */

/* describe("availabilityCheck()", () => {
  const availabilityCheck = bookingFunctions.availabilityCheck
  it("returns expected value", () => {})
}) */