import "@testing-library/jest-dom"
import { act, fireEvent, render, screen } from "@testing-library/react"
import ContactMenu, { ContactMenuProps } from "../../../app/contacts/contactMenu"
import axios from "axios"
import { useRouter } from 'next/router'

jest.mock("next/router")
jest.mock("axios")
const mockPost = jest.spyOn(axios, 'post');
mockPost.mockResolvedValue({ data: {} });

const mockProps: ContactMenuProps = {
  contactId: "mockString",
  editContact: jest.fn(),
  setShowOptions: jest.fn()
}

describe("<ContactMenu />", () => {
  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      reload: jest.fn(),
      
    })
    render(<ContactMenu {...mockProps} />)
  })
  it("<ContactMenu /> is in the document", () => {
    const contactMenu = screen.getByTestId("contact-options")
    expect(contactMenu).toBeInTheDocument()
  })
  it("'Edit' button calls editContact(contactId) on click", () => {
    const editBtn = screen.getByText("Edit")
    expect(editBtn).toBeInTheDocument()
    act(() => {
      fireEvent.click(editBtn)
    })
    expect(mockProps.editContact).toHaveBeenCalledWith(mockProps.contactId)
  })
  it("'Delete' button calls deleteContact(contactId) on click", async () => {
    const deleteBtn = screen.getByText("Delete")
    expect(deleteBtn).toBeInTheDocument()
    act(() => {
      fireEvent.click(deleteBtn)
    })
    expect(mockPost).toHaveBeenCalledWith("/api/contact/delete", {"id": mockProps.contactId})
  })
})