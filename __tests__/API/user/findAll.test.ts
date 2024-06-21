import { prismaMock } from "../../../__mocks__/singleton";
import { mockUser } from "../../../__mocks__/models/user";
import { findUsers } from "../../../deprecatedPagesApi/api/user/findAll"; 



describe("findUsers function", () => {
  it("Returns all expected users", async() => {
    prismaMock.user.findMany.mockResolvedValue([mockUser])
    await expect(findUsers()).resolves.toEqual([mockUser])
  })
})