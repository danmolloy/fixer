import { mockEvent } from "../../../__mocks__/models/event"
import { prismaMock } from "../../../__mocks__/singleton"
import { allEvents } from "../../../deprecatedPagesApi/api/event/findAll"

describe("allEvents function", () => {
  it("Returns expected value", async() => {
    prismaMock.event.findMany.mockResolvedValue([mockEvent])
    await expect(allEvents()).resolves.toEqual([mockEvent].map(i => ({
      params: {
        id: String(i.id)
      }
    })))
  })
})