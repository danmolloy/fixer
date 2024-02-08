import "@testing-library/jest-dom"
import { act, fireEvent, render, screen, waitFor } from "@testing-library/react"
import Create from "../../../../pages/event/create"
import { mockUser, mockUserWithCallsAndEvents } from "../../../../__mocks__/models/user";
import axios from "axios";

jest.mock("axios")

const mockSession = {
  user: mockUser,
  userData: {
    mockUserWithCallsAndEvents,
    playerCalls: [],
    fixingEnsembles: ["LSO"]
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



describe("<Create />", () => {
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
    waitFor(() => render(<Create />))
  })

  it("if session, <CreateEventForm /> is in the document", () => {
    const createForm = screen.getByTestId("create-event-form")
    expect(createForm).toBeInTheDocument()
  })
  it("if session, <SessionLayout is in the document", () => {
    const sessionLayout = screen.getByTestId("session-layout")
    expect(sessionLayout).toBeInTheDocument()
  })
  it("handleSubmit() posts to /api/event/create with expected arg", async () => {

    const mockPost = jest.spyOn(axios, 'post');
    mockPost.mockResolvedValueOnce({ data: {} });
    const eventTitle = "mockEventTitle"
    const concertProgram = "mockConcertProgram"
    const startTimeStr = "2023-11-14T12:34"
    const endTimeStr =  "2023-11-14T12:34"
    const venue = "mockVenue"
    const dressCode = "mockDressCode"
    const fee = "mockFee"
    const additionalInfo = "mockAddedInfo"

    const ensemble = screen.getByLabelText(mockSession.userData.fixingEnsembles[0])
    
    waitFor(() => fireEvent.click(ensemble))
    const confirmed = screen.getByLabelText("Confirmed")
    waitFor(() => fireEvent.click(confirmed))
    const title = screen.getByLabelText("Event Title")
    waitFor(() => fireEvent.change(title, {target: { value: eventTitle}}))
    const program = screen.getByLabelText("Concert Program")
    waitFor(() => fireEvent.change(program, {target: { value: concertProgram}}))
    const dress = screen.getByLabelText("Dress Code")
    waitFor(() => fireEvent.change(dress, {target: { value: dressCode}}))
    const gigFee = screen.getByLabelText("Fee")
    waitFor(() => fireEvent.change(gigFee, {target: { value: fee}}))
    const addInfo = screen.getByLabelText("Additional Information")
    waitFor(() => fireEvent.change(addInfo, {target: { value: additionalInfo}}))
    const startTime = screen.getByLabelText("Start Time")
    waitFor(() => fireEvent.change(startTime, {target: { value: startTimeStr}}))
    const endTime = screen.getByLabelText("End Time")
    waitFor(() => fireEvent.change(endTime, {target: { value: endTimeStr}}))
    const callVenue = screen.getByLabelText("Venue")
    waitFor(() => fireEvent.change(callVenue, {target: { value: venue}})) 

    const callInfo = screen.getByLabelText("Call Information")
    expect(callInfo).toBeInTheDocument()

    const submitBtn = screen.getByText(/^Submit$/)

    await waitFor(() => fireEvent.click(submitBtn))
    expect(axios.post).toHaveBeenCalledWith("/api/event/edit", {
      additionalInfo,
      eventTitle,
      concertProgram,
      dressCode, 
      confirmedOrOnHold: "Confirmed",
      ensemble: mockSession.userData.fixingEnsembles[0],
      ensembleName: "",
      fixerId: mockSession.user.id,
      fixerName: `${mockSession.user.firstName} ${mockSession.user.lastName}`,
      id: "",
      fee,
      calls: [{
        id: 0,
        info: "",
        startTime: startTimeStr,
        endTime: endTimeStr,
        venue
      }]
    })

    const createEventForm = screen.getByTestId("create-event-form")
    expect(createEventForm.textContent).not.toMatch("Please revise your form. Errors are stated in red.")

  })

})

describe("<Create />", () => {
  beforeEach(() => {
    const mockUseSession = jest.fn(() => ({}));
    require('next-auth/react').useSession = mockUseSession;
    waitFor(() => render(<Create />))
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