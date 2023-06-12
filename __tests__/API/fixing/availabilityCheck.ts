import { prismaMock } from '../../../singleton'
import { 
  updatePlayer, 
  makeCalls, 
  handleBooking, 
  updateEventDetails, 
  getEventInstrument 
} from '../../../pages/api/fixing/availabilityCheck'

const mockInstrumentObj = {
  eventId: 2,
  musicians: [],
  eventInstrumentId: 1,
  bookingOrAvailability: "Availability",
  messageToAll: "",
  bookingStatus: "active",
}

const mockEventInstrument = {
  id: mockInstrumentObj.eventInstrumentId,
  createdAt: new Date(),
  updatedAt: new Date(),
  event: {},
  eventId: mockInstrumentObj.eventId,
  instrumentName: "Viola",
  bookingStatus: "active",
  musicians: [],
  numToBook: 1,
  callOrder: "Ordered",
  fixerNote: "",
  messageToAll: "",
}

const mockPlayerCall = {
  id: 2,
  createdAt: new Date(),
  updatedAt: new Date(),
  eventInstrument: mockEventInstrument,
  musician: {},
  recieved: false,
  accepted: null,
  musicianId: "129z",
  eventInstrumentId: mockEventInstrument.id,
  playerMessage: "",
  calls: [],
  bookingOrAvailability: "Availability",
  offerExpiry: 1

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
    await expect(updateEventDetails(mockInstrumentObj)).resolves.toEqual(mockEventInstrument)

  })
})


describe("updatePlayer", () => {
  it("Returns expected value", async () => {
    prismaMock.playerCall.update.mockResolvedValue(mockPlayerCall)
    await expect(updatePlayer(mockPlayerCall.id)).resolves.toEqual(mockPlayerCall)

  })
})




//describe("makeCalls", () => {})
//describe("numToCall", () => {})
//describe("handleBooking", () => {})
