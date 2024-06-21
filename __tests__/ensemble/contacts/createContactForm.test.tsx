import "@testing-library/jest-dom"
import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import axios from "axios"
import CreateContactForm, 
  { CreateContactFormProps } from "../../../app/contacts/createContactForm";
import { mockEnsemble } from "../../../__mocks__/models/ensemble";
import { mockSection } from "../../../__mocks__/models/ensembleSection";
import { mockEnsembleContact } from "../../../__mocks__/models/ensembleContact";

jest.mock("axios")
const mockPost = jest.spyOn(axios, 'post');
mockPost.mockResolvedValue({ data: {} });

const mockProps: CreateContactFormProps = {
  ensembleId: mockEnsemble.id,
  sections: [mockSection],
  closeForm: jest.fn(),
}

describe("<CreateContactForm />", () => {
  beforeEach(() => {
    render(<CreateContactForm {...mockProps} />)
  })
  it("create-form is in the document", () => {
    const createForm = screen.getByTestId("create-contact-form")
    expect(createForm).toBeInTheDocument()
  })
  it("create form has first name input with label and name attr", () => {
    const firstNameInput = screen.getByLabelText("First Name")
    expect(firstNameInput).toBeInTheDocument()
    expect(firstNameInput).toHaveAttribute("name", "firstName")
  })
  it("create form has last name input with label and name attr", () => {
    const lastNameInput = screen.getByLabelText("Last Name")
    expect(lastNameInput).toBeInTheDocument()
    expect(lastNameInput).toHaveAttribute("name", "lastName")
  })
  it("email input is in the document with label, name and type attrs", () => {
    const emailInput = screen.getByLabelText("Email")
    expect(emailInput).toBeInTheDocument()
    expect(emailInput).toHaveAttribute("type", "email")
  })
  it("phone number input is in the document with label, name and type attrs", () => {
    const phoneInput = screen.getByLabelText("Phone")
    expect(phoneInput).toBeInTheDocument()
    expect(phoneInput).toHaveAttribute("type", "phone")
  })
  it("role input is in the document with label, name and type attrs", () => {
    const roleInput = screen.getByText("Role")
    expect(roleInput).toBeInTheDocument()
  })
  it("category input is in the document with label, name and type attrs", () => {
    const categoryInput = screen.getByText("Category")
    expect(categoryInput).toBeInTheDocument()
  })
  it("section radio is in the document with options create & select, both rendering respective inputs", () => {
    const radioGroup = screen.getByLabelText("Section")
    expect(radioGroup).toBeInTheDocument()
    const sectionSelect = screen.getByLabelText("Select section")
    expect(sectionSelect).toBeInTheDocument()
    act(() => {
      fireEvent.click(sectionSelect)
    })
    const selectBox = screen.getByLabelText("Choose section")
    expect(selectBox).toBeInTheDocument()

    const createSection = screen.getByLabelText("Create section")
    expect(createSection).toBeInTheDocument()
    act(() => {
      fireEvent.click(createSection)
    })

  })

  it("submit btn is in the document", () => {
    const submitBtn = screen.getByText("Submit")
    expect(submitBtn).toBeInTheDocument()
    expect(submitBtn).toHaveAttribute("type", "submit")
  })
  it("appropriate err messages render on submit click, without axios.post called", async () => {
    const submitBtn = screen.getByText("Submit")
    await act(async () => {
      await fireEvent.click(submitBtn)
    })
    expect(mockPost).not.toHaveBeenCalled()
    const createForm = screen.getByTestId("create-contact-form")
    expect(createForm.textContent).toMatch("first name required")
    expect(createForm.textContent).toMatch("last name required")
    expect(createForm.textContent).toMatch("phone number required")
    expect(createForm.textContent).toMatch("email required")
    expect(createForm.textContent).toMatch("section selection required")
    expect(createForm.textContent).toMatch("role required")
    expect(createForm.textContent).toMatch("category required")
  })
})