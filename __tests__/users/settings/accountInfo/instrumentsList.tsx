import "@testing-library/jest-dom"
import { act, fireEvent, render, screen, waitFor } from "@testing-library/react"
import InstrumentsList, { InstrumentsListProps } from "../../../../components/users/settings/accountInfo/instrumentsList"
import { Formik } from "formik"
import { instrumentArr } from "../../../../components/fixing/fixing"

const mockProps: InstrumentsListProps = {
  instrumentsList: ["Violin", "Violia"],
}

describe("<InstrumentsList />", () => {
  beforeEach(() => {
    render(
      <Formik initialValues={() => {}} onSubmit={() => {}}>
        {props => (
          <InstrumentsList {...mockProps} />
        )}
      </Formik>)
  })
  it("instruments-list is in the document", () => {
    const instrumentsList = screen.getByTestId("instruments-list")
    expect(instrumentsList).toBeInTheDocument()
  })
  it("list of current instruments is in the document", () => {
    for (let i = 0; i < mockProps.instrumentsList.length; i ++) {
      let instrument = screen.getByText(mockProps.instrumentsList[i])
      expect(instrument).toBeInTheDocument()
    }
  })
  it("header and help text is in the document", () => {
    const playersFyi = screen.getByText("Add your instrument(s) to be in the directory and bookable for gigs.")
    const fixerClause = screen.getByText("If you are a fixer/administrator only, just leave this blank.")
    expect(playersFyi).toBeInTheDocument()
    expect(fixerClause).toBeInTheDocument()
    const header = screen.getByText("Your instrument(s)")
    expect(header).toBeInTheDocument()
  })

  it("selectMenu is in the document", () => {
    const selectMeny = screen.getByTestId("instrument-select-menu")
    expect(selectMeny).toBeInTheDocument()
  })

  it("select menu contains all instruments", async() => {
    const instrumentSelectBox = screen.getByTestId("instrument-select-box")
    expect(instrumentSelectBox).toBeInTheDocument()
    expect(instrumentSelectBox.textContent).toMatch("Select an instrument")
    act(() => {
      fireEvent.click(instrumentSelectBox)
    })
    const valList = screen.getByTestId("instrument-vals-list")
    expect(valList).toBeInTheDocument()
    for (let i = 0; i < instrumentArr.length; i++) {
      let option = screen.getByTestId(`${instrumentArr[i]}-option`)
      expect(option).toBeInTheDocument()
      expect(option.textContent).toMatch(instrumentArr[i])
    }
  })
  it("instruments have remove btn which calls arrayHelpers.remove(index) on click", () => {
    for (let i = 0; i < mockProps.instrumentsList.length; i++) {
      let removeBtn = screen.getByTestId(`${mockProps.instrumentsList[i].toLocaleLowerCase()}-remove-btn`)
      expect(removeBtn).toBeInTheDocument()
    }
  })
  it("calls arrayHelpers.remove(index) on click", () => {})
  it("selecting an instrument calls push with expected arg", () => {})
  it("User can't add an instrument that is already added", () => {})

})

describe("<InstrumentsList />", () => {
  const mockProps: InstrumentsListProps = {
    instrumentsList: [],
  }
  beforeEach(() => {
    render(
      <Formik initialValues={() => {}} onSubmit={() => {}}>
        {props => (
          <InstrumentsList {...mockProps} />
        )}
      </Formik>)
  })
  it("if no current instruments, it states so", () => {
    if (mockProps.instrumentsList.length === 0) {
      let helpText = screen.getByText("You have no instruments currently listed.")
      expect(helpText).toBeInTheDocument()
    }
  })
})