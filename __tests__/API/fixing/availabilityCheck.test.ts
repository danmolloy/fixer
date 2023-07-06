import { mockEventInstrument } from '../../../__mocks__/models/eventInstrument'
import { mockPlayerCall } from '../../../__mocks__/models/playerCall'
import { prismaMock } from '../../../__mocks__/singleton'
import { 
  updatePlayer, 
  makeCalls, 
  handleBooking, 
  updateEventDetails, 
  getEventInstrument 
} from '../../../pages/api/fixing/availabilityCheck'
import { twilioClient } from '../../../twilio'

jest.mock("../../../twilio", () => require("../../../__mocks__/twilio"))


const mockInstrumentObj = {
  eventId: mockEventInstrument.eventId,
  musicians: [],
  eventInstrumentId: mockEventInstrument.id,
  bookingOrAvailability: mockPlayerCall.bookingOrAvailability,
  messageToAll: mockEventInstrument.messageToAll,
  bookingStatus: mockEventInstrument.bookingStatus,
}


describe("getEventInstrument", () => {
  it("Returns expected event", async() => {
    prismaMock.eventInstrument.findUnique.mockResolvedValue(mockEventInstrument)
    await expect(getEventInstrument(mockEventInstrument.id)).resolves.toEqual(mockEventInstrument)
  })
  
})

describe("updateEventDetails", () => {
  it("updates event", async () => {
    prismaMock.eventInstrument.update.mockResolvedValue(mockEventInstrument)
    await expect(updateEventDetails(mockEventInstrument)).resolves.toEqual(mockEventInstrument)

  })
})


describe("updatePlayer", () => {
  it("Returns expected value", async () => {
    prismaMock.playerCall.update.mockResolvedValue(mockPlayerCall)
    await expect(updatePlayer(mockPlayerCall.id)).resolves.toEqual(mockPlayerCall)

  })
})

describe("makeCalls", () => {
  it("Returns expected value", async () => {
    prismaMock.eventInstrument.findUnique.mockResolvedValue(mockEventInstrument)
    await expect(makeCalls(mockEventInstrument.id, "Availability")).resolves
  })
})


describe("handleBooking", () => {
  it("Returns expected value", async () => {
    prismaMock.eventInstrument.update.mockResolvedValue(mockEventInstrument)
    expect(await handleBooking(mockInstrumentObj)).resolves
  })
}) 



