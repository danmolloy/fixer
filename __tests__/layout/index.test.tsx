import "@testing-library/jest-dom"
import { render, screen, waitFor } from "@testing-library/react"
import LayoutIndex, { LayoutIndexProps } from "../../components/layout"

const mockSession = {
  userData: {
    playerCalls: [],
    admins: []
  }
}

jest.mock('next-auth/react', () => ({
  useSession: jest.fn(),
}));

global.fetch = jest.fn(() =>
Promise.resolve({
  json: () => Promise.resolve({
      playerCalls: [],
    })
  })
) as jest.Mock;
  

const mockProps: LayoutIndexProps = {
  children: <div data-testid="child-div"></div>
}

describe("<LayoutIndex />", () => {
  beforeEach(() => {
    const mockUseSession = jest.fn(() => ({ data: mockSession, status: 'authenticated' }));
    require('next-auth/react').useSession = mockUseSession;

    waitFor(() => {
      render(<LayoutIndex {...mockProps} />)
    })
    
  })
  it("if session, <SessionLayout /> is in the document", () => {
    const sessionLayout = screen.getByTestId("session-layout")
    expect(sessionLayout).toBeInTheDocument()
  })
})



describe("<LayoutIndex />", () => {
  beforeEach(() => {
    const mockUseSession = jest.fn(() => ({}));
    require('next-auth/react').useSession = mockUseSession;

    waitFor(() => {
      render(<LayoutIndex {...mockProps} />)
    })  
  })
  it("if !session (or else), <ExternalLayout /> is in the document", () => {
    const externalLayout = screen.getByTestId("external-layout")
    expect(externalLayout).toBeInTheDocument()
  })
})