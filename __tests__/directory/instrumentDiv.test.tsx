import { act, fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom"
import InstrumentDiv from "../../components/directory/instrumentDiv";
import React from "react";

const mockProps = {
  instrument: "Flute", 
  musicians: Math.random() < 0.5 ? []: [{
    name: "Fiona Kelly",
    instrument: "Flute",
    email: "fio@email.com"
  }]
}

describe("InstrumentDiv component", () => {
  beforeEach(() => {
    render(<InstrumentDiv {...mockProps} />)
  })
  it("Renders", () => {
    const instrumentDiv = screen.getByTestId(`${mockProps.instrument}-directory`)
    expect(instrumentDiv).toBeInTheDocument()
  })
  it("'View' button is in the document, 'Hide is on click'", () => {
    const instrumentHeader = screen.getByTestId(`${mockProps.instrument}-header-btn`)
    expect(instrumentHeader).toBeInTheDocument()
    expect(instrumentHeader.textContent).toMatch(/View/)
    expect(instrumentHeader.textContent).not.toMatch(/Hide/)
    act(() => {
      fireEvent.click(instrumentHeader)
    })
    expect(instrumentHeader.textContent).not.toMatch(/View/)
    expect(instrumentHeader.textContent).toMatch(/Hide/)
    act(() => {
      fireEvent.click(instrumentHeader)
    })
    expect(instrumentHeader.textContent).toMatch(/View/)
    expect(instrumentHeader.textContent).not.toMatch(/Hide/)
  })
  it("Musicians are in the document onClick", () => {
    if (mockProps.musicians.length > 0) {
      for (let i = 0; i < mockProps.musicians.length; i++) {
        let instrument = screen.getByTestId(`${mockProps.musicians[i].instrument}-directory`)
        let instrumentBtn = screen.getByTestId(`${mockProps.musicians[i].instrument}-header-btn`)
  
        act(() => {
          fireEvent.click(instrumentBtn)
        })
        expect(instrument.textContent).toMatch(mockProps.musicians[i].name)
      }
    }
  })
  it("If no musicians are in directory, it states so", () => {
    if (mockProps.musicians.length === 0) {
      let instrument = screen.getByTestId(`${mockProps.instrument}-directory`)
        let instrumentBtn = screen.getByTestId(`${mockProps.instrument}-header-btn`)
  
        act(() => {
          fireEvent.click(instrumentBtn)
        })
        expect(instrument.textContent).toMatch(/No musicians found.$/)

    }
  })
})