import "@testing-library/jest-dom"
import { render, screen, act, fireEvent, waitFor } from "@testing-library/react"
import UpdateForm, { UpdateFormProps } from "../../../../components/fixing/instrument/update/updateForm"
import { mockEventSection } from "../../../../__mocks__/models/eventSection"
import { mockSectionWithMusicians } from "../../../../__mocks__/models/ensembleSection"
import { mockPlayerCall } from "../../../../__mocks__/models/playerCall"
import { mockCall } from "../../../../__mocks__/models/call"
import axios from "axios"

const mockPost = jest.spyOn(axios, 'post');
mockPost.mockResolvedValue({ data: {} });

const mockProps: UpdateFormProps = {
  eventSection: mockEventSection,
  ensembleSection: mockSectionWithMusicians,
  bookingOrAvailability: "Booking",
  eventCalls: [mockCall],
  playerCalls: [mockPlayerCall],
  refreshProps: jest.fn(),
  setShowEdit: jest.fn()
}

describe("<UpdateForm />", () => {
  beforeEach(() => {
    render(<UpdateForm {...mockProps} />)
  })
  it("update-form is in the document", () => {
    const updateForm = screen.getByTestId("update-form")
    expect(updateForm).toBeInTheDocument()
  })
  it("<AppendedTable /> renders when players added with expected playerTiles and header dates", async () => {
    const randInd = Math.floor(Math.random() * mockProps.ensembleSection.members.length)
    const randMemberSelect = screen.getByTestId(`${mockProps.ensembleSection.members[randInd].user.id}-select-btn`)
    expect(randMemberSelect).toBeInTheDocument()
    await waitFor(() => fireEvent.click(randMemberSelect))
    const appendedTable = screen.getByTestId("appended-table")
    expect(appendedTable).toBeInTheDocument()
    expect(appendedTable.textContent).toMatch(`${mockProps.ensembleSection.members[randInd].user.firstName} ${mockProps.ensembleSection.members[randInd].user.lastName}`)
  })
  it("<EnsembleMembers is in the document with expected members", () => {
    const ensembleMembers = screen.getByTestId("ensemble-members")
    expect(ensembleMembers).toBeInTheDocument()
    for (let i = 0; i < mockProps.ensembleSection.members.length; i++) {
      expect(ensembleMembers.textContent).toMatch(`${mockProps.ensembleSection.members[i].user.firstName} ${mockProps.ensembleSection.members[i].user.lastName}`)
    }
  })
  it("if member added to appendedTable, their select btn is disabled", async () => {
    const randInd = Math.floor(Math.random() * mockProps.ensembleSection.members.length)
    const randMemberSelect = screen.getByTestId(`${mockProps.ensembleSection.members[randInd].user.id}-select-btn`)
    expect(randMemberSelect).toBeInTheDocument()
    expect(randMemberSelect).not.toHaveAttribute("disabled")
    await waitFor(() => fireEvent.click(randMemberSelect))
    expect(randMemberSelect).toHaveAttribute("disabled")

  })
  it("<EnsembleExtras is in the document with expected extras", () => {
    const ensembleExtras = screen.getByTestId("extra-players")
    expect(ensembleExtras).toBeInTheDocument()
    for (let i = 0; i < mockProps.ensembleSection.extras.length; i++) {
      expect(ensembleExtras.textContent).toMatch(`${mockProps.ensembleSection.extras[i].user.firstName} ${mockProps.ensembleSection.extras[i].user.lastName}`)
    }
  })
  it("if extra added to appendedTable, their select btn is disabled", async () => {
    const randInd = Math.floor(Math.random() * mockProps.ensembleSection.extras.length)
    const randExtraSelect = screen.getByTestId(`${mockProps.ensembleSection.extras[randInd].user.id}-select-btn`)
    expect(randExtraSelect).toBeInTheDocument()
    expect(randExtraSelect).not.toHaveAttribute("disabled")
    await waitFor(() => fireEvent.click(randExtraSelect))
    expect(randExtraSelect).toHaveAttribute("disabled")
  })
  it("<EditOptions /> is in the document with bookingOrAvailability", () => {
    const editOptions = screen.getByTestId("edit-options")
    expect(editOptions).toBeInTheDocument()
    if (mockProps.bookingOrAvailability === "Booking") {
      const numToBook = screen.getByLabelText("Num to Book")
      expect(numToBook).toBeInTheDocument()
    }
  })
  it("expected error messages are in the document on submit btn click", () => {})
  it("submit btn is in the document and calls axios with expected args", async () => {
    const submitBtn = screen.getByTestId("fix-btn")
    expect(submitBtn).toBeInTheDocument()
    await act(async () => {
      await fireEvent.click(submitBtn)
    })
    expect(axios.post).toHaveBeenCalledWith("/api/event/section/update", {
      addedMusicians: [],
      bookingOrAvailability: "Booking",
      ensembleSectionId: mockProps.ensembleSection.id,
      eventSectionData: {
        numToBook: mockProps.eventSection.numToBook
      },
      eventSectionId: mockProps.eventSection.id
    })

  })
})

describe("<UpdateForm />", () => {
  beforeEach(() => {
    const mockProps: UpdateFormProps = {
      eventSection: {
        ...mockEventSection,
        numToBook: 0
      },
      ensembleSection: mockSectionWithMusicians,
      bookingOrAvailability: "Booking",
      eventCalls: [mockCall],
      playerCalls: [mockPlayerCall],
      refreshProps: jest.fn(),
      setShowEdit: jest.fn()
    }
    render(<UpdateForm {...mockProps} />)
  })
  it("does not submit if numToBook === 0 and Booking", async () => {
    const submitBtn = screen.getByTestId("fix-btn")
    expect(submitBtn).toBeInTheDocument()
    await act(async () => {
      await fireEvent.click(submitBtn)
    })
    expect(axios.post).not.toHaveBeenCalled()
  })
})

describe("<UpdateForm />", () => {
  beforeEach(() => {
    const mockProps: UpdateFormProps = {
      eventSection: mockEventSection,
      ensembleSection: mockSectionWithMusicians,
      bookingOrAvailability: "Availability",
      refreshProps: jest.fn(),
      setShowEdit: jest.fn(),      
      eventCalls: [mockCall],
      playerCalls: [mockPlayerCall]
    }
    render(<UpdateForm {...mockProps} />)

  })
  it("strictly tied checkbox if availability check with expected type", () => {
    const strictlyTied = screen.getByLabelText("Calls are strictly tied")
    expect(strictlyTied).toBeInTheDocument()
    expect(strictlyTied).toHaveAttribute("type", "checkbox")
  })
  it("numToBook input is not in the document if availability check", () => {
    const updateForm = screen.getByTestId("update-form")
    expect(updateForm.textContent).not.toMatch("Num to Book")
  })
})