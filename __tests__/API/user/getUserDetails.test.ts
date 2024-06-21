import { getUser, emailGetUser } from "../../../deprecatedPagesApi/api/user/getUserDetailsFunctions";
import { prismaMock } from "../../../__mocks__/singleton";
import { mockUser } from "../../../__mocks__/models/user";


describe("getUser function", () => {
  it("unique user is returned", async() => {
    prismaMock.user.findUnique.mockResolvedValue(mockUser)
    expect(await getUser(mockUser.id)).toEqual({...mockUser})
  })
})
