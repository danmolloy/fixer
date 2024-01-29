import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"
import EnsembleMembers, { EnsembleMembersProps } from "../../../../components/fixing/instrument/players/ensembleMembers"
import { mockEnsembleMemberWithUser } from "../../../../__mocks__/models/ensembleMember"
import { mockCall } from "../../../../__mocks__/models/call"
import { mockUser } from "../../../../__mocks__/models/user"
import { Formik } from "formik"

describe("<EnsembleMembers />", () => {
  const mockProps: EnsembleMembersProps = {
    members: [mockEnsembleMemberWithUser],
    setSelectMember: jest.fn(),
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
        <EnsembleMembers {...mockProps} />
      </Formik>
    )
  })
  it("ensemble-members is in the document", () => {
    const ensembleMembers = screen.getByTestId("ensemble-members")
    expect(ensembleMembers).toBeInTheDocument()
  })
  it("Members title is in the document", () => {
    const title = screen.getByText("Ensemble Members")
    expect(title).toBeInTheDocument()
  })
  it("all members have tiles in the document", () => {
    for (let i = 0; i < mockProps.members.length; i++) {
      let extraPlayer = screen.getByText(`${mockProps.members[i].user.firstName} ${mockProps.members[i].user.lastName}`)
      expect(extraPlayer).toBeInTheDocument()
    }
  })
  it("select btn disabled if member is in appendedPlayers", () => {
    for (let i = 0; i < mockProps.appendedPlayers.length; i++) {
      const selectBtn = screen.getByTestId(`${mockProps.appendedPlayers[i].user.id}-select-btn`)
      expect(selectBtn).toBeInTheDocument()
      expect(selectBtn).toHaveAttribute("disabled")
    }
  })  
  it("selecting member calls push with expected args", () => {})
  it("FieldArray has expected name attr", () => {})
})


describe("<EnsembleMembers />", () => {
  const mockProps: EnsembleMembersProps = {
    members: [],
    setSelectMember: jest.fn(),
    eventCalls: [mockCall],
    appendedPlayers: [{
      user: mockUser,
      addedMessage: "Lorem Ipsum",
      calls: [mockCall]
    }],
    appendedPlayerIds: [mockEnsembleMemberWithUser.id]
  }
  beforeEach(() => {
    render(<EnsembleMembers {...mockProps} />)
  })
  it("if there are no ensembleMembers, it states so", () => {
    const ensembleMembers = screen.getByTestId("ensemble-members")
    expect(ensembleMembers.textContent).toMatch("No ensemble members on your list.")
    expect(ensembleMembers.textContent).toMatch("Add them via Ensemble Page or find players in the directory or extra list.")
  })
})