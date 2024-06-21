import "@testing-library/jest-dom"
import ContactTile, { ContactTileProps } from "../../../../components/fixing/instrument/players/contactTile"
import { act, fireEvent, render, screen } from "@testing-library/react"
import { mockEnsembleContact } from "../../../../__mocks__/models/ensembleContact"

const mockProps: ContactTileProps = {
  contact: mockEnsembleContact,
  setSelectContact: jest.fn(),
  disabled: false
}

describe("<ContactTile />", () => {
  beforeEach(() => {
    render(<ContactTile {...mockProps} />)
  })
  it("contact-tile is in the document", () => {
    const contactTile = screen.getByTestId(`${mockProps.contact.id}-contact-tile`)
    expect(contactTile).toBeInTheDocument()
  })
  it("contact full name is in the document", () => {
    const fullName = `${mockProps.contact.firstName} ${mockProps.contact.lastName}`
    const contactName = screen.getByText(fullName)
    expect(contactName).toBeInTheDocument()
  })
  it("contact role is in the document", () => {
    const contactRole = screen.getByText(mockProps.contact.role)
    expect(contactRole).toBeInTheDocument()
  })
  it("contact category is in the document", () => {
    const contactCategory = screen.getByText(mockProps.contact.category)
    expect(contactCategory).toBeInTheDocument()
  })
  it("select btn is in the document and calls setSelectContact on click", () => {
    const selectBtn = screen.getByText("Select")
    expect(selectBtn).toBeInTheDocument()
    act(() => {
      fireEvent.click(selectBtn)
    })
    expect(mockProps.setSelectContact).toHaveBeenCalled()
  })
})