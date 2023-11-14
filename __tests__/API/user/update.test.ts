import { mockUser, mockUserId } from "../../../__mocks__/models/user"
import { prismaMock } from "../../../__mocks__/singleton"
import { updateUser } from "../../../pages/api/user/update" 

describe("updateUser()", () => {
  it("resolves to update user", async () => {
    prismaMock.user.update.mockResolvedValue(mockUser)
    await expect(updateUser({data: mockUser, userId: mockUserId})).resolves.toEqual(mockUser)
  })
})