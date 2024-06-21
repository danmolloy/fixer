import "@testing-library/jest-dom"
import { render, screen, waitFor } from "@testing-library/react"
import FaqPage from "../../deprecatedPagesApi/faq"
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

describe("<FaqPage />", () => {
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
    waitFor(() => render(<FaqPage />))
  })
  it("if session, <FaqIndex /> is in the document", () => {
    const faqIndex = screen.getByTestId("faq-index")
    expect(faqIndex).toBeInTheDocument()
  })
  it("if session, <SessionLayout is in the document", () => {
    const sessionLayout = screen.getByTestId("session-layout")
    expect(sessionLayout).toBeInTheDocument()
  })
})

describe("<FaqPage />", () => {
  beforeEach(() => {
    const mockUseSession = jest.fn(() => ({}));
    require('next-auth/react').useSession = mockUseSession;
    require('next-auth/react').useSession = jest.fn(() => ({}));
    waitFor(() => render(<FaqPage />))
  })
  it("if !session, <FaqIndex is in the document", () => {
    const faqIndex = screen.getByTestId("faq-index")
    expect(faqIndex).toBeInTheDocument()
  })
  it("if !session, <ExternalLayout /> is in the document", () => {
    const externalLayout = screen.getByTestId("external-layout")
    expect(externalLayout).toBeInTheDocument()
  })
})