import "@testing-library/jest-dom";
import { act, fireEvent, render, screen } from "@testing-library/react";
import DiaryContact, { DiaryContactProps } from "../../../../app/fixing/contactMessage/diaryContact";
import { mockEnsembleContact } from "../../../../__mocks__/models/ensembleContact";



describe("<DiaryContactProps />", () => {
  const mockProps: DiaryContactProps = {
    contact: mockEnsembleContact,
    setSelectContact: jest.fn(),
    disabled: false
  }
  beforeEach(() => {
    render(<DiaryContact {...mockProps} />)
  })
  it("<DiaryContact /> renders", () => {
    const diaryContact = screen.getByTestId(`${mockProps.contact.id}-contact-tile`)
    expect(diaryContact).toBeInTheDocument()
  })
  it("contact category is in the document", () => {
    const diaryContact = screen.getByTestId(`${mockProps.contact.id}-contact-tile`)
    expect(diaryContact.textContent).toMatch(mockProps.contact.category!)
  })
  it("contact full name is in the document", () => {
    const diaryContact = screen.getByTestId(`${mockProps.contact.id}-contact-tile`)
    expect(diaryContact.textContent).toMatch(`${mockProps.contact.firstName} ${mockProps.contact.lastName}`)
  })
  it("contact role is in the document", () => {    
    const diaryContact = screen.getByTestId(`${mockProps.contact.id}-contact-tile`)
    expect(diaryContact.textContent).toMatch(mockProps.contact.role)
  })
  it("select btn is in the document and calls setSelectContact on click", () => {
    const selectBtn = screen.getByText("Select")
    expect(selectBtn).toHaveRole("button")
    expect(selectBtn).not.toHaveAttribute("disabled")
    act(() => {
      fireEvent.click(selectBtn)
    })
    
    expect(mockProps.setSelectContact).toHaveBeenCalled()
  })
})

describe("<DiaryContactProps />", () => {
  const mockProps: DiaryContactProps = {
    contact: mockEnsembleContact,
    setSelectContact: jest.fn(),
    disabled: true
  }
  beforeEach(() => {
    render(<DiaryContact {...mockProps} />)
  })
  it("select btn is disabled", () => {
    const selectBtn = screen.getByText("Select")
    expect(selectBtn).toHaveAttribute("disabled")
  })
})