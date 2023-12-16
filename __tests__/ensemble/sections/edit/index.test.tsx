import "@testing-library/jest-dom"
import { act, fireEvent, render, screen, waitFor } from "@testing-library/react"
import CreateSection, { CreateSectionProps } from "../../../../components/ensemble/sections/edit"
import { mockUser, mockUserId } from "../../../../__mocks__/models/user"
import axios from "axios"
import { instrumentArr } from "../../../../components/fixing/fixing"

/*  Alert! Not currently tested for axios calls with members and extras added to lists */

jest.mock("axios")
const mockPost = jest.spyOn(axios, 'post');
mockPost.mockResolvedValue({ data: {} });

const mockProps: CreateSectionProps = {
  ensembleId: mockUserId,
  directory: [mockUser]
}

describe("<CreateSection />", () => {
  beforeEach(() => {
    render(<CreateSection {...mockProps} />)
  })
  it("create-section is in the document", () => {
    const createSection = screen.getByTestId("create-section")
    expect(createSection).toBeInTheDocument()
  })
  it("title 'Create Section' is in the document", () => {
    const pageTitle = screen.getByText("Create Section")
    expect(pageTitle).toBeInTheDocument()
  })
  it("instrument select is in the document", async () => {
    const instrumentSelect = screen.getByTestId("instrument-select-select-box")
    expect(instrumentSelect).toBeInTheDocument()
    await act(async () => {
      await fireEvent.click(instrumentSelect)
    })
    for (let i = 0; i < instrumentArr.length; i ++) {
      let instrument = screen.getByText(instrumentArr[i])
      expect(instrument).toBeInTheDocument()
    }
  })
  it("section name input is in the document with expected label and name", () => {
    const sectionName = screen.getByLabelText("Section Name")
    expect(sectionName).toBeInTheDocument()
    expect(sectionName).toHaveAttribute("name", "sectionName")
    expect(sectionName).toHaveAttribute("type", "text")
  })
  it("expected err msgs are in document if submit btn clicked with no data given", async () => {
    const submitBtn = screen.getByText("Submit")
    expect(submitBtn).toBeInTheDocument()
    expect(submitBtn).toHaveAttribute("type", "submit")

    await act(async () => 
      await fireEvent.click(submitBtn)
    )
    expect(axios.post).not.toHaveBeenCalled()
    const sectionNameErr = screen.getByTestId("sectionName-error")
    expect(sectionNameErr.textContent).toMatch("section name required")
    const instrumentErr = screen.getByTestId("instrument-error")
    expect(instrumentErr.textContent).toMatch("instrument required")
    
  })
  
  it("on instrument select, section name defaults to instrument name", async () => {
    const instrument = instrumentArr[Math.floor(Math.random() * instrumentArr.length)]
    const sectionInput = screen.getByLabelText("Section Name")
    const instrumentSelect = screen.getByTestId("instrument-select-select-box")
    await act(async () => {
      await fireEvent.click(instrumentSelect)
    })
    await act(async () => {
      const randInstrument = screen.getByText(instrument)
      await fireEvent.click(randInstrument)
    })
    if (instrument.toLowerCase() !== "violin") {
      expect(sectionInput).toHaveAttribute("value", instrument)
    }
  })
  it("if violin selected, section name does not default to instrument name", async () => {
    const instrument = "Violin"
    const instrumentSelect = screen.getByTestId("instrument-select-select-box")
    await act(async () => {
      await fireEvent.click(instrumentSelect)
    })
    await act(async () => {
      const randInstrument = screen.getByText(instrument)
      await fireEvent.click(randInstrument)
    })

    const submitBtn = screen.getByText("Submit")

    await act(async () => 
      await fireEvent.click(submitBtn)
    )
    expect(axios.post).not.toHaveBeenCalled()
    const sectionNameErr = screen.getByTestId("sectionName-error")
    expect(sectionNameErr.textContent).toMatch("section name required")
  })
  it("edit-players is in the document", () => {
    const editPlayers = screen.getByTestId("edit-players")
    expect(editPlayers).toBeInTheDocument()
  })
})

describe("<CreateSection />", () => {
  beforeEach(() => {
    render(<CreateSection {...mockProps} />)
  })
  it("submit btn is in the document and calls axios.post() with expected args", async () => {
    const sectionName = "Violin 2"
    const instrument = "Violin"
    const sectionInput = screen.getByLabelText("Section Name")
    const instrumentSelect = screen.getByTestId("instrument-select-select-box")
    await act(async () => {
      await fireEvent.click(instrumentSelect)
    })
    await act(async () => {
      const randInstrument = screen.getByText(instrument)
      await fireEvent.click(randInstrument)
    })
    await act(async () => {
      await fireEvent.change(sectionInput, {target: { value: sectionName}})
    })


    const submitBtn = screen.getByText("Submit")

    await act(async () => 
      await fireEvent.click(submitBtn)
    )
    expect(axios.post).toHaveBeenCalledWith("/api/section/create", {
      ensembleId: mockProps.ensembleId,
      name: sectionName,
      instrument,
      members: [],
      extras: []
    })
  })
})