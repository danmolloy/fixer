import { prismaMock } from "../../../singleton";
import { findUsers } from "../../../pages/api/user/findAll"; 

const mockUserArr = [
  {
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
]

describe("findUsers function", () => {
  it("Returns all expected users", async() => {
    prismaMock.user.findMany.mockResolvedValue([...mockUserArr])
    await expect(findUsers()).resolves.toEqual([...mockUserArr])
  })
})