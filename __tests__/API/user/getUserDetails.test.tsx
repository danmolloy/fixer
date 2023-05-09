import { getUser } from "../../../pages/api/user/getUserDetails";
import { prismaMock } from "../../../singleton";

const mockUser = {
  id: "mock123",
  name: null,     
  email: "mockEmail",
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

describe("getUser function", () => {
  it("unique user is returned", async() => {

    prismaMock.user.findUnique.mockResolvedValue(mockUser)
    await expect(getUser(mockUser.id)).resolves.toEqual({...mockUser})
  })
})

describe("emailGetUser function", async () => {
  it("unique user is returned", async () => {

    prismaMock.user.findUnique.mockResolvedValue(mockUser)
    await expect(getUser(mockUser.id)).resolves.toEqual({...mockUser})
  })
})
