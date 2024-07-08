import "@testing-library/jest-dom"
import { act, fireEvent, render, screen } from "@testing-library/react"
import CreateInstrumentIndex, { CreateInstrumentProps } from "../../../../components/fixing/instrument/create"
import { mockSection } from "../../../../__mocks__/models/ensembleSection"
import { mockCall } from "../../../../__mocks__/models/call"
import { mockEnsembleContact } from "../../../../__mocks__/models/ensembleContact"

const mockProps: CreateInstrumentProps = {
  section: {...mockSection, contacts: [mockEnsembleContact]},
  eventCalls: [mockCall],
  eventId: Math.ceil(Math.random() * 20),
  refreshProps: jest.fn()
}

describe("<CreateInstrumentIndex />", () => {
  beforeEach(() => {
    render(<CreateInstrumentIndex {...mockProps} />)
  })
  it("create-instrument-index is in the document", () => {
    const createIndex = screen.getByTestId(`create-instrument-${mockProps.section.id}`)
    expect(createIndex).toBeInTheDocument()
  })
  it("<CreateHeader /> is in the document", () => {
    const createHeader = screen.getByTestId("create-header")
    expect(createHeader).toBeInTheDocument()
  })
  it("<CreateInstrumentForm /> is in the document if edit btn clicked", () => {
    const editBtn = screen.getByText("Edit")
    expect(editBtn).toBeInTheDocument()
    act(() => {
      fireEvent.click(editBtn)
    })
    const createForm = screen.getByTestId("create-form")
    expect(createForm).toBeInTheDocument()
  })
})