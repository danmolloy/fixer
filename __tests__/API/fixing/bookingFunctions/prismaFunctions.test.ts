import { mockEvenInstrumentWithMusicians, mockEventInstrumentWithMusiciansAndEvent, mockOfferMsgArg } from '../../../../__mocks__/models/eventInstrument'
import { mockPlayerCall, mockPlayerCallWithInstrumentAndMs } from '../../../../__mocks__/models/playerCall'
import { prismaMock } from '../../../../__mocks__/singleton'
import * as prismaFunctions from '../../../../pages/api/fixing/bookingFunctions/prismaFunctions'

describe("createPlayerCall()", () => {
  const createPlayerCall = prismaFunctions.createPlayerCall

  it("resolves", async () => {
    const playerCall = mockPlayerCall
    const mockData: prismaFunctions.CreatePlayerCallData = {
      musicianId: String(playerCall.id),
      playerMessage: "",
      eventInstrumentId: playerCall.eventInstrumentId,
      offerExpiry: 0,
      bookingOrAvailability: "Booking",
      calls: {
        connect: []
      }
    }

    prismaMock.playerCall.create.mockResolvedValue(mockPlayerCall)
    await expect(createPlayerCall(mockData)).resolves.toEqual(mockPlayerCall)

  })
})

describe("updateEventInstrument", () => {
  const updateEventInstrument = prismaFunctions.updateEventInstrument
  it("resolves", async() => {
    const mockInstrument = mockEvenInstrumentWithMusicians
    prismaMock.eventInstrument.update.mockResolvedValue(mockInstrument)
    await expect(updateEventInstrument(mockInstrument.id, {})).resolves.toEqual(mockInstrument)
  })
})

describe("getEventInstrumentAndMsAndMs()", () => {
  const getInstrument = prismaFunctions.getEventInstrumentAndMsAndMs
  it("resolves", async () => {
    const mockInstrument = mockOfferMsgArg
    prismaMock.eventInstrument.findUnique.mockResolvedValue(mockInstrument)
    await expect(getInstrument(mockInstrument.id)).resolves.toEqual(mockInstrument)

  })
})

describe("updatePlayerCall()", () => {
  const updatePlayerCall = prismaFunctions.updatePlayerCall
  it("resolves with expected object", async() => {
    const data = {accepted: true}
    prismaMock.playerCall.update.mockResolvedValue(mockPlayerCall)
    await expect(updatePlayerCall(mockPlayerCall.id, data)).resolves.toEqual(mockPlayerCall)
  })
})

describe("getEventInstrumentandMusiciansFromCall()", () => {
  const getInstrumentFromCallId = prismaFunctions.getEventInstrumentandMusiciansFromCall
  it("returns expected event obj", async () => {
    prismaMock.playerCall.findUnique.mockResolvedValue(mockPlayerCallWithInstrumentAndMs)
    await expect(getInstrumentFromCallId(2)).resolves.toEqual(mockPlayerCallWithInstrumentAndMs.eventInstrument)
  })
})

describe("getEventInstrumentAndMusicians()", () => {
  const getInstrument = prismaFunctions.getEventInstrumentAndMusicians
  it("returns expected value", async () => {
    const mock = mockEventInstrumentWithMusiciansAndEvent
    prismaMock.eventInstrument.findUnique.mockResolvedValue(mock)
    await expect(getInstrument(mock.id)).resolves.toEqual(mock)
  })
})