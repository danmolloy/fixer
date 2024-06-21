import { removePlayerCall } from "../../../deprecatedPagesApi/api/fixing/removePlayer"
import { prismaMock } from "../../../__mocks__/singleton";
import { mockPlayerCall } from "../../../__mocks__/models/playerCall";
import { twilioClient } from "../../../twilio";
import { handleFixing } from "../../../deprecatedPagesApi/api/fixing/bookingFunctions"; 

jest.mock("../../../pages/api/fixing/bookingFunctions")
jest.mock("../../../twilio", () => require("../../../__mocks__/twilio"))

describe("removePlayerCall()", () => {
  it("returns unique user when passed userID", async() => {
    prismaMock.playerCall.delete.mockResolvedValue(mockPlayerCall)
    await expect(removePlayerCall(mockPlayerCall.id)).resolves.toEqual(undefined)
  })
})