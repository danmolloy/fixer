import "@testing-library/jest-dom"
import { act, fireEvent, render, screen, waitFor } from "@testing-library/react"
import CreateInstrumentForm, { CreateInstrumentFormProps} from "../../../../components/fixing/instrument/create/createForm"
import { mockSection, mockSectionWithMusicians, mockSectionWithPlayersAndBulletins } from "../../../../__mocks__/models/ensembleSection"
import { mockCall } from "../../../../__mocks__/models/call"
import axios from "axios"
import { mockUserId } from "../../../../__mocks__/models/user"
import { mockEvent } from "../../../../__mocks__/models/event"

const mockPost = jest.spyOn(axios, 'post');
mockPost.mockResolvedValue({ data: {} });

const mockProps: CreateInstrumentFormProps = {
  refreshProps: jest.fn(),
  eventId: mockEvent.id,
  section: mockSectionWithMusicians,
  eventCalls: [mockCall]
}

describe("<CreateInstrumentForm />", () => {
  beforeEach(() => {
    render(<CreateInstrumentForm {...mockProps} />)
  })
  it("create-instrument-form is in the document", () => {
    const createForm = screen.getByTestId("create-form")
    expect(createForm).toBeInTheDocument()
  })
  it("numToBook input is in the document with expected label, input type and name", () => {
    const numToBook = screen.getByLabelText("Num to Book")
    expect(numToBook).toBeInTheDocument()
    expect(numToBook).toHaveAttribute("type", "number")
    expect(numToBook).toHaveAttribute("name", "numToBook")
    expect(numToBook).toHaveAttribute("min", "0")
    expect(numToBook).toHaveAttribute("max", "50")

  })
  it("ensemble members list is in the document and contains all section members", () => {
    const ensembleMembers = screen.getByTestId("ensemble-members")
    expect(ensembleMembers).toBeInTheDocument()
    for (let i = 0; i < mockProps.section.members.length; i++) {
      expect(ensembleMembers.textContent).toMatch(`${mockProps.section.members[i].user.firstName} ${mockProps.section.members[i].user.lastName}`)
    }
  })

  it("extra players is in the document and contains all extras", () => {
    const ensembleExtras = screen.getByTestId("extra-players")
    expect(ensembleExtras).toBeInTheDocument()
    for (let i = 0; i < mockProps.section.extras.length; i++) {
      expect(ensembleExtras.textContent).toMatch(`${mockProps.section.extras[i].user.firstName} ${mockProps.section.extras[i].user.lastName}`)
    }
  })
  it("selecting a member appends them to appended players", async () => {
    const randInd = Math.floor(Math.random() * mockProps.section.members.length)
    const randMemberSelect = screen.getByTestId(`${mockProps.section.members[randInd].user.id}-select-btn`)
    expect(randMemberSelect).toBeInTheDocument()
    await waitFor(() => fireEvent.click(randMemberSelect))
    const appendedTable = screen.getByTestId("appended-table")
    expect(appendedTable).toBeInTheDocument()
    expect(appendedTable.textContent).toMatch(`${mockProps.section.members[randInd].user.firstName} ${mockProps.section.members[randInd].user.lastName}`)
  })
  it("if musicians.length > 0, appended-musicians is in the document", async () => {
    const randInd = Math.floor(Math.random() * mockProps.section.members.length)
    const randMemberSelect = screen.getByTestId(`${mockProps.section.members[randInd].user.id}-select-btn`)
    expect(randMemberSelect).toBeInTheDocument()
    await waitFor(() => fireEvent.click(randMemberSelect))
    const appendedTable = screen.getByTestId("appended-table")
    expect(appendedTable).toBeInTheDocument()
  })

  it("appended musicians are not able to be added to the list again", async () => {
    const randInd = Math.floor(Math.random() * mockProps.section.members.length)
    const randMemberSelect = screen.getByTestId(`${mockProps.section.members[randInd].user.id}-select-btn`)
    expect(randMemberSelect).toBeInTheDocument()
    await waitFor(() => fireEvent.click(randMemberSelect))
    const appendedTable = screen.getByTestId("appended-table")
    expect(appendedTable).toBeInTheDocument()
    expect(appendedTable.textContent).toMatch(`${mockProps.section.members[randInd].user.firstName} ${mockProps.section.members[randInd].user.lastName}`)
    expect(randMemberSelect).toHaveAttribute("disabled")
    await waitFor(() => fireEvent.click(randMemberSelect))
    const appendedMusicians = screen.getAllByTestId("appended-musician")
    expect(appendedMusicians.length).toBe(1)
  })
  it("selecting an extra appends them to appended players", async () => {
    const randInd = Math.floor(Math.random() * mockProps.section.extras.length)
    const randExtraSelect = screen.getByTestId(`${mockProps.section.extras[randInd].user.id}-select-btn`)
    expect(randExtraSelect).toBeInTheDocument()
    await waitFor(() => fireEvent.click(randExtraSelect))
    const appendedTable = screen.getByTestId("appended-table")
    expect(appendedTable).toBeInTheDocument()
    expect(appendedTable.textContent).toMatch(`${mockProps.section.extras[randInd].user.firstName} ${mockProps.section.extras[randInd].user.lastName}`)
  })
  it("if Booking, numToBook input is in the document, with expected name and type", () => {
    const numToBook = screen.getByLabelText("Num to Book")
    expect(numToBook).toBeInTheDocument()
    expect(numToBook).toHaveAttribute("name", "numToBook")
    expect(numToBook).toHaveAttribute("type", "number")
  })
  it("submit btn is in the document", () => {
    const submitBtn = screen.getByTestId("submit-btn")
    expect(submitBtn).toBeInTheDocument()
  })
  it("submit btn calls axios.post() with expected args", async () => {
    const randMemberInd = Math.floor(Math.random() * mockProps.section.members.length)
    const randMemberSelect = screen.getByTestId(`${mockProps.section.members[randMemberInd].user.id}-select-btn`)
    await waitFor(() => fireEvent.click(randMemberSelect))

    const randExtraInd = Math.floor(Math.random() * mockProps.section.extras.length)
    const randExtraSelect = screen.getByTestId(`${mockProps.section.extras[randExtraInd].user.id}-select-btn`)
    await waitFor(() => fireEvent.click(randExtraSelect))

    const numToBook = screen.getByLabelText("Num to Book")
    await waitFor(() => fireEvent.change(numToBook, {target: { value: 1 }}))
    const submitBtn = screen.getByTestId("submit-btn")
    await act(async () => {
      await fireEvent.click(submitBtn)
    })

    const submitObj = {
      bookingOrAvailability: "Booking",
      ensembleSectionId: mockProps.section.id,
      eventId: mockProps.eventId,
      numToBook: 1,
      musicians: [
        {
          addedMessage: "",
          positionTitle: "tutti",
          musicianId: mockProps.section.members[randMemberInd].user.id,
          user: mockProps.section.members[randMemberInd].user,
          calls: mockProps.eventCalls.map(i => String(i.id)),
        },
       {
          addedMessage: "",
          positionTitle: "tutti",
          musicianId: mockProps.section.extras[randExtraInd].user.id,
          user: mockProps.section.extras[randExtraInd].user,
          calls: mockProps.eventCalls.map(i => String(i.id)),
        }
      ]
    }

    expect(axios.post).toHaveBeenCalledWith("/api/event/section/create", submitObj)
  })
  it("err messages as expected on submit", async () => {
    const createForm = screen.getByTestId("create-form")
    const submitBtn = screen.getByTestId("submit-btn")
    await act(async () => {
      await fireEvent.click(submitBtn)
    })
    expect(axios.post).not.toHaveBeenCalled()
    expect(createForm.textContent).toMatch("Must book at least 1 player")
    expect(createForm.textContent).toMatch("Not enough players on call list. Must have enough players to complete booking")
  })
  it("<TabSelect /> is in the document", () => {
    const tabSelect = screen.getByTestId("tab-select")
    expect(tabSelect).toBeInTheDocument()
  })
  it("numToBook only renders if Booking", async () => {
    const numToBook = screen.getByLabelText("Num to Book")
    expect(numToBook).toBeInTheDocument()
    const availabilityTab = screen.getByText("Availability")
    expect(availabilityTab).toBeInTheDocument()
    await act(async () => {
      await fireEvent.click(availabilityTab)
    })
    expect(numToBook).not.toBeInTheDocument()
  })
  //it("each appendedPlayer needs to have at least one eventCall", () => {})
  //it("Selecting 'Availability' sets bookingOrAvailability to 'Availability'", () => {}) 
  //it("Selecting 'Booking' sets bookingOrAvailability to 'Booking'", () => {}) 
})