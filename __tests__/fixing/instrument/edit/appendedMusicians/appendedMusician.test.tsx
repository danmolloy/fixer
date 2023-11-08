import "@testing-library/jest-dom"
import { act, fireEvent, render, screen } from "@testing-library/react"
import MusicianTile, { MusicianTileProps } from "../../../../../components/fixing/instrument/edit/musicianTile"
import { mockUser } from "../../../../../__mocks__/models/user"
import AppendedMusician, { AppendedMusicianProps } from "../../../../../components/fixing/instrument/edit/appendedMusicians/appendedMusician"
import { mockCall } from "../../../../../__mocks__/models/call"
import { Formik } from "formik"
import { mockMessage } from "../../../../../__mocks__/models/messages"

const mockProps: AppendedMusicianProps = {
  musician: {
    user: mockUser,
    addedMessage: mockMessage,
    calls: [mockCall]
  },
  allEventCalls: [mockCall],
  index: Math.floor(Math.random()) * 10,
  remove: jest.fn(),
  addedMessage: mockMessage,
  setMessage: jest.fn()
}

describe("<AppendedMusician />", () => {
  beforeEach(() => {
    render(
      <Formik initialValues={{}} onSubmit={jest.fn()}>
        {props => (
          <table>
          <tbody>
            <AppendedMusician {...mockProps}/>
          </tbody>
        </table>
        )}
      </Formik>)
  })
  it("appended-musician is in the document", () => {
    const appendedMusician = screen.getByTestId("appended-musician")
    expect(appendedMusician).toBeInTheDocument()
  })
  it("profile img is in the document", () => {
    const image = screen.getByTestId("image")
    expect(image).toBeInTheDocument()

  })
  it("user name is in the document", () => {
    const userName = screen.getByText(mockProps.musician.user.name)
    expect(userName).toBeInTheDocument()
  })
  it("showMenu btn is in the document and calls showMenu() onClick", () => {
    const menuBtn = screen.getByTestId("menu-btn")
    expect(menuBtn).toBeInTheDocument()
  })
  it("all eventCalls are in the document and have checkboxes and call addEventCall onClick", () => {
    for (let i = 0; i < mockProps.allEventCalls.length; i ++) {
      let eventCall = screen.getByTestId(`${mockProps.musician.user.id}-row-call-${mockProps.allEventCalls[i].id}`)
      expect(eventCall).toBeInTheDocument()
      expect(eventCall).toHaveAttribute("type", "checkbox")
    }
  })
  it("added msg is in the document", () => {
    const msg = screen.getByText(mockProps.addedMessage)
    expect(msg).toBeInTheDocument()
  })

})




