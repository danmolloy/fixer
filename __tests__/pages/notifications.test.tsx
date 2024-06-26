import "@testing-library/jest-dom"
import { render, screen, waitFor } from "@testing-library/react"
import NotificationsPage from "../../deprecatedPagesApi/notifications"
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
  json: () => Promise.resolve([mockUser])
  })
) as jest.Mock;


describe("<NotificationsPage />", () => {
  beforeEach(() => {
    global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve({
          ...mockUserWithCallsAndEvents,
          playerCalls: []
        })
      })
    ) as jest.Mock;
    const mockUseSession = jest.fn(() => ({ data: mockSession, status: 'authenticated' }));
    require('next-auth/react').useSession = mockUseSession;

    waitFor(() => render(<NotificationsPage />))
  })
  it("if session, <NotificationsIndex /> is in the document", () => {
    const notificationsIndex = screen.getByTestId("notifications-index")
    expect(notificationsIndex).toBeInTheDocument()
  })
  it("if session, <SessionLayout is in the document", () => {
    const sessionLayout = screen.getByTestId("session-layout")
    expect(sessionLayout).toBeInTheDocument()
  })
})


describe("<NotificationsPage />", () => {
  beforeEach(() => {
    const mockUseSession = jest.fn(() => ({}));
    require('next-auth/react').useSession = mockUseSession;

    waitFor(() => render(<NotificationsPage />))
  })
  it("if !session, <ExternalLayout /> is in the document", () => {
    const externalLayout = screen.getByTestId("external-layout")
    expect(externalLayout).toBeInTheDocument()
  })
  it("if !session, <SignInPage /> is in the document", () => {
    const signIn = screen.getByTestId("sign-in-index")
    expect(signIn).toBeInTheDocument()
  })
})
