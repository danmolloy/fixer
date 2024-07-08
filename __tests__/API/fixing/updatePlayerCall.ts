import { prismaMock } from "../../../__mocks__/singleton"
import { updatePlayerCall } from "../../../deprecatedPagesApi/api/fixing/bookingFunctions/prismaFunctions"
import { handleUpdate } from "../../../deprecatedPagesApi/api/fixing/updatePlayerCall"
import { handleFixing } from "../../../deprecatedPagesApi/api/fixing/bookingFunctions"

const randInt = Math.ceil(Math.random() * 100)

jest.mock("../../../pages/api/fixing/bookingFunctions/prismaFunctions", () => ({
  updatePlayerCall: jest.fn(() => ({
    eventSectionId: randInt
  }))
}))

jest.mock("../../../pages/api/fixing/bookingFunctions", () => ({
  handleFixing: jest.fn()
}))

describe("handleUpdate()", () => {
  it("updatePlayerCall and handleFixing are called with expected args", async () => {
    const randCallId = Math.ceil(Math.random() * 20)
    const data = {
      name: "Joe Bloggs"
    }
    await handleUpdate(randCallId, data)
    expect(updatePlayerCall).toHaveBeenCalledWith(randCallId, data)
    expect(handleFixing).toHaveBeenCalledWith(randInt)
  })
})