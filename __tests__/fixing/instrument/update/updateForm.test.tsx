import "@testing-library/jest-dom"
import { render, screen, act, fireEvent, waitFor } from "@testing-library/react"
import UpdateForm, { UpdateFormProps } from "../../../../components/fixing/instrument/update/updateForm"
import { mockEventSection } from "../../../../__mocks__/models/eventSection"
import { mockCall } from "../../../../__mocks__/models/call"
import axios from "axios"
import { mockContactMessage } from "../../../../__mocks__/models/contactMessage"
import { mockEnsembleContact } from "../../../../__mocks__/models/ensembleContact"
import { mockSection } from "../../../../__mocks__/models/ensembleSection"

const mockPost = jest.spyOn(axios, 'post');
mockPost.mockResolvedValue({ data: {} });

const mockProps: UpdateFormProps = {
  eventSection: {
    ...mockEventSection, 
    contacts: [{...mockContactMessage, contact: mockEnsembleContact, calls: [mockCall]}]
  },
  ensembleSection: {...mockSection, contacts: [mockEnsembleContact]},
  bookingOrAvailability: "Booking",
  eventCalls: [mockCall],
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
    const randInd = Math.floor(Math.random() * mockProps.ensembleSection.contacts.length)
    const randMemberSelect = screen.getByTestId(`${mockProps.ensembleSection.contacts[randInd].id}-select-btn`)
    expect(randMemberSelect).toBeInTheDocument()
    await waitFor(() => fireEvent.click(randMemberSelect))
    const appendedTable = screen.getByTestId("appended-table")
    expect(appendedTable).toBeInTheDocument()
    expect(appendedTable.textContent).toMatch(`${mockProps.ensembleSection.contacts[randInd].firstName} ${mockProps.ensembleSection.contacts[randInd].lastName}`)
  })
  it("<FixingContacts /> is in the document with expected members", () => {
    const fixingContacts = screen.getByTestId("fixing-contacts")
    expect(fixingContacts).toBeInTheDocument()
    for (let i = 0; i < mockProps.ensembleSection.contacts.length; i++) {
      expect(fixingContacts.textContent).toMatch(`${mockProps.ensembleSection.contacts[i].firstName} ${mockProps.ensembleSection.contacts[i].lastName}`)
    }
  })
  it("if contact added to appendedTable, their select btn is disabled", async () => {
    const randInd = Math.floor(Math.random() * mockProps.ensembleSection.contacts.length)
    const randContact = screen.getByTestId(`${mockProps.ensembleSection.contacts[randInd].id}-select-btn`)
    expect(randContact).toBeInTheDocument()
    expect(randContact).not.toHaveAttribute("disabled")
    await waitFor(() => fireEvent.click(randContact))
    expect(randContact).toHaveAttribute("disabled")
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
        numToBook: 0,
        contacts: [{...mockContactMessage, contact: mockEnsembleContact, calls: [mockCall]}]

      },
      ensembleSection: {...mockSection, contacts: [mockEnsembleContact]},
      bookingOrAvailability: "Booking",
      eventCalls: [mockCall],
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
      eventSection: {
        ...mockEventSection, 
        contacts: [{...mockContactMessage, contact: mockEnsembleContact, calls: [mockCall]}]
      },      
      ensembleSection: {...mockSection, contacts: [mockEnsembleContact]},
      bookingOrAvailability: "Availability",
      refreshProps: jest.fn(),
      setShowEdit: jest.fn(),      
      eventCalls: [mockCall],
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