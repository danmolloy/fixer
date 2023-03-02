import { render, screen, act, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom"
import CreateEventForm from "../../components/createEvent/createEventForm";
import React from "react";

const mockProps = {
  handleSubmit: jest.fn(),
  initialValues: null,
  session: {
    user: {
      name: "userName",
      email: "userEmail",
      image: "userImg",
    },
    expires: "mockExpires",
  }
}

describe("CreateEventForm component", () => {
  beforeEach(() => {
    render(<CreateEventForm {...mockProps} />)
  })
  it("Renders", () => {
    const createEventForm = screen.getByTestId("create-event-form")
    expect(createEventForm).toBeInTheDocument()
  })
  it("Concert Title text input is in the document", () => {
    const concertTitleInput = screen.getByLabelText("Concert Title")
    expect(concertTitleInput).toBeInTheDocument()
  })
  it("Confirmed and On Hold toggles are in the document", () => {
    const confirmedRadio = screen.getByLabelText("Confirmed")
    expect(confirmedRadio).toBeInTheDocument()
  })
  it("Ensemble has radio options, including 'other' option/text input, which is visible only when other is selected", async() => {
    const ensembleOptions = screen.getByTestId("ensemble-radio-fieldset")
    expect(ensembleOptions).toBeInTheDocument()
    const otherOption = screen.getByLabelText(/Other/)
    expect(otherOption).toBeInTheDocument()
    await act(async() => {
      await waitFor(() => {
        fireEvent.click(otherOption)
      })
    })
    const otherEnsembleName = screen.getByTestId("other-ensemble-input")
    expect(otherEnsembleName).toBeInTheDocument()

  })
  it("Concert Program text input is in the document with label", () => {
    const programInput = screen.getByLabelText("Concert Program")
    expect(programInput).toBeInTheDocument()
  })
  it("Calls arr is in the document", () => {
    const callsArr = screen.getByTestId("calls-array")
    expect(callsArr).toBeInTheDocument()
  })
  it("CallInput for Call 1 is in the document", () => {
    const call1 = screen.getByTestId("call-1-div")
    expect(call1).toBeInTheDocument()
  })
  it("Add Call button exists", () => {
    const addCallBtn = screen.getByTestId("add-call-btn")
    expect(addCallBtn).toBeInTheDocument()
  })
  it("Add Call button adds element labelled 'Call 2'", async () => {
    const callsArray = screen.getByTestId("calls-array")
    expect(callsArray.children).toHaveLength(2) // Call 1 & Add Call btn
    expect(callsArray).toHaveTextContent(/^Call 1/)
    expect(callsArray).not.toHaveTextContent(/Call 2/gi)
    expect(callsArray.children[1]).toHaveTextContent(/^Add Call$/)
    await act(async () => {
      await waitFor(() => {
        fireEvent.click(callsArray.children[1])
      })
    })
    
    expect(callsArray).toHaveTextContent(/Call 2/g)
  })
  it("All Calls have Delete Call Button, except for Call 1", async () => {
    const callsArray = screen.getByTestId("calls-array")
    const addCallBtn = screen.getByText("Add Call")
    await act(async () => {
      await waitFor(() => {
        fireEvent.click(addCallBtn)
      })
    })
    const deleteBtn = screen.getByTestId("calls-1-delete")
    expect(deleteBtn).toBeInTheDocument()
  })
  it("Dress code text input is in the document with label", () => {
    const dressInput = screen.getByLabelText("Dress Code")
    expect(dressInput).toBeInTheDocument()
  })
  it("Fee input is in the document with label", () => {
    const feeInput = screen.getByLabelText("Fee")
    expect(feeInput).toBeInTheDocument()
  })
  it("Additional Info text input is in the document with label", () => {
    const additionalInfo = screen.getByLabelText("Additional Information")
    expect(additionalInfo).toBeInTheDocument()
  })
})

/* //it("Calls has concert option which doesn't require endtime", () => {})
  //it("Contains a dropdown menu for 'Venue'", () => {})
  //it("Create Event button", () => {})
  //it("shows error if Other ensemble selected and no text input", () => {})
  //it("shows errors if a required field is missing", () => {})
  //it("It removes empty Calls", () => {})
  //it("Shows error if a Call's details are partially entered", () => {})
  //it("Throws additionalInfo") // Pourqoui? It is not required.
  //it("Select whether call is confirmed", () => {})

  //it("Edit event doesn't change the call lists", () => {})
 */

//describe("Initial Values", () => {})
//describe("Validation and errors", () => {})
//describe("HandleSubmit", () => {})
/* describe("Edit Event", () => {

  //it("Calls event form with event info as initial values", () => {}) // Did you check call times and ensemble name?
  //it("Create Event button edits event and doesn't delete all the calls", () => {}) // I think this happens
  //it("Create Event button edits event and retains the eventID", () => {}) // Definitely worth checking
}) */


/* 
  it("Confirmed or On Hold not selected throws Error Message", async () => {
    const createButton = screen.getByTestId("create-event-btn")
    expect(createButton).toBeInTheDocument()
    act(() => {
      fireEvent.click(createButton)
    })
    await waitFor(async () => {
      await new Promise(res => setTimeout(res, 50))
    })
    const confirmOrHoldToggleGroup = screen.getByTestId("confirm-or-hold-toggle-group")
    expect(confirmOrHoldToggleGroup).toBeInTheDocument()
    expect(confirmOrHoldToggleGroup.textContent).toMatch(/Required/)

  })
*/