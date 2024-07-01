import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import ContactInfo from "../../../app/contact-us/info";

describe("<ContactInfo />", () => {
  beforeEach(() => {
    render(<ContactInfo />)
  })
  it("contact-info is in the document", () => {
    const contactInfo = screen.getByTestId("contact-info")
    expect(contactInfo).toBeInTheDocument() 
  })
  //it("matches snapshot", () => {})
})