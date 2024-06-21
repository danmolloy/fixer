import "@testing-library/jest-dom"
import { render, screen, waitFor } from "@testing-library/react"
import Event from "../../../deprecatedPagesApi/event/[id]";
import { mockUser, mockUserWithCallsAndEvents } from "../../../__mocks__/models/user";
import { mockEventWithCalls } from "../../../__mocks__/models/event";
import EventDetail from "../../../components/event/eventDetail";

jest.mock("../../../components/event/eventDetail", () => {
return () => <div data-testid="event-detail"></div>
})

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


describe("<Event />", () => {
  beforeEach(() => {
    global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve({
          ...mockEventWithCalls,
          playerCalls: [],
          session: {},
          users: [mockUser]

        })
      })
    ) as jest.Mock;
    const mockUseSession = jest.fn(() => ({ data: mockSession, status: 'authenticated' }));
    require('next-auth/react').useSession = mockUseSession;

    waitFor(() => render(<Event />))
  })

  it("if session, <EventIndex /> is in the document", () => {
    const event = screen.getByTestId("event-detail")
    expect(event).toBeInTheDocument()
  })
  it("if session, <SessionLayout is in the document", () => {
    const sessionLayout = screen.getByTestId("session-layout")
    expect(sessionLayout).toBeInTheDocument()
  })

})

describe("<Event />", () => {
  beforeEach(() => {
    const mockUseSession = jest.fn(() => ({}));
    require('next-auth/react').useSession = mockUseSession;
    waitFor(() => render(<Event />))
  })

  it("if !session, <ExternalLayout /> is in the document", () => {
    const externalLayout = screen.getByTestId("external-layout")
    expect(externalLayout).toBeInTheDocument()
  })
  it("if !session, <SignIn /> is in the document", () => {
    const signIn = screen.getByTestId("sign-in-index")
    expect(signIn).toBeInTheDocument()
  })  

})