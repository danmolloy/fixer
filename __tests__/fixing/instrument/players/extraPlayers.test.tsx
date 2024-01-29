import "@testing-library/jest-dom"
import { fireEvent, render, screen, waitFor } from "@testing-library/react"
import ExtraPlayers, { ExtraPlayersProps } from "../../../../components/fixing/instrument/players/extraPlayers"
import { mockEnsembleMemberWithUser } from "../../../../__mocks__/models/ensembleMember"
import { mockCall } from "../../../../__mocks__/models/call"
import { mockUser } from "../../../../__mocks__/models/user"
import { Formik } from "formik"

describe("<ExtraPlayers />", () => {

  const mockProps: ExtraPlayersProps = {
    extras: [mockEnsembleMemberWithUser],
    setSelectExtra: jest.fn(),
    eventCalls: [mockCall],
    appendedPlayers: [{
      user: mockEnsembleMemberWithUser.user,
      addedMessage: "Lorem Ipsum",
      calls: [mockCall]
    }],
    appendedPlayerIds: [mockEnsembleMemberWithUser.user.id]
  }
  beforeEach(() => {
    render(
      <Formik initialValues={{}} onSubmit={() => {}}>
        {() => (
          <ExtraPlayers {...mockProps} />)}
      </Formik>
    )
  })
  
  it("extra-players is in the document", () => {
    const extraPlayers = screen.getByTestId("extra-players")
    expect(extraPlayers).toBeInTheDocument()
  })
  it("'Extras' title is in the document", () => {
    const title = screen.getByText("Extra Players")
    expect(title).toBeInTheDocument()
  })
  it("all extras have tiles in the document", () => {
    for (let i = 0; i < mockProps.extras.length; i++) {
      let extraPlayer = screen.getByText(`${mockProps.extras[i].user.firstName} ${mockProps.extras[i].user.lastName}`)
      expect(extraPlayer).toBeInTheDocument()
    }
  })
  it("select btn disabled if extra is in appendedPlayers", () => {
    for (let i = 0; i < mockProps.appendedPlayers.length; i++) {
      const selectBtn = screen.getByTestId(`${mockProps.appendedPlayers[i].user.id}-select-btn`)
      expect(selectBtn).toBeInTheDocument()
      expect(selectBtn).toHaveAttribute("disabled")
    }
  })
  it("selecting player calls push with expected args", () => {})
})

describe("<ExtraPlayers />", () => {
  const mockProps: ExtraPlayersProps = {
    extras: [],
    setSelectExtra: jest.fn(),
    eventCalls: [mockCall],
    appendedPlayers: [{
      user: mockUser,
      addedMessage: "Lorem Ipsum",
      calls: [mockCall]
    }],
    appendedPlayerIds: [mockEnsembleMemberWithUser.user.id]
  }
  beforeEach(() => {
    render(
      <Formik initialValues={{}} onSubmit={() => {}}>
      {() => (
        <ExtraPlayers {...mockProps} />)}
    </Formik>
    )
  })
  it("if there are no extraPlayers, it states so", () => {
    const extraPlayers = screen.getByTestId("extra-players")
    expect(extraPlayers.textContent).toMatch("No extra players on your list.")
    expect(extraPlayers.textContent).toMatch("Add them via Ensemble Page or find players in the directory.")
  })

})
