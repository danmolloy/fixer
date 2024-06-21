import "@testing-library/jest-dom"
import { act, fireEvent, render, screen, waitFor } from "@testing-library/react"
import EditEnsembles from "../../../deprecatedPagesApi/ensembles/edit";
import { mockUser, mockUserWithCallsAndEvents } from "../../../__mocks__/models/user";
import axios from "axios";
import { mockAdminWithEnsemble } from "../../../__mocks__/models/ensembleAdmin";

jest.mock("axios")

const mockSession = {
  user: mockUser,
  userData: {
    mockUserWithCallsAndEvents,
    playerCalls: [],
    admins: [mockAdminWithEnsemble]
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



describe("<EditEnsembles />", () => {
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
    waitFor(() => render(<EditEnsembles />))
  })

  it("if session, <EditEnsembles /> is in the document", () => {
    const editEnsemblesForm = screen.getByTestId("ensemble-form")
    expect(editEnsemblesForm).toBeInTheDocument()
  })
  it("if session, <SessionLayout is in the document", () => {
    const sessionLayout = screen.getByTestId("session-layout")
    expect(sessionLayout).toBeInTheDocument()
  })
  it("handleSubmit() posts to /api/ensembles/edit with expected arg", async () => {})

})

describe("<EditEnsembles />", () => {
  beforeEach(() => {
    const mockUseSession = jest.fn(() => ({}));
    require('next-auth/react').useSession = mockUseSession;
    waitFor(() => render(<EditEnsembles />))
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