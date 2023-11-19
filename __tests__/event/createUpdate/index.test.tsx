import { render, screen, act, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom"
import CreateEventForm, { CreateEventFormProps } from "../../../components/event/createUpdate";
import React from "react"; 
import axios from "axios";
import { mockMessage } from "../../../__mocks__/models/messages";

jest.mock("axios")
const mockPost = jest.spyOn(axios, 'post');
mockPost.mockResolvedValue({ data: {} });

const mockProps: CreateEventFormProps = {
  fixingEnsembles: ["BBCSO"],
  handleSubmit: jest.fn(),
  userId: "mockId",
  userName: "mockName",
  createOrUpdate: "Create",
}

describe("<CreateEvent />", () => {
  beforeEach(() => {
    render(<CreateEventForm {...mockProps} />)
  })
  it("create-event is in the document", () => {
    const createEventForm = screen.getByTestId("create-event-form")
    expect(createEventForm).toBeInTheDocument()
  })
  it("Concert Title text input is in the document with name attr", () => {
    const concertTitleInput = screen.getByLabelText("Event Title")
    expect(concertTitleInput).toBeInTheDocument()
    expect(concertTitleInput).toHaveAttribute("name", "eventTitle")

  })
  it("Confirmed or On Hold is in the document", () => {
    const confirmedRadio = screen.getByTestId("confirmed-or-on-hold-div")
    expect(confirmedRadio).toBeInTheDocument()
  })
  it("ensemble input is in the document", () => {
    const ensembleGroup = screen.getByLabelText("Ensemble")
    expect(ensembleGroup).toBeInTheDocument()
  })
  it("concert program text input is in the document with label and name attr", () => {
    const programInput = screen.getByLabelText("Concert Program")
    expect(programInput).toBeInTheDocument()
    expect(programInput).toHaveAttribute("name", "concertProgram")

  })
  it("calls arr is in the document", () => {
    const callsArr = screen.getByTestId("calls-array")
    expect(callsArr).toBeInTheDocument()
  })
  it("callInput for call 1 is in the document", () => {
    const callInput = screen.getByTestId("call-1-div")
    expect(callInput).toBeInTheDocument()
    expect(callInput.textContent).toMatch("Call 1")
  })
  it("Add Call button exists and adds call", async () => {
    const addCallBtn = screen.getByTestId("add-call-btn")
    expect(addCallBtn).toBeInTheDocument()
    const callsArr = screen.getByTestId("calls-array")
    expect(callsArr).toBeInTheDocument()
    expect(callsArr.textContent).not.toMatch("Call 2")

    await act(async () => {
      fireEvent.click(addCallBtn)
    })
    expect(callsArr.textContent).toMatch("Call 2")

  })
  it("All Calls have Delete Call Button, except for Call 1", async () => {
    const addCallBtn = screen.getByText("Add Call")
    await act(async() => {
      fireEvent.click(addCallBtn)
    })
    const deleteBtn = screen.getByTestId("calls-1-delete")
    expect(deleteBtn).toBeInTheDocument()
  })
  it("Dress code text input is in the document with label", () => {
    const dressInput = screen.getByLabelText("Dress Code")
    expect(dressInput).toBeInTheDocument()
    expect(dressInput).toHaveAttribute("name", "dressCode")

  })
  it("Fee input is in the document with label", () => {
    const feeInput = screen.getByLabelText("Fee")
    expect(feeInput).toBeInTheDocument()
    expect(feeInput).toHaveAttribute("name", "fee")
  })
  it("Additional Info text input is in the document with label", () => {
    const additionalInfo = screen.getByLabelText("Additional Information")
    expect(additionalInfo).toBeInTheDocument()
    expect(additionalInfo).toHaveAttribute("name", "additionalInfo")

  })
})

describe("<CreateEvent />", () => {
  beforeEach(() => {
      render(<CreateEventForm {...mockProps} />)
  })
  it("if incomplete on create btn click, all expected error msgs show", async () => {
    const submitBtn = screen.getByText(/^Submit$/)
    expect(submitBtn).toBeInTheDocument()
    expect(submitBtn).toHaveAttribute("type", "submit")
    await act(async () => {
      fireEvent.click(submitBtn)
    })
    const createEventForm = screen.getByTestId("create-event-form")
    expect(createEventForm.textContent).toMatch("Please revise your form. Errors are stated in red.")
    const confirmStatusErr = screen.getByTestId("confirmedOrOnHold-error")
    expect(confirmStatusErr).toBeInTheDocument()
    expect(confirmStatusErr.textContent).toMatch("Event confirmation status required")
    const ensembleErr= screen.getByTestId("ensemble-error");
    expect(ensembleErr.textContent).toMatch("Select ensemble")
    const eventTitleErr = screen.getByTestId("eventTitle-error")
    expect(eventTitleErr.textContent).toMatch("Event title required")
    const concertProgramErr = screen.getByTestId("concertProgram-error")
    expect(concertProgramErr.textContent).toMatch("Concert program required")
    const callZeroStartErr = screen.getByTestId("calls-0-startTime-error")
    expect(callZeroStartErr.textContent).toMatch("Call start time required")
    const callZeroEndErr = screen.getByTestId("calls-0-endTime-error")
    expect(callZeroEndErr.textContent).toMatch("Call end time required")
    const callZeroVenueErr = screen.getByTestId("calls.0.venue-error")
    expect(callZeroVenueErr.textContent).toMatch("Venue required")
    let otherEnsemble = screen.getByLabelText("Other")
    await act(async () => {
      await fireEvent.click(otherEnsemble)
    })
    await act(async () => {
      fireEvent.click(submitBtn)
    })
    const ensembleNameErr = screen.getByTestId("ensembleName-error")
    expect(ensembleNameErr.textContent).toMatch("Ensemble name required")
  })

})

describe("<CreateEvent />", () => {
  beforeEach(() => {
    render(<CreateEventForm {...mockProps} />)
  })
  it("create btn is in the document and calls axios with expected args", async () => {
    //ensemble //ensembleName
    //confirmedOrOnHold
    const eventTitle = "mockEventTitle"
    const concertProgram = "mockConcertProgram"
    //calls: startTime, endTime, venue, info
    const venue = "mockVenue"
    const dressCode = "mockDressCode"
    const fee = "mockFee"
    const additionalInfo = "mockAddedInfo"

    const ensemble = screen.getByLabelText(mockProps.fixingEnsembles[0])
    await act(async () => {
      await fireEvent.click(ensemble)
    })
    const confirmed = screen.getByLabelText("Confirmed")
    await act(async () => {
      await fireEvent.click(confirmed)
    })

    const title = screen.getByLabelText("Event Title")
    await act(async () => {
      await fireEvent.change(title, {target: { value: eventTitle}})
    })

    const program = screen.getByLabelText("Concert Program")
    await act(async () => {
      await fireEvent.change(program, {target: { value: concertProgram}})
    })

    const dress = screen.getByLabelText("Dress Code")
    await act(async () => {
      await fireEvent.change(dress, {target: { value: dressCode}})
    })

    const gigFee = screen.getByLabelText("Fee")
    await act(async () => {
      await fireEvent.change(gigFee, {target: { value: fee}})
    })

    const addInfo = screen.getByLabelText("Additional Information")
    await act(async () => {
      await fireEvent.change(addInfo, {target: { value: additionalInfo}})
    })

    const startTime = screen.getByLabelText("Start Time")
    await act(async () => {
      await fireEvent.change(startTime, {target: { value: "2023-11-14T12:34"}})
    })

    const endTime = screen.getByLabelText("End Time")
    await act(async () => {
      await fireEvent.change(endTime, {target: { value: "2023-11-14T12:34"}})
    })

    const callVenue = screen.getByLabelText("Venue")
    await act(async () => {
      await fireEvent.change(callVenue, {target: { value: venue}})
    })

    const callInfo = screen.getByLabelText("Call Information")
    expect(callInfo).toBeInTheDocument()

    const submitBtn = screen.getByText(/^Submit$/)
    
    await act(async () => {
      await fireEvent.click(submitBtn)
    })
    expect(mockProps.handleSubmit).toHaveBeenCalled()
    const createEventForm = screen.getByTestId("create-event-form")
    expect(createEventForm.textContent).not.toMatch("Please revise your form. Errors are stated in red.")

  })
})


describe("<CreateEvent />", () => {
  beforeEach(() => {
    render(<CreateEventForm {...{...mockProps, createOrUpdate: "Update"}} />)
  })
  it("Update Event title is in the document", () => {
    const updateTitle = screen.getByText("Update Event")
    expect(updateTitle).toBeInTheDocument()
  })
})

describe("<CreateEvent />", () => {
  beforeEach(() => {
    render(<CreateEventForm {...{...mockProps, createOrUpdate: "Create"}} />)
  })
  it("Update Event title is in the document", () => {
    const updateTitle = screen.getByText("Create Event")
    expect(updateTitle).toBeInTheDocument()
  })
})