import { prismaMock } from "../../../singleton";
import { findUser } from "../../../pages/api/user/getUser";

const mockUser = {
  id: "mockID",
  name: null,     
  email: null,
  emailVerified: null,
  image: null,
  instrument: null,
  profileInfo: null,
  firstName: null,
  lastName: null,
  mobileNumber: null,
  accounts: [],
  sessions: [],
  quickFixes: [],
  events: [],
  playerCalls: [],
  calls: []
}

describe("findUser function", () => {
  it("returns unique user when passed userID", async() => {

    prismaMock.user.findUnique.mockResolvedValue(mockUser)
    await expect(findUser(mockUser.id)).resolves.toEqual({...mockUser})
  })
})