import { render, screen, act, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom"
import CreateEventForm, { CreateEventFormProps } from "../../../components/event/createUpdate";
import React from "react";

const mockProps: CreateEventFormProps = {
    handleSubmit: jest.fn(),
    initialValues: null,
    userId: "mockId",
    userName: "mockName",
}

describe("<CreateEvent />", () => {
  beforeEach(() => {
    render(<CreateEventForm {...mockProps} />)
  })
  it("create-event is in the document", () => {
    const createEventForm = screen.getByTestId("create-event")
    expect(createEventForm).toBeInTheDocument()
  })
  it("Concert Title text input is in the document with name attr", () => {
    const concertTitleInput = screen.getByLabelText("Concert Title")
    expect(concertTitleInput).toBeInTheDocument()
    expect(concertTitleInput).toHaveAttribute("name", "")

  })
  it("Confirmed and On Hold toggles are in the document with name attr", () => {
    const confirmedRadio = screen.getByLabelText("Confirmed")
    expect(confirmedRadio).toBeInTheDocument()
    expect(confirmedRadio).toHaveAttribute("name", "")

  })
  it("ensemble has radio options which includes all elected fixing ensembles as well as 'other' option", async() => {
  
  })
  it("ensemble has 'other' option/text input, which is visible only when other is selected", () => {})
  it("concert program text input is in the document with label and name attr", () => {
    const programInput = screen.getByLabelText("Concert Program")
    expect(programInput).toBeInTheDocument()
    expect(programInput).toHaveAttribute("name", "")

  })
  it("calls arr is in the document", () => {
    const callsArr = screen.getByTestId("calls-array")
    expect(callsArr).toBeInTheDocument()
  })
  it("callInput for all calls is in the document", () => {})
  it("Add Call button exists", () => {
    const addCallBtn = screen.getByTestId("add-call-btn")
    expect(addCallBtn).toBeInTheDocument()
  })
  it("Add Call button adds call", async () => {})
  it("All Calls have Delete Call Button, except for Call 1", async () => {
    const callsArray = screen.getByTestId("calls-array")
    const addCallBtn = screen.getByText("Add Call")
      await waitFor(() => {
        fireEvent.click(addCallBtn)
      })
    const deleteBtn = screen.getByTestId("calls-1-delete")
    expect(deleteBtn).toBeInTheDocument()
  })
  it("Dress code text input is in the document with label", () => {
    const dressInput = screen.getByLabelText("Dress Code")
    expect(dressInput).toBeInTheDocument()
    expect(dressInput).toHaveAttribute("name", "")

  })
  it("Fee input is in the document with label", () => {
    const feeInput = screen.getByLabelText("Fee")
    expect(feeInput).toBeInTheDocument()
    expect(feeInput).toHaveAttribute("name", "")
  })
  it("Additional Info text input is in the document with label", () => {
    const additionalInfo = screen.getByLabelText("Additional Information")
    expect(additionalInfo).toBeInTheDocument()
    expect(additionalInfo).toHaveAttribute("name", "")

  })
  it("create btn is in the document and calls axios with expected args", () => {})
  it("if incomplete on create btn click, all expected error msgs show", () => {})
})