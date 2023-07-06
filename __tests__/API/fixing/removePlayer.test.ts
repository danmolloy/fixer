import { removePlayerCall } from "../../../pages/api/fixing/removePlayer"
import { prismaMock } from "../../../__mocks__/singleton";
import { mockEventInstrument } from "../../../__mocks__/models/eventInstrument";
import { mockPlayerCall } from "../../../__mocks__/models/playerCall";

const mockInstrumentObj = {
  eventId: mockEventInstrument.eventId,
  musicians: [],
  eventInstrumentId: mockEventInstrument.id,
  bookingOrAvailability: mockPlayerCall.bookingOrAvailability,
  messageToAll: mockEventInstrument.messageToAll,
  bookingStatus: mockEventInstrument.bookingStatus,
}



describe("findUser function", () => {
  it("returns unique user when passed userID", async() => {

    prismaMock.playerCall.delete.mockResolvedValue(mockPlayerCall)
    await expect(removePlayerCall(mockPlayerCall.id)).resolves.toEqual(mockPlayerCall)
  })
})