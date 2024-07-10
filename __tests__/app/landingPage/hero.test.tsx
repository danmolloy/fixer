import { fireEvent, render, screen } from "@testing-library/react";
import Hero from "../../../app/landingPage/hero";
import "@testing-library/jest-dom"
import { act } from "react";
import { signIn } from "next-auth/react";


jest.mock("next-auth/react", () => ({
  signIn: jest.fn()
}));

describe("<Hero />", () => {

  beforeEach(() => {
    render(<Hero />)
  })
  it("<Hero /> is in the document", () => {
    const hero = screen.getByTestId("hero-div")
    expect(hero).toBeInTheDocument()
  })
  it("header text is in the document", () => {
    const hero = screen.getByTestId("hero-div")
    expect(hero.textContent).toMatch(/^Communication made simple for fixers and musicians./)
  })
  it("'learn more' link is in the document with expected href", () => {
    const learnMore = screen.getByText('Learn more')
    expect(learnMore).toBeInTheDocument()
    expect(learnMore).toHaveAttribute("href", "/about")
  })
  it("start btn is in the document", () => {
    const startBtn = screen.getByTestId("start-btn")
    expect(startBtn).toBeInTheDocument()
  })
})