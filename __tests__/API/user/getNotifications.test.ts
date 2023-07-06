import { prismaMock } from "../../../__mocks__/singleton"
import { mockUser } from "../../../__mocks__/models/user"
import { getUser, emailGetUser } from "../../../pages/api/user/getNotificationsFunctions"
import { mockCall } from "../../../__mocks__/models/call"

const mockUserDetails = {
  ...mockUser,
  calls: [mockCall]
}

describe("getUser function", () => {
  it("returns expected value", async () => {
    prismaMock.user.findUnique.mockResolvedValue(mockUserDetails)
    expect(await getUser(mockUserDetails.id)).toEqual(mockUserDetails)
  })
})

describe("emailGetUser function", () => {
  it("returns expected value", async () => {
    prismaMock.user.findUnique.mockResolvedValue(mockUserDetails)
    expect(await emailGetUser(mockUserDetails.email)).toEqual(mockUserDetails)
  })
})