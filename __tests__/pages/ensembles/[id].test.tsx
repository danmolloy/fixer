import "@testing-library/jest-dom"
import { render, screen, waitFor } from "@testing-library/react"
import { mockUser, mockUserWithCallsAndEvents } from "../../../__mocks__/models/user";
import EnsemblePage from "../../../pages/ensembles/[id]";
import { mockEnsemble } from "../../../__mocks__/models/ensemble";

const mockSession = {
  user: mockUser,
  userData: {
    mockUserWithCallsAndEvents,
    playerCalls: [],
    admins: []
  }
}

jest.mock('next-auth/react', () => ({
  useSession: jest.fn(),
}));

describe("<EnsemblePage />", () => {
  beforeEach(() => {
    global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve({
          ...mockEnsemble,
          playerCalls: []
        })
      })
    ) as jest.Mock;
    
    const mockUseSession = jest.fn(() => ({ data: mockSession, status: 'authenticated' }));
    require('next-auth/react').useSession = mockUseSession;

     waitFor(() => render(<EnsemblePage />))
  })
  it("if session, <EnsembleIndex /> is in the document", () => {
    const ensembleIndex = screen.getByTestId("ensemble-index")
    expect(ensembleIndex).toBeInTheDocument()
  })
})