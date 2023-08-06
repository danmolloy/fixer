import { prismaMock } from "../../../__mocks__/singleton" ;
import { emailGetCalendar, getCalendar } from "../../../pages/api/calendar/getCalendar";
import { mockUser } from "../../../__mocks__/models/user";
import { mockCall } from "../../../__mocks__/models/call";
import { getServerSession } from "next-auth"
import { authOptions } from "../../../pages/api/auth/[...nextauth]"

jest.mock('next-auth', () => ({
  getServerSession: jest.fn(),
}));
jest.mock("../../../pages/api/auth/[...nextauth]", () => ({
  authOptions: {}
}))

const mockUserCalendar = {
      ...mockUser,
      calls: [mockCall]
}
  

describe("getCalendar function", () => {
  it("returns expected value", async () => {
    prismaMock.user.findUnique.mockResolvedValue(mockUserCalendar);
    expect(await getCalendar(mockUserCalendar.id)).toEqual(mockUserCalendar);
  })
})

describe("emailGetCalendar function", () => {
  it("returns expected value", async () => {
    prismaMock.user.findUnique.mockResolvedValue(mockUserCalendar);
    expect(await emailGetCalendar(mockUserCalendar.email)).toEqual({...mockUserCalendar})
  })
})