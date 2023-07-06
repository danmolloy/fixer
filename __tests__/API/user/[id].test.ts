import { findUser } from "../../../pages/api/user/[id]"; 
import { prismaMock } from "../../../__mocks__/singleton";
import { mockUser } from "../../../__mocks__/models/user";


describe("findUser function", () => {
  it("returns unique user when passed userID", async() => {
    
    prismaMock.user.findUnique.mockResolvedValue(mockUser)
    expect(await findUser(mockUser.id)).toEqual({...mockUser})
  })
})