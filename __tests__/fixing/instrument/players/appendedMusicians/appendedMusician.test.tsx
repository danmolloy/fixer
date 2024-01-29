import "@testing-library/jest-dom"
import { act, fireEvent, render, screen, waitFor } from "@testing-library/react"
import MusicianTile, { MusicianTileProps } from "../../../../../components/fixing/instrument/edit/musicianTile"
import { mockUser } from "../../../../../__mocks__/models/user"
import AppendedMusician, { AppendedMusicianProps } from "../../../../../components/fixing/instrument/players/appendedMusicians/appendedMusician"
import { mockCall } from "../../../../../__mocks__/models/call"
import { Formik } from "formik"
import { mockMessage } from "../../../../../__mocks__/models/messages"
import { mockEnsembleMember } from "../../../../../__mocks__/models/ensembleMember"


const listLength = Math.ceil(Math.random() * 10) + 3

const mockProps: AppendedMusicianProps = {
  musician: {
    user: mockUser,
    addedMessage: mockMessage,
    calls: [String(mockCall.id)],
    positionTitle: mockEnsembleMember.positionTitle
  },
  allEventCalls: [mockCall],
  index: Math.floor(Math.random() * listLength),
  remove: jest.fn(),
  addedMessage: mockMessage,
  setMessage: jest.fn(),
  move: jest.fn(),
  listLength: listLength
}

const moveMock = jest.fn()

describe("<AppendedMusician />", () => {
  beforeEach(() => {
    render(
      <Formik initialValues={{}} onSubmit={jest.fn()}>
        {props => (
          <table>
          <tbody>
            <AppendedMusician {...mockProps} move={moveMock}/>
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
    const image = screen.getByTestId("profile-img")
    expect(image).toBeInTheDocument()

  })
  it("user name is in the document", () => {
    const userName = screen.getByText(`${mockProps.musician.user.firstName} ${mockProps.musician.user.lastName}`)
    expect(userName).toBeInTheDocument()
  })
  it('position title select is in the document with expected options, name attr and as attr', () => {
    const positionSelect = screen.getByTestId(`${mockProps.musician.user.id}-position-select`)
    expect(positionSelect).toBeInTheDocument()
    expect(positionSelect).toHaveAttribute("name", `musicians.${mockProps.index}.positionTitle`)
    const principalOption = screen.getByText("Principal")
    expect(principalOption).toBeInTheDocument()
    expect(principalOption).toHaveAttribute("value", "principal")
    const tuttiOption = screen.getByText("Tutti")
    expect(tuttiOption).toHaveAttribute("value", "tutti")
  })
  it("showMenu btn is in the document and renders <AppendedMusicianMenu /> on click", async () => {
    const menuBtn = screen.getByTestId("menu-btn")
    expect(menuBtn).toBeInTheDocument()
    await waitFor(() => fireEvent.click(menuBtn))
    const musicianMenu = screen.getByTestId("musician-menu")
    expect(musicianMenu).toBeInTheDocument()
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
  it("eventCall checkbox is checked if musician's calls includes call ID", () => {
    for (let i = 0; i < mockProps.allEventCalls.length; i++) {
      const callCheckbox = screen.getByTestId(`${mockProps.musician.user.id}-row-call-${mockProps.allEventCalls[i].id}`)
      expect(callCheckbox).toBeInTheDocument()
      expect(callCheckbox).toHaveAttribute("checked")
    }
  })
  it("move up btn is in the document and calls move() with expected args", async () => {
    const moveUpBtn = screen.getByTestId("move-up-btn")
    expect(moveUpBtn).toBeInTheDocument()
    await act(async () => fireEvent.click(moveUpBtn))
    expect(moveMock).toHaveBeenCalledWith(mockProps.index, mockProps.index - 1)
  })
  it("move down btn is in the document and calls move() with expected args", async () => {
    const moveDownBtn = screen.getByTestId("move-down-btn")
    expect(moveDownBtn).toBeInTheDocument()
    await act(async () => fireEvent.click(moveDownBtn))
    expect(moveMock).toHaveBeenCalledWith(mockProps.index, mockProps.index + 1)

  })
})

describe("<AppendedMusician />", () => {
  const mockProps: AppendedMusicianProps = {
    musician: {
      user: mockUser,
      addedMessage: mockMessage,
      calls: [],
      positionTitle: mockEnsembleMember.positionTitle
    },
    allEventCalls: [mockCall],
    index: 0,
    remove: jest.fn(),
    addedMessage: mockMessage,
    setMessage: jest.fn(),
    move: jest.fn(),
    listLength: listLength
  }
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
  it("eventCall checkbox is not checked if musician's calls does not include call ID", () => {
    for (let i = 0; i < mockProps.allEventCalls.length; i++) {
      const callCheckbox = screen.getByTestId(`${mockProps.musician.user.id}-row-call-${mockProps.allEventCalls[i].id}`)
      expect(callCheckbox).toBeInTheDocument()
      expect(callCheckbox).not.toHaveAttribute("checked")
    }
  })

  it("move up btn disabled if musician index < 1", async () => {
    const moveUpBtn = screen.getByTestId("move-up-btn")
    expect(moveUpBtn).toBeInTheDocument()
    await act(async () => fireEvent.click(moveUpBtn))
    expect(moveMock).not.toHaveBeenCalled()
    expect(moveUpBtn).toHaveAttribute("disabled")
  })

})

describe("<AppendedMusician />", () => {
  const mockProps: AppendedMusicianProps = {
    musician: {
      user: mockUser,
      addedMessage: mockMessage,
      calls: [],
      positionTitle: mockEnsembleMember.positionTitle
    },
    allEventCalls: [mockCall],
    index: listLength - 1,
    remove: jest.fn(),
    addedMessage: mockMessage,
    setMessage: jest.fn(),
    move: jest.fn(),
    listLength: listLength
  }
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
  it("move down btn disabled if musician index >= listLength - 1", async () => {
    const moveDownBtn = screen.getByTestId("move-down-btn")
    expect(moveDownBtn).toBeInTheDocument()
    await act(async () => fireEvent.click(moveDownBtn))
    expect(moveMock).not.toHaveBeenCalled()
    expect(moveDownBtn).toHaveAttribute("disabled")
  })
})





