import { handleFixing } from "../../../deprecatedPagesApi/api/fixing/bookingFunctions"
import { updatePlayerCall } from "../../../deprecatedPagesApi/api/fixing/bookingFunctions/prismaFunctions"
import { handleOffer } from "../../../deprecatedPagesApi/api/fixing/offer"

const randInt = Math.ceil(Math.random() * 100)

jest.mock("../../../pages/api/fixing/bookingFunctions/prismaFunctions", () => ({
  updatePlayerCall: jest.fn(() => ({
    eventSectionId: randInt
  }))
}))

jest.mock("../../../pages/api/fixing/bookingFunctions", () => ({
  handleFixing: jest.fn()
}))


describe("handleOffer()", () => {
  it("updatePlayerCall and handleFixing are called with expected args", async () => {
    const randId = Math.ceil(Math.random() * 50)
    await handleOffer(randId)
    expect(updatePlayerCall).toHaveBeenCalledWith(randId, {
      bookingOrAvailability: "Booking",
      recieved: false,
      accepted: null
    })
    expect(handleFixing).toHaveBeenCalledWith(randInt)
  })
})