import "@testing-library/jest-dom"
import { act, fireEvent, render, screen } from "@testing-library/react"
import EditPlayers, { EditPlayersProps } from "../../../../components/ensemble/sections/edit/editPlayers"
import { mockEnsembleMemberWithUser } from "../../../../__mocks__/models/ensembleMember"
import { mockUser, mockUserId } from "../../../../__mocks__/models/user"
import { Formik } from "formik"

const mockProps: EditPlayersProps = {
  members: [{
    name: mockEnsembleMemberWithUser.user.name,
    id: mockEnsembleMemberWithUser.user.id,
    positionTitle: "LOL"
  }],
  extras: [{
    name: mockEnsembleMemberWithUser.user.name,
    id: mockUserId,
    positionTitle: "LOL"
  }],
  searchedExtra: "",
  searchedMember: "",
  directory: [mockUser],
  selectDirPlayer: jest.fn()
}

describe("<EditPlayers />", () => {
  beforeEach(() => {
    render(
      <Formik initialValues={{
        extras: mockProps.extras,
        members: mockProps.members,
        searchedMember: mockProps.searchedMember,
        searchedExtra: mockProps.searchedExtra,
      }} onSubmit={() => {}}>
        {({ values }) => (
          <EditPlayers 
            directory={mockProps.directory}
            searchedExtra={values.searchedExtra}
            searchedMember={values.searchedMember}
            extras={values.extras}
            members={values.members}
            selectDirPlayer={mockProps.selectDirPlayer} />
        )}
      </Formik>)
  })
  it("edit-players is in the document", () => {
    const editPlayers = screen.getByTestId("edit-players")
    expect(editPlayers).toBeInTheDocument()
  })
  it("title 'Section Players' is in the document", () => {
    const title = screen.getByText("Section Players")
    expect(title).toBeInTheDocument()
  })
  it("<EditMembers /> is in the document", () => {
    const editMembers = screen.getByTestId("edit-members")
    expect(editMembers).toBeInTheDocument()
  })
  it("<EditExtras /> is in the document", () => {
    const editExtras = screen.getByTestId("edit-extras")
    expect(editExtras).toBeInTheDocument()
  })
  it("selecting member from directory calls selectDirPlayer() with expected args", async () => {
    const randInd = Math.floor(Math.random() * mockProps.directory.length)
    const searchInput = screen.getByTestId("find-members-input")
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
    expect(mockProps.selectDirPlayer).toHaveBeenCalledWith({
      id: mockProps.directory[randInd].id,
      name: `${mockProps.directory[randInd].firstName} ${mockProps.directory[randInd].lastName}`,
      playerList: "members",
      positionTitle: "tutti",
      searchCategory: "searchedMember"
    })
  })
  it("selecting extra from directory calls selectDirPlayer() with expected args", async () => {
    const randInd = Math.floor(Math.random() * mockProps.directory.length)
    const searchInput = screen.getByTestId("find-extras-input")
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
    expect(mockProps.selectDirPlayer).toHaveBeenCalledWith({
      id: mockProps.directory[randInd].id,
      name: `${mockProps.directory[randInd].firstName} ${mockProps.directory[randInd].lastName}`,
      playerList: "extras",
      positionTitle: "tutti",
      searchCategory: "searchedExtra"
    })
  })
  it("members arr is passed to <EditMembers />", () => {
    for (let i = 0; i < mockProps.members.length; i ++) {
      const member = screen.getByTestId(`member-${mockProps.members[i].id}`)
      expect(member).toBeInTheDocument()
    } 
  })
  it("directory arr is passed to <EditMembers />", async () => {
    const searchInput = screen.getByTestId("find-members-input")
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
  it("extras arr is passed to <EditExtras />", () => {
    for (let i = 0; i < mockProps.extras.length; i ++) {
      const extra = screen.getByTestId(`extra-${mockProps.extras[i].id}`)
      expect(extra).toBeInTheDocument()
    } 
  })
  it("directory arr is passed to <EditExtras />", async () => {
    const searchInput = screen.getByTestId("find-extras-input")
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

  
   //it("add array of player emails to invite to create account", () => {})
})