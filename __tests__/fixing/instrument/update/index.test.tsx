import "@testing-library/jest-dom"
import { render, screen, fireEvent, waitFor, act } from "@testing-library/react"
import UpdateIndex, { UpdateIndexProps } from "../../../../components/fixing/instrument/update"
import { mockEventSection } from "../../../../__mocks__/models/eventSection"
import { mockSection, mockSectionWithMusicians } from "../../../../__mocks__/models/ensembleSection"
import { mockPlayerCall, mockPlayerCallForTable } from "../../../../__mocks__/models/playerCall"
import { mockEventWithCalls } from "../../../../__mocks__/models/event"
import FixingTable from "../../../../components/fixing/instrument/update/table"

jest.mock("../../../../components/fixing/instrument/update/table", () => {
  return jest.fn(() => null)
})


const mockProps: UpdateIndexProps = {
  event: mockEventWithCalls,
  eventSection: mockEventSection,
  ensembleSection: mockSectionWithMusicians,
  playerCalls: [mockPlayerCallForTable],
  refreshProps: jest.fn()
}

describe("<UpdateIndex />", () => {
  beforeEach(() => {
    render(<UpdateIndex {...mockProps} />)
  })
  it("update-index is in the document", () => {
    const updateIndex = screen.getByTestId(`${mockProps.eventSection.id}-update-index`)
    expect(updateIndex).toBeInTheDocument()
  })
  it("<UpdateHeader /> is in the document with expected props", () => {
    const updateHeader = screen.getByTestId("update-header")
    expect(updateHeader).toBeInTheDocument()
    expect(updateHeader.textContent).toMatch(mockProps.ensembleSection.name)
  })
  it("Edit button renders update form", async () => {
    const editBtn = screen.getByTestId(`${mockProps.ensembleSection.name}-edit-btn`)
    expect(editBtn).toBeInTheDocument()
    await act(async () => {
      await fireEvent.click(editBtn)
    })
    const updateForm = screen.getByTestId("update-form")
    expect(updateForm).toBeInTheDocument()
  })
  it("tab select is in the document and selects corresponding option", async () => {
    const tabSelect = screen.getByTestId("tab-select")
    expect(tabSelect).toBeInTheDocument()
    const bookingTab = screen.getByTestId("booking-tab-toggle")
    const availTabToggle = screen.getByTestId("availability-tab-toggle")
    await act(async() => {
      await fireEvent.click(availTabToggle)
    })

  })
  it("<FixingTable is in the document with expected props", () => {
    expect(FixingTable).toHaveBeenCalledWith({
      eventCalls: mockProps.event.calls,
      playerCalls: mockProps.playerCalls,
      selectedTab: "Booking"
    }, {})
  })
  it("<UpdateForm is in the document", async () => {
    const editBtn = screen.getByTestId(`${mockProps.ensembleSection.name}-edit-btn`)
    expect(editBtn).toBeInTheDocument()
    await act(async () => {
      await fireEvent.click(editBtn)
    })
    const updateForm = screen.getByTestId("update-form")
    expect(updateForm).toBeInTheDocument()

  })
})