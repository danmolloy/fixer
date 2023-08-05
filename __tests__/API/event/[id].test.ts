import { mockEvent } from '../../../__mocks__/models/event'
import { prismaMock } from '../../../__mocks__/singleton'
import { findEvent, findUsers } from '../../../pages/api/event/[id]'
import { getServerSession } from "next-auth"
import { authOptions } from "../../../pages/api/auth/[...nextauth]"
import { mockUser } from '../../../__mocks__/models/user'

jest.mock('next-auth', () => ({
  getServerSession: jest.fn(),
}));
jest.mock("../../../pages/api/auth/[...nextauth]", () => ({
  authOptions: {}
}))


describe("findEvent function", () => {
  it('Event is returned', async () => {
    prismaMock.event.findUnique.mockResolvedValue(mockEvent)
    await expect(findEvent(mockEvent.id)).resolves.toEqual(mockEvent)
  })
})

describe("findUsers function", () => {
  it("Returns expected value", async () => {
    prismaMock.user.findMany.mockResolvedValue([mockUser])
    await expect(findUsers()).resolves.toEqual([mockUser])
  })
})

