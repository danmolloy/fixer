import { fireEvent, render, screen } from "@testing-library/react"
import CreateHeader, { CreateHeaderProps } from "../../../../components/fixing/instrument/create/createHeader"
import { mockSection } from "../../../../__mocks__/models/ensembleSection"
import "@testing-library/jest-dom"

const mockProps: CreateHeaderProps = {
  section: mockSection,
  setShowOptions: jest.fn()
}

describe("<CreateHeader />", () => {
  beforeEach(() => {
    render(<CreateHeader {...mockProps} />)
  })
  it("create-header is in the document", () => {
    const createHeader = screen.getByTestId("create-header")
    expect(createHeader).toBeInTheDocument()
  })
  it("section name is in the document", () => {
    const sectionName = screen.getByText(mockProps.section.name)
    expect(sectionName).toBeInTheDocument()
  })
  it("helpful text is in the document", () => {
    const helpText = screen.getByText("No calls made")
    expect(helpText).toBeInTheDocument()
  })
  it("edit btn is in the document", () => {
    const editBtn = screen.getByText("Edit")
    expect(editBtn).toBeInTheDocument()
  })
  it("edit btn calls showOptions onClick", async () => {
    const editBtn = screen.getByText("Edit")
    fireEvent.click(editBtn)
    expect(mockProps.setShowOptions).toHaveBeenCalled()
  })
})