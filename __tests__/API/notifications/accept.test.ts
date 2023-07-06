import { getEventInstrument } from "../../../pages/api/notifications/accept";
import { prismaMock } from "../../../__mocks__/singleton";
import { mockEventInstrument } from "../../../__mocks__/models/eventInstrument";

jest.mock("../../../twilio", () => require("../../../__mocks__/twilio"))



describe("getEventInstrument function", () => {

  it("returns expected values", async () => {
    prismaMock.eventInstrument.findUnique.mockResolvedValue(mockEventInstrument);
    expect(await getEventInstrument(mockEventInstrument.id)).toEqual(mockEventInstrument);
  })
}) 