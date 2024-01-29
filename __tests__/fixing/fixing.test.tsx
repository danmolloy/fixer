import "@testing-library/jest-dom"
import { act, fireEvent, render, screen, waitFor } from "@testing-library/react"
import Fixing from "../../components/fixing/fixing"
import { FixingProps } from "../../components/fixing/fixing"
import { mockCall } from "../../__mocks__/models/call"
import { DateTime } from "luxon"
import { mockFixingSection, mockSectionWithMusicians } from "../../__mocks__/models/ensembleSection"
import { mockEventWithCalls } from "../../__mocks__/models/event"
import { mockEventSectionWithMusicians } from "../../__mocks__/models/eventSection"

const mockSection = mockSectionWithMusicians

const mockProps: FixingProps = {
  eventCalls: [mockCall],
  instrumentSections: [{
    ...mockEventSectionWithMusicians,
    ensembleSectionId: mockSection.id
  }],
  eventId: mockCall.eventId,
  refreshProps: jest.fn(),
  isLoading: false,
  lastUpdated: new Date(),
  fixingSections: [{
    ...mockFixingSection, 
    ensembleSectionId: mockSection.id
  }],
  ensembleSections: [mockSection],
  event: mockEventWithCalls,
}

describe("<Fixing />", () => {
  //it("View List button shows orchestra list on click", () => {})
  //it("handles players who play multiple instruments, i.e. indicates if they are already booked", () => {})

  beforeEach(() => {
    render(<Fixing {...mockProps} />)
  })
  it("renders", () => {
    const fixingDiv = screen.getByTestId("event-fixing")
    expect(fixingDiv).toBeInTheDocument()
  })
  it("fixing header is in the document", () => {
    const fixingHeader = screen.getByTestId("fixing-header")
    expect(fixingHeader).toBeInTheDocument()
  })
  it("'Personnel' title is in the document", () => {
    const fixingHeader = screen.getByTestId("fixing-header")
    expect(fixingHeader.textContent).toMatch(/Personnel/)
  })
  it("last updated is in the document with expected format", () => {
    const lastUpdated = screen.getByText(`Last refreshed ${DateTime.fromJSDate(mockProps.lastUpdated).toFormat("HH:mm:ss DD")}`)
    expect(lastUpdated).toBeInTheDocument()
  })
  it("refresh btn is in the document and calls refresh on click", async () => {
    const refreshBtn = screen.getByTestId("refresh-btn")
    expect(refreshBtn).toBeInTheDocument()
    expect(refreshBtn.textContent).toMatch("Refresh")
    await act(async () => {
      await fireEvent.click(refreshBtn)
    })
    expect(mockProps.refreshProps).toHaveBeenCalled()
  })
  it("viewList toggle is in the document & toggles list view/instrument view", () => {
    const viewListBtn = screen.getByTestId("view-list-btn")
    expect(viewListBtn).toBeInTheDocument()
    expect(viewListBtn.textContent).toMatch("View List")
    const instrumentTiles = screen.getByTestId("instrument-tiles")
    expect(instrumentTiles).toBeInTheDocument()
    act(() => {
      fireEvent.click(viewListBtn)
    })
    const orchestraList = screen.getByTestId("orchestra-list-view")
    expect(orchestraList).toBeInTheDocument()
    expect(viewListBtn.textContent).toMatch("View Instruments")
  })
  it("Date last updated is in the document", () => {
    const fixingDiv = screen.getByTestId("event-fixing")
    expect(fixingDiv.textContent).toMatch(`Last refreshed ${DateTime.fromJSDate(mockProps.lastUpdated).toFormat("HH:mm:ss DD")}`);
  })

  it("Refresh button is in the document, and call refreshProps on click", () => {
    const refreshBtn = screen.getByTestId("refresh-btn")
    expect(refreshBtn).toBeInTheDocument()
    act(() => {
      fireEvent.click(refreshBtn)
    })
    expect(mockProps.refreshProps).toHaveBeenCalled()
  })
  it("<UpdateIndex /> for all eventSections are in the document", () => {
    for (let i = 0; i < mockProps.fixingSections.length; i++) {
      let instrumentTile = screen.getByTestId(`${mockProps.fixingSections[i].id}-update-index`)
      expect(instrumentTile).toBeInTheDocument()
    }
  })
  it("<CreateIndex /> for all ensembleSections that don't have eventSections", () => {
    for (let i = 0; i < mockProps.ensembleSections.length; i++) {
      if (mockProps.fixingSections.filter(j => j.ensembleSectionId == mockProps.ensembleSections[i].id).length === 0) {
        let ensembleSection = screen.getByTestId(`create-instrument-${mockProps.ensembleSections[i].id}`)
        expect(ensembleSection).toBeInTheDocument()
      }
    }
  })

 /*  it("instrumentation-shorthand is in the document", () => {
    const instrumentationNotation = screen.getByTestId("instrumentation-shorthand")
    expect(instrumentationNotation).toBeInTheDocument()
  }) */
})




/* describe("Upcoming..", () => {

  it("arr of ensembleSections passed to fixing tiles", () => {})
  
  it("fixer can automatically book players for a gig on their behalf ie permanent players", () => {})
  it("Fixer can simply adjust order of players in instrumentTile", () => {})
  
  it("on ensemble management page, players/management can contact all members", () => {})

  it("the default is sending offers and updates via email", () => {})
  it("as well as email, text messages sent if something makes references to a current event/event starting in less than 48 hrs", () => {})

  
  it("Event model also has array of past versions", () => {})
  it("One can compare event info with previous versions", () => {})

  it("Other orchestra admin can request to alter event details", () => {})
  it("Admin can see who made changes and the fixer approves all changes", () => {})
}) */