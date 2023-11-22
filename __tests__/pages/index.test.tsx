import "@testing-library/jest-dom"
import { render, screen, waitFor } from "@testing-library/react"
import Home from "../../pages"
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
      ...mockUserWithCallsAndEvents,
      playerCalls: []
    })
  })
) as jest.Mock;

describe("<Home />", () => {
  beforeEach(() => {
    const mockUseSession = jest.fn(() => ({}));
    require('next-auth/react').useSession = mockUseSession;

    waitFor(() => render(<Home />))
  })
  it("if !session, external layout is in the document", () => {
    const externalLayout = screen.getByTestId("external-layout")
    expect(externalLayout).toBeInTheDocument()
  })
  it("if !session, landing page is in the document", () => {
    const landingPage = screen.getByTestId("landing-page-div")
    expect(landingPage).toBeInTheDocument()
  })
  it("if !data, external layout is in the document", () => {
    const externalLayout = screen.getByTestId("external-layout")
    expect(externalLayout).toBeInTheDocument()
  })
  it("if !data, landing page is in the document", () => {
    const landingPage = screen.getByTestId("landing-page-div")
    expect(landingPage).toBeInTheDocument()
  })
})

describe("<Home />", () => {
  beforeEach(() => {
/*     global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve({
          ...mockUserWithCallsAndEvents,
          playerCalls: []
        })
      })
    ) as jest.Mock; */
    require("swr").useSWR = jest.fn(() => ({
      ...mockUserWithCallsAndEvents,
      playerCalls: []}))
    const mockUseSession = jest.fn(() => ({ data: mockSession, status: 'authenticated' }));
    require('next-auth/react').useSession = mockUseSession;

    waitFor(() => render(<Home />))
  })
  it("if session and data, session layout is in the document", () => {
    const sessionLayout = screen.getByTestId("session-layout")
    expect(sessionLayout).toBeInTheDocument()
  })
  it("if session and data, calendar index is in the document", () => {
    const calendarIndex = screen.getByTestId("calendar-index")
    expect(calendarIndex).toBeInTheDocument()
  })
})