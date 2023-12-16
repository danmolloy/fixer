import "@testing-library/jest-dom"
import { act, fireEvent, render, screen, waitFor } from "@testing-library/react"
import Fixing from "../../components/fixing/fixing"
import { mockUser } from "../../__mocks__/models/user"
import { FixingProps } from "../../components/fixing/fixing"
import { mockCall } from "../../__mocks__/models/call"
import { mockEventInstrumentWithMAndM } from "../../__mocks__/models/eventInstrument"
import { DateTime } from "luxon"
import InstrumentationShorthand from "../../components/fixing/instrumentationShorthand"

jest.mock("../../components/fixing/instrumentationShorthand", () => {
  return () => <div data-testid="instrumentation-shorthand"></div>
})

const mockProps: FixingProps = {
  eventCalls: [mockCall],
  instrumentSections: [mockEventInstrumentWithMAndM],
  eventId: mockCall.eventId,
  refreshProps: jest.fn(),
  users: [mockUser],
  isLoading: false,
  lastUpdated: new Date()
}

const mockData = [mockUser]

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve(
      mockData
      )
  })
) as jest.Mock;

describe("<Fixing />", () => {
  //it("View List button shows orchestra list on click", () => {})
  //it("handles players who play multiple instruments, i.e. indicates if they are already booked", () => {})

  beforeEach(() => {
    render(<Fixing {...mockProps} />)
  })
  it("Renders", () => {
    const fixingDiv = screen.getByTestId("event-fixing")
    expect(fixingDiv).toBeInTheDocument()
  })
  it("Fixing header is in the document", () => {
    const fixingHeader = screen.getByTestId("fixing-header")
    expect(fixingHeader).toBeInTheDocument()
    expect(fixingHeader.textContent).toMatch(/Personnel/)
  })
  it("Date last updated is in the document", () => {
    const fixingDiv = screen.getByTestId("event-fixing")
    expect(fixingDiv.textContent).toMatch(`Last refreshed ${DateTime.fromJSDate(mockProps.lastUpdated).toFormat("HH:mm:ss DD")}`);
  })
  it("View List button is in the document", () => {
    const viewListBtn = screen.getByTestId("view-list-btn")
    expect(viewListBtn).toBeInTheDocument()
    expect(viewListBtn.textContent).toMatch(/^View List$/)
  })
  it("Refresh button is in the document, and call refreshProps on click", () => {
    const refreshBtn = screen.getByTestId("refresh-btn")
    expect(refreshBtn).toBeInTheDocument()
    act(() => {
      fireEvent.click(refreshBtn)
    })
    expect(mockProps.refreshProps).toHaveBeenCalled()
  })
  it("All instrument sections are in the document", () => {
    for (let i = 0; i < mockProps.instrumentSections.length; i++) {
      let instrumentTile = screen.getByTestId(`${mockProps.instrumentSections[i].instrumentName}-fixing`)
      expect(instrumentTile).toBeInTheDocument()
    }
  })

  it("instrumentation-shorthand is in the document", () => {
    const instrumentationNotation = screen.getByTestId("instrumentation-shorthand")
    expect(instrumentationNotation).toBeInTheDocument()
  })

  it("instrument tiles are passed the correct musicians for the corresponding directory", () => {
    /* 
    Perhaps I should just make an Instrument model?
    */
    for (let i = 0; i < mockProps.instrumentSections.length; i ++) {
      const editBtn = screen.getByTestId(`${mockProps.instrumentSections[i].instrumentName}-edit-btn`)
      
      expect(editBtn).toBeInTheDocument()
      act(() => {
        fireEvent.click(editBtn)
      })
      const instrumentDir = screen.getByTestId(`${mockProps.instrumentSections[i].instrumentName}-directory-musicians`)
      expect(instrumentDir).toBeInTheDocument()

      for (let j = 0; j < mockProps.users.length; j++) {
        if (mockProps.users[j].instrumentsList.includes(mockProps.instrumentSections[i].instrumentName)) {
          expect(instrumentDir.textContent).toMatch(`${mockProps.users[j].firstName} ${mockProps.users[j].lastName}`)
        }
      }
    }
  })
})

describe("<Fixing />", () => {
  const mockProps: FixingProps = {
    eventCalls: [mockCall],
    instrumentSections: [{
      ...mockEventInstrumentWithMAndM, 
      instrumentName: "Violin 1"
    }],
    eventId: mockCall.eventId,
    refreshProps: jest.fn(),
    users: [{...mockUser, instrumentsList: ["Violin"]}],
    isLoading: false,
    lastUpdated: new Date()
  }
  beforeEach(() => {
    render(<Fixing {...mockProps} />)
  })

  it("1st violin directory has all violinists", () => {
    const violin1Dir = screen.getByTestId("Violin 1-fixing")
    expect(violin1Dir).toBeInTheDocument()
    const editBtn = screen.getByTestId(`Violin 1-edit-btn`)
      
      expect(editBtn).toBeInTheDocument()
      act(() => {
        fireEvent.click(editBtn)
      })
      const instrumentDir = screen.getByTestId(`Violin 1-directory-musicians`)
      expect(instrumentDir).toBeInTheDocument()
      expect(instrumentDir.textContent).toMatch(`${mockProps.users[0].firstName} ${mockProps.users[0].lastName}`)
  })
  it("2nd violin directory has all violinists", () => {})
})

describe("<Fixing />", () => {
  const mockProps: FixingProps = {
    eventCalls: [mockCall],
    instrumentSections: [{
      ...mockEventInstrumentWithMAndM, 
      instrumentName: "Violin 2"
    }],
    eventId: mockCall.eventId,
    refreshProps: jest.fn(),
    users: [{...mockUser, instrumentsList: ["Violin"]}],
    isLoading: false,
    lastUpdated: new Date()
  }
  beforeEach(() => {
    render(<Fixing {...mockProps} />)
  })

  it("2nd violin directory has all violinists", () => {
    const violin2Dir = screen.getByTestId("Violin 2-fixing")
    expect(violin2Dir).toBeInTheDocument()
    const editBtn = screen.getByTestId(`Violin 2-edit-btn`)
      
      expect(editBtn).toBeInTheDocument()
      act(() => {
        fireEvent.click(editBtn)
      })
      const instrumentDir = screen.getByTestId(`Violin 2-directory-musicians`)
      expect(instrumentDir).toBeInTheDocument()
      expect(instrumentDir.textContent).toMatch(`${mockProps.users[0].firstName} ${mockProps.users[0].lastName}`)
  })
})

describe("Upcoming..", () => {
  it("on ensemble management page, players/management can contact all members", () => {})
  it("ensemble page: management can adjust orchestra list for default in instrumentTile", () => {})
  it("update api/event/create to create sections that ensemble has", () => {})
  it("update event/createUpdate to link ensembleAdmin rather than creating fixer/fixerId", () => {})
  it("add members & extras to sections via ensemble page", () => {})
  it("add section, members list and extra list to fixing instrument tiles", () => {})

  it("Fixer can simply adjust order of players in instrumentTile", () => {})
  it("instrument tile for ensemble gig has list of permanent players", () => {})
  it("fixer can automatically book players for a gig on their behalf ie permanent players", () => {})
  it("instrumentTile has list of extras which you can select", () => {})
  
  it("the default is sending offers and updates via email", () => {})
  it("as well as email, text messages sent if something makes references to a current event/event starting in less than 48 hrs", () => {})

  it("Players state whether they are a member of an orchestra + their position", () => {})
  
  it("Event model also has array of past versions", () => {})
  it("One can compare event info with previous versions", () => {})

  it("Other orchestra admin can request to alter event details", () => {})
  it("Admin can see who made changes and the fixer approves all changes", () => {})
})