import "@testing-library/jest-dom"
import { act, fireEvent, render, screen, waitFor } from "@testing-library/react"
import EditExtras, { EditExtrasProps } from "../../../../components/ensemble/sections/edit/extras"
import { mockFormPlayer } from "../../../../__mocks__/models/ensembleMember"
import { Formik } from "formik"
import { mockUser } from "../../../../__mocks__/models/user"
import EditMembers, { EditMembersProps } from "../../../../components/ensemble/sections/edit/members"

const mockProps = {
  members: [mockFormPlayer],
  directory: [mockUser],
  handleSelect: jest.fn(),
}

describe("<EditMembers />", () => {
  beforeEach(() => {
    render(
      <Formik initialValues={{
        members: [mockFormPlayer],
        searchedMember: ""
      }} onSubmit={() => {}}>
        {props => (
          <EditMembers {...mockProps} searchedMember={props.values.searchedMember} />
        )}
      </Formik>
    )
  })
  it("edit-members is in the document", () => {
    const editMembers = screen.getByTestId("edit-members")
    expect(editMembers).toBeInTheDocument()
  })
  it("title 'Section Members' is in the document", () => {
    const membersTitle = screen.getByText("Section Members")
    expect(membersTitle).toBeInTheDocument()
  })
  it("list of members is in the document with name, positionTitle select and remove btn", () => {
    const membersList = screen.getByTestId("members-list")
    expect(membersList).toBeInTheDocument()
    for (let i = 0; i < mockProps.members.length; i++) {
      let memberTile = screen.getByTestId(`member-${mockProps.members[i].id}`)
      expect(memberTile).toBeInTheDocument()
      expect(memberTile.textContent).toMatch(mockProps.members[i].name)
      expect(memberTile.textContent).toMatch("Principal") // positionTitle select option 
      expect(memberTile.textContent).toMatch("Tutti") // positionTitle select option
      let removeBtn = screen.getByTestId(`${mockProps.members[i].id}-remove`)
      expect(removeBtn).toBeInTheDocument()
    }
  })
  it("positionSelect has expected name attr", () => {})  
  it("comboBox is in the document with label 'Search Directory'", () => {
    const searchInput = screen.getByLabelText("Search Directory")
    expect(searchInput).toBeInTheDocument()
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
  it("selecting a player from comboBox options calls handleSelect with expected args", async() => {
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
      playerList: "members",
      searchCategory: "searchedMember"
    })
  })
  it("addedPlayer tile has select menu of positions", () => {
    const randInd = Math.floor(Math.random() * mockProps.directory.length)
    const positionSelect = screen.getByTestId(`${mockProps.members[randInd].id}-position-select`)
    expect(positionSelect).toBeInTheDocument()
  })
  it("positionTitle select menu has expected name & options with expected values adn text", () => {
    const randInd = Math.floor(Math.random() * mockProps.directory.length)
    const positionSelect = screen.getByTestId(`${mockProps.members[randInd].id}-position-select`)
    expect(positionSelect.textContent).toMatch("Principal")
    expect(positionSelect.textContent).toMatch("Tutti")

  })
  it("member remove btn is in the document", async () => {
    const randInd = Math.floor(Math.random() * mockProps.directory.length)
    const member = screen.getByTestId(`member-${mockProps.members[randInd].id}`)
    expect(member).toBeInTheDocument()
  })
  it("remove btn removes member", () => {})
})

describe("<EditMembers", () => {
  beforeEach(() => {
    render(
      <Formik initialValues={{
        members: [],
        searchedMember: ""
      }} onSubmit={() => {}}>
        {props => (
          <EditMembers {...mockProps} searchedMember={props.values.searchedMember} />
        )}
      </Formik>
    )
  })
  it("if members.length === 0, there is a helpful message", () => {
    const editMembers = screen.getByTestId("edit-members")
    expect(editMembers.textContent).toMatch("No members added.")
    expect(editMembers.textContent).toMatch("Find them in the directory below.")
  })
})