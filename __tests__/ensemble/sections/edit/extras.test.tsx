import "@testing-library/jest-dom"
import { act, fireEvent, render, screen, waitFor } from "@testing-library/react"
import EditExtras, { EditExtrasProps } from "../../../../components/ensemble/sections/edit/extras"
import { mockFormPlayer } from "../../../../__mocks__/models/ensembleMember"
import { Formik } from "formik"
import { mockUser } from "../../../../__mocks__/models/user"

const mockProps = {
  extras: [mockFormPlayer],
  directory: [mockUser],
  handleSelect: jest.fn(),
}

describe("<EditExtras />", () => {
  beforeEach(() => {
    render(
      <Formik initialValues={{
        extras: [mockFormPlayer],
        searchedExtra: ""
      }} onSubmit={() => {}}>
        {props => (
          <EditExtras 
            {...mockProps} 
            searchedExtra={props.values.searchedExtra}  />
        )}
      </Formik>
    )
  })
  it("edit-extras is in the document", () => {
    const editExtras = screen.getByTestId("edit-extras")
    expect(editExtras).toBeInTheDocument()
  })
  it("title 'Extra Players' is in the document", () => {
    const extrasTitle = screen.getByText('Extra Players')
    expect(extrasTitle).toBeInTheDocument()
  })
  it("list of extras is in the document with name, positionTitle and remove btn", async () => {
    const extrasList = screen.getByTestId("extras-list")
    expect(extrasList).toBeInTheDocument()
    for (let i = 0; i < mockProps.extras.length; i++) {
      let extraPlayer = screen.getByTestId(`extra-${mockProps.extras[i].id}`)
      expect(extraPlayer).toBeInTheDocument()
      expect(extraPlayer.textContent).toMatch(mockProps.extras[i].name)
      expect(extraPlayer.textContent).toMatch(mockProps.extras[i].positionTitle)
      let removeBtn = screen.getByTestId(`${mockProps.extras[i].id}-remove`)
      expect(removeBtn).toBeInTheDocument()
    }
  })
  it("comboBox is in the document with label 'Search Directory'", () => {
    const comboBox = screen.getByLabelText("Search Directory")
    expect(comboBox).toBeInTheDocument()
  })
  it("comboBox has expected options", async () => {
    const searchInput = screen.getByLabelText("Search Directory")
    for (let i = 0; i < mockProps.directory.length; i++) {
      await act(async () => {
        await fireEvent.change(searchInput, {target: { value: mockProps.directory[i].firstName.slice(0, 3)}})
      })
      const optionsDiv = screen.getByTestId("combo-options-div")
      expect(optionsDiv).toBeInTheDocument()
      expect(optionsDiv.textContent).toMatch(mockProps.directory[i].firstName)
      const randInd = Math.floor(Math.random() * (mockProps.directory[i].firstName.length -3))
      await act(async () => {
        await fireEvent.change(searchInput, {target: { value: mockProps.directory[i].firstName.slice(randInd, randInd+3)}})
      })
      expect(optionsDiv).toBeInTheDocument()
      expect(optionsDiv.textContent).toMatch(mockProps.directory[i].firstName)
    }
  })
  it("addedPlayer tile has select menu of positions", () => {
    const randInd = Math.floor(Math.random() * mockProps.directory.length)
    const positionSelect = screen.getByTestId(`${mockProps.extras[randInd].id}-position-select`)
    expect(positionSelect).toBeInTheDocument()
  })
  it("extra tile has remove btn", () => {
    const randInd = Math.floor(Math.random() * mockProps.directory.length)
    const member = screen.getByTestId(`extra-${mockProps.extras[randInd].id}`)
    expect(member).toBeInTheDocument()
  })
  it("positionSelect has expected name attr", () => {})  

  it("remove btn removes extra player", () => {})
  it("selecting a player from comboBox options calls handleSelect with expected args", async () => {
    const randInd = Math.floor(Math.random() * mockProps.directory.length)
    const searchInput = screen.getByLabelText("Search Directory")
    await act(async () => {
      await fireEvent.change(searchInput, {target: { value: mockProps.directory[randInd].firstName.slice(0, 3)}})
    })
    const optionsDiv = screen.getByTestId("combo-options-div")
    expect(optionsDiv).toBeInTheDocument()
    expect(optionsDiv.textContent).toMatch(mockProps.directory[randInd].firstName)
    const randPlayer = screen.getByText(`${mockProps.directory[randInd].firstName} ${mockProps.directory[randInd].lastName}`)
    expect(randPlayer).toBeInTheDocument()
    await act(async() => {
      await fireEvent.click(randPlayer)
    })
    expect(mockProps.handleSelect).toHaveBeenCalledWith({
      id: mockProps.directory[randInd].id,
      name: `${mockProps.directory[randInd].firstName} ${mockProps.directory[randInd].lastName}`,
      playerList: "extras",
      searchCategory: "searchedExtra"
    })
  })
})

describe("<EditExtras />", () => {
  beforeEach(() => {
    render(
      <Formik initialValues={{
        extras: [],
        searchedExtra: ""
      }} onSubmit={() => {}}>
        {props => (
          <EditExtras 
            {...mockProps} 
            searchedExtra={props.values.searchedExtra}  />
        )}
      </Formik>
    )
  })
  it("if extras.length === 0, there is a helpful message", () => {
    const editExtras = screen.getByTestId("edit-extras")
    expect(editExtras.textContent).toMatch("No extras added.")
    expect(editExtras.textContent).toMatch("Find them in the directory below.")
  })
})