import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"
import PersonalInfo from "../../../components/users/settings/personalInfo"
import { Formik } from "formik"

describe("<PersonalInfo />", () => {
  beforeEach(() => {
    render(
      <Formik initialValues={{}} onSubmit={() => {}}>
      {(props) => (
        <PersonalInfo />
        )}
      </Formik>)
  })

  it("personal-information is in the document", () => {
    const personalInfo = screen.getByTestId("personal-info")
    expect(personalInfo).toBeInTheDocument()
  })
  it("first name input is in the document", () => {
    const firstNameInput = screen.getByLabelText("First Name")
    expect(firstNameInput).toBeInTheDocument()
    expect(firstNameInput).toHaveAttribute("type", "text")
    expect(firstNameInput).toHaveAttribute("name", "firstName")
  })
  it("lastname input is in the document", () => {
    const surnameInput = screen.getByLabelText("Surname")
    expect(surnameInput).toBeInTheDocument()
    expect(surnameInput).toHaveAttribute("type", "text")
    expect(surnameInput).toHaveAttribute("name", "lastName")
    
  })
  it("email input is in the document", () => {
    const emailInput = screen.getByLabelText("Email")
    expect(emailInput).toBeInTheDocument()
    expect(emailInput).toHaveAttribute("type", "email")
    expect(emailInput).toHaveAttribute("name", "email")
    
  })
  it("mobile number input is in the document", () => {
    const mobileInput = screen.getByLabelText("Mobile Number")
    expect(mobileInput).toBeInTheDocument()
    expect(mobileInput).toHaveAttribute("type", "tel")
    expect(mobileInput).toHaveAttribute("name", "mobileNumber")
    
  })
  it("contact preferences is in the document", () => {
    const contactPreference = screen.getByTestId("preferred-method")
    expect(contactPreference).toBeInTheDocument()
    
    const textMsgRadio = screen.getByLabelText("Text Message")
    expect(textMsgRadio).toBeInTheDocument()
    expect(textMsgRadio).toHaveAttribute("type", "radio")
    expect(textMsgRadio).toHaveAttribute("name", "preferredMethod")
    expect(textMsgRadio).toHaveAttribute("value", "textMessage")

    const whatsAppRadio = screen.getByLabelText("WhatsApp")
    expect(whatsAppRadio).toBeInTheDocument()
    expect(whatsAppRadio).toHaveAttribute("type", "radio")
    expect(whatsAppRadio).toHaveAttribute("name", "preferredMethod")
    expect(whatsAppRadio).toHaveAttribute("value", "whatsApp")

  })
  it("title (mr, ms etc) input is in the document", () => {})
  it("maiden name input is in the document", () => {})
})