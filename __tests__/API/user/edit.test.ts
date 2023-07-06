import { prismaMock } from "../../../__mocks__/singleton";
import { mockUser } from "../../../__mocks__/models/user";
import { updateUser } from "../../../pages/api/user/edit";


const mockUpdateUserData = {
  userId: mockUser.id,
  name: "Greg Ievers",
  email: "greg@tss.edu.au",
  instrument: "Viola"
}

describe("updateUser function", () => {
  it("Returns expected value", async () => {
    prismaMock.user.update.mockResolvedValue(mockUser)
    expect(await updateUser(mockUpdateUserData)).toEqual(mockUser)
  })
})