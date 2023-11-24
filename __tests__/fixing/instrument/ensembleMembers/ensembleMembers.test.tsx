import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"
import EnsembleMembers, { EnsembleMembersProps } from "../../../../components/fixing/instrument/ensembleMembers/ensembleMembers"
import { mockEnsembleMemberWithUser } from "../../../../__mocks__/models/ensembleMember"

describe("<EnsembleMembers />", () => {
  const mockProps: EnsembleMembersProps = {
    members: [mockEnsembleMemberWithUser],
    setSelectMember: jest.fn()
  }
  beforeEach(() => {
    render(<EnsembleMembers {...mockProps} />)
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
})


describe("<EnsembleMembers />", () => {
  const mockProps: EnsembleMembersProps = {
    members: [],
    setSelectMember: jest.fn()
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