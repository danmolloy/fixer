import "@testing-library/jest-dom"
import { act, fireEvent, render, screen } from "@testing-library/react"
import MusicianTile, { MusicianTileProps } from "../../../../components/fixing/instrument/edit/musicianTile"
import { mockUser } from "../../../../__mocks__/models/user"



describe("<MusicianTile />", () => {
  const mockProps: MusicianTileProps = {
    musician: mockUser,
    appendPlayer: jest.fn(),
    disabled: false
  }
  beforeEach(() => {
    render(<MusicianTile {...mockProps}/>)
  })
  it("musician-tile is in the document", () => {
    const musicianTile = screen.getByTestId("musician-tile")
    expect(musicianTile).toBeInTheDocument()
  })
  it("profile img is in the document", () => {
    const userImg = screen.getByTestId("profile-img")
    expect(userImg).toBeInTheDocument()

  })
  it("user name is in the document", () => {
    const userName = screen.getByText(`${mockProps.musician.firstName} ${mockProps.musician.lastName}`)
    expect(userName).toBeInTheDocument()
  })
  it("view profile btn is in the document", () => {
    const profileBtn = screen.getByText("View Profile")
    expect(profileBtn).toBeInTheDocument()
    expect(profileBtn).toHaveAttribute("href", `/user/${mockProps.musician.id}`)
  })
  it("add to list btn is in the document and calls appendPlayer ", () => {
    const addBtn = screen.getByText("Add to List")
    expect(addBtn).toBeInTheDocument()
    act(() => {
      fireEvent.click(addBtn)
    })
    expect(mockProps.appendPlayer).toHaveBeenCalled()
  })
})



describe("<MusicianTile />", () => {
  const mockProps: MusicianTileProps = {
    musician: mockUser,
    appendPlayer: jest.fn(),
    disabled: true
  }
  beforeEach(() => {
    render(<MusicianTile {...mockProps}/>)
  })
  it("if disabled, add to list btn does not call appendPlayer ", () => {
    const addBtn = screen.getByText("Add to List")
    expect(addBtn).toBeInTheDocument()
    act(() => {
      fireEvent.click(addBtn)
    })
    expect(mockProps.appendPlayer).not.toBeCalled()
  })

})
