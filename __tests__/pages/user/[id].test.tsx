import "@testing-library/jest-dom"
import { render, screen, waitFor } from "@testing-library/react"
import { mockUser, mockUserWithCallsAndEvents } from "../../../__mocks__/models/user";
import UserPage from "../../../pages/user/[id]";
import ProfileHeader from "../../../components/users/profile/profileHeader";
jest.mock("../../../components/users/profile/profileHeader") // Couldn't resolve a mockData issue so have mocked this.

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

describe("<UserPage />", () => {
  beforeEach(() => {
    global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve({
          ...mockUser,
          playerCalls: []
        })
      })
    ) as jest.Mock;
    
    const mockUseSession = jest.fn(() => ({ data: mockSession, status: 'authenticated' }));
    require('next-auth/react').useSession = mockUseSession;

     waitFor(() => render(<UserPage />))
  })
  it("if session, <UserProfile /> is in the document", () => {
    const userProfile = screen.getByTestId("user-profile")
    expect(userProfile).toBeInTheDocument()
  })
  it("if session, <SessionLayout /> is in the document", () => {
    const sessionLayout = screen.getByTestId("session-layout")
    expect(sessionLayout).toBeInTheDocument()
  })
})

describe("<UserPage />", () => {
  beforeEach(() => {
    const mockUseSession = jest.fn(() => ({}));
    require('next-auth/react').useSession = mockUseSession;
    waitFor(() => render(<UserPage />))
  })
  it("if !session, <SignIn /> is in the document", () => {
    const signIn = screen.getByTestId("sign-in-index")
    expect(signIn).toBeInTheDocument()
  })
  it("if !session, <ExternalLayout /> is in the document", () => {
    const externalLayout = screen.getByTestId("external-layout")
    expect(externalLayout).toBeInTheDocument()
  })
}) 