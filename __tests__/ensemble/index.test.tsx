import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"
import EnsembleIndex, { EnsembleIndexProps } from "../../components/ensemble"
import { mockSectionWithPlayersAndBulletins } from "../../__mocks__/models/ensembleSection"
import { mockEnsemble } from "../../__mocks__/models/ensemble"

const mockProps: EnsembleIndexProps = {
  sections: [mockSectionWithPlayersAndBulletins],
  ensemble: mockEnsemble
}

describe("<EnsembleIndex />", () => {
  beforeEach(() => {
    render(<EnsembleIndex {...mockProps} />)
  })
  it("ensemble-index is in the document", () => {
    const ensembleIndex = screen.getByTestId("ensemble-index")
    expect(ensembleIndex).toBeInTheDocument()
  })
  it("ensemble name is in the document", () => {
    const ensembleName = screen.getByText(mockProps.ensemble.name)
    expect(ensembleName).toBeInTheDocument()
  })
  it("ensemble-calendar is in the document", () => {
    const ensembleCalendar = screen.getByTestId("ensemble-calendar")
    expect(ensembleCalendar).toBeInTheDocument()
  })
    //it("all events listed and all indicate if user is involved", () => {})

  it("ensemble-bulletins is in the document", () => {
    const ensembleBulletins = screen.getByTestId("ensemble-bulletins")
    expect(ensembleBulletins).toBeInTheDocument()
  })
    //it("view your sent msgs and your inbox", () => {})
    //it("create bulletin btn", () => {})
    //it("create page has title, body, urgency, text msg alert option and which players/sections/event members to send to", () => {})
    //it("preview has title, author & who it is addressed to", () => {})
    //it("preview indicates whether it has been read", () => {})
    //it("one can mark them as read/unread", () => {})
    //it("bulletin detail has list of groups/people it is addressed to, body & who has seen it", () => {})
  
  it("ensemble-sections is in the document", () => {
    const ensembleSections = screen.getByTestId("ensemble-sections")
    expect(ensembleSections).toBeInTheDocument()
  })
    //it("title of section is in the document", () => {})
    
    //it("admin able to create sections", () => {})
    //it("section create form includes section name & instrument", () => {})
    //it("able to arrange order of sections on page (and event pages)", () => {})
    //it("able to arrange section players order", () => {})
    //it("add players by searching via name", () => {})
    //it("add extras by searching via name or directory", () => {})
    
  it("ensemble-management is in the document", () => {
    const ensembleManagement = screen.getByTestId("ensemble-management")
    expect(ensembleManagement).toBeInTheDocument()
  })
  //it("link to create event via ensemble-management", () => {})

  //it("menu link to your ensemble, drop list if multiple listed", () => {})
  //it("create event form lists ensembles that user is admin of", () => {})
  //it("create event form 'Other' ensemble is create ensemble form", () => {})


  //it("only orchestra admin (who are paying members) can create an ensemble (i.e. take out radio btns for admin/muso and section select)", () => {})
})