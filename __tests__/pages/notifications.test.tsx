import "@testing-library/jest-dom"
import { render, screen, waitFor } from "@testing-library/react"
import NotificationsPage from "../../pages/notifications"
import { mockUser, mockUserWithCallsAndEvents } from "../../__mocks__/models/user";

const mockSession = {
  user: mockUser,
  userData: {
    mockUserWithCallsAndEvents,
    playerCalls: []
  }
}

jest.mock('next-auth/react', () => ({
  useSession: jest.fn(),
}));

global.fetch = jest.fn(() =>
Promise.resolve({
  json: () => Promise.resolve({
      data: {...mockUserWithCallsAndEvents,
      playerCalls: []}
    })
  })
) as jest.Mock;

describe("<NotificationsPage />", () => {
  beforeEach(() => {
    require("swr").useSWR = jest.fn(() => ({
      ...mockUserWithCallsAndEvents,
      playerCalls: []}))
    const mockUseSession = jest.fn(() => ({ data: mockSession, status: 'authenticated' }));
    require('next-auth/react').useSession = mockUseSession;

    waitFor(() => render(<NotificationsPage />))
  })
  it("if session, <NotificationsIndex /> is in the document", () => {})
  it("if session, <SessionLayout is in the document", () => {})
  it("if !session, <ExternalLayout /> is in the document", () => {})
  it("if !session, <SignInPage /> is in the document", () => {})
})