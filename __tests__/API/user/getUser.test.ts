import { prismaMock } from "../../../__mocks__/singleton";
import { mockUser } from "../../../__mocks__/models/user";
import { findUser } from "../../../pages/api/user/getUser";

describe("findUser function", () => {
  it("returns unique user when passed userID", async() => {

    prismaMock.user.findUnique.mockResolvedValue(mockUser)
    await expect(findUser(mockUser.id)).resolves.toEqual({...mockUser})
  })
})