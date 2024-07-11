import FaqIndex, { faqData } from "../../../app/faq/page";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

describe("<FaqIndex />", () => {
  beforeEach(() => {
    render(<FaqIndex />)
  })
  it("<FaqIndex /> renders", () => {
    const faqIndex = screen.getByTestId("faq-index")
    expect(faqIndex).toBeInTheDocument()
  })
  it("page title and info is in the document", () => {
    const faqIndex = screen.getByTestId("faq-index")
    expect(faqIndex.textContent).toMatch(/^Frequently Asked Questions/)
  })
  it("contact link is in the document", () => {
    const contactLink = screen.getByText("Contact us")
    expect(contactLink).toBeInTheDocument()
    expect(contactLink).toHaveAttribute("href", "/contact")
    expect(contactLink).toHaveRole("link")
  })
  it("all expected questions and answers are in the document", () => {
    for (let i = 0; i < faqData.length; i ++) {
      const qAndA = screen.getByTestId(`question-${faqData[i].id}`)
      expect(qAndA).toBeInTheDocument()
      expect(qAndA.textContent).toMatch(faqData[i].question)
      expect(qAndA.textContent).toMatch(faqData[i].answer)
    }
  })
})