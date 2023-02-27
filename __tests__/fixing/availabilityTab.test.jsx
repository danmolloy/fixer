import { act, fireEvent, render, screen, waitFor } from "@testing-library/react"
import '@testing-library/jest-dom'
import AvailabilityTab from '../../components/fixing/availabilityTab'

const setEditList = jest.fn()
const editList = Math.random() > .5 ? true : false

const mockData = {
  editList: editList,
  setEditList: setEditList,
  instrumentalistsList: [{
    id: "321",
    name: "Patrick Viola",
    email: "321",
    emailVerified: null,
    instrument: "Viola",
    profileInfo: null,
    isFixer: null,
  }],
  //appendPlayer: (player: any) => void 
  eventId: 1, 
  keyId: 2, 
  instrumentName: "Viola", 
  refreshProps: jest.fn(),
  handleSubmit: jest.fn(), 
  callsOutId: 3
}

describe("AvailabilityTab component", () => {
  beforeEach(() => {
    render(<AvailabilityTab props={mockData}/>)
  })
  it("Renders", () => {
    const tabDiv = screen.getByTestId("availability-tab")
    expect(tabDiv).toBeInTheDocument()
  })
  it("if editList is false, Edit button is in the document with text content 'Edit'", async () => {
    if(editList === false) {
      const editBtn = screen.getByTestId(`availability-edit-btn`)
      expect(editBtn).toBeInTheDocument()
      expect(editBtn.textContent).toMatch("Edit")
    }
  })
  //it("if editList is false, calls setEditList(true) on click", async () => {})
  it("if editList is true, Close button in the document with text content 'Close'", () => {
    if(editList === true) {
      const editBtn = screen.getByTestId(`availability-edit-btn`)
      expect(editBtn).toBeInTheDocument()
      expect(editBtn.textContent).toMatch("Close")
      act(() => {
        fireEvent.click(editBtn)
      })
      expect(setEditList).toBeCalledWith(false)
    }
  })
  //it("if editList is true, Close button in the document and calls setEditList(false) on click", () => {})
  it("AvailabilityTable is in the document", () => {
    const availabilityTable = screen.getByTestId("availability-table-div")
    expect(availabilityTable).toBeInTheDocument()
  })
  it("if editList is true, EditCalls is in the document", () => {
    if (editList === true) {
      const editCalls = screen.getByTestId(`${mockData.instrumentName}-edit`)
      expect(editCalls).toBeInTheDocument()
    }
  })
})