import { prismaMock } from "../../../__mocks__/singleton";
import { emailGetCalendar, getCalendar } from "../../../pages/api/calendar/getCalendarFunctions";
import { mockUser } from "../../../__mocks__/models/user";
import { mockCall } from "../../../__mocks__/models/call";

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