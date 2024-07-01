import "@testing-library/jest-dom";
import { act, fireEvent, render, screen } from "@testing-library/react";
import ContactForm from "../../../app/contact-us/form";
import axios from "axios"

const mockPost = jest.spyOn(axios, 'post');

describe("<ContactForm />", () => {
  beforeEach(() => {
    render(<ContactForm />)
  })
  it("'Contact' title is in the document", () => {
    const contactTitle = screen.getByText("Contact us")
    expect(contactTitle).toBeInTheDocument()
  })


  it("name input is in the document with label, type and name attrs", () => {
    const nameInput = screen.getByLabelText("Name")
    expect(nameInput).toBeInTheDocument()
    expect(nameInput).toHaveAttribute("name", "name")
    expect(nameInput).toHaveAttribute("type", "text")
  })
  it("email input is in the document with label, type and name attrs", () => {
    const emailInput = screen.getByLabelText("Email")
    expect(emailInput).toBeInTheDocument()
    expect(emailInput).toHaveAttribute("name", "email")
    expect(emailInput).toHaveAttribute("type", "email")
  })
  it("message input is in the document with label, name, type & maxLength attrs", () => {
    const messageInput = screen.getByLabelText("Message")
    expect(messageInput).toBeInTheDocument()
    expect(messageInput).toHaveAttribute("name", "message")
    expect(messageInput).toHaveAttribute("type", "textarea")
    expect(messageInput).toHaveAttribute("maxLength", "500")
  })
  it("Submit btn is in the document", () => {
    const submitBtn = screen.getByText("Submit")
    expect(submitBtn).toBeInTheDocument()
  })
  it("err messages for name and email render on submit btn click", async () => {
    const submitBtn = screen.getByText("Submit")
    await act(async () => 
      await fireEvent.click(submitBtn)
    )
    const nameErr = screen.getByText("name required")
    expect(nameErr).toBeInTheDocument()
    const emailErr = screen.getByText("email required")
    expect(emailErr).toBeInTheDocument()
    
    expect(mockPost).not.toHaveBeenCalled()
  })
})