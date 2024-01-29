import "@testing-library/jest-dom"
import { screen, render, act, fireEvent } from "@testing-library/react"
import AppendedMusicianMenu, { AppendedMusicianMenuProps } from "../../../../../components/fixing/instrument/players/appendedMusicians/appendedMusicianMenu"
import { mockUser, mockUserId } from "../../../../../__mocks__/models/user"
import { Formik } from "formik"

const mockProps: AppendedMusicianMenuProps = {
  remove: jest.fn(),
  index: Math.floor(Math.random()) * 10,
  userId: mockUserId,
  setShowMenu: jest.fn(),
  setMessage: jest.fn(),
  musicianName: `${mockUser.firstName} ${mockUser.lastName}`
}

describe("<AppendedMusicianMenu />", () => {
  beforeEach(() => {
    render(
      <Formik initialValues={{}} onSubmit={() => {}}>
        {(props) => (
          <AppendedMusicianMenu {...mockProps}/>      
        )}
      </Formik>)
  })
  it("view profile link is in the document", () => {
    const profileBtn = screen.getByText("View Profile")
    expect(profileBtn).toBeInTheDocument()
    expect(profileBtn).toHaveAttribute("href", `/user/${mockProps.userId}`)
  })
  it("remove from list btn is in the document and calls remove", () => {
    const removeBtn = screen.getByText("Remove from List")
    expect(removeBtn).toBeInTheDocument()
    act(() => {
      fireEvent.click(removeBtn)
    })
    expect(mockProps.remove).toBeCalled()
  })
  it("add message btn is in the document", () => {
    const msgBtn = screen.getByText("Add Message")
    expect(msgBtn).toBeInTheDocument()

  })
  //it("add message btn calls sendmessage with expected args", () => {})
  //it("setShowMenu is called onBlur", () => {})
})