import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"
import SectionMember, { SectionMemberProps } from "../../../components/ensemble/sections/sectionMember"
import { mockEnsembleMember, mockEnsembleMemberWithUser } from "../../../__mocks__/models/ensembleMember"

const mockProps: SectionMemberProps = {
  player: mockEnsembleMemberWithUser
}

describe("<SectionMember />", () => {
  beforeEach(() => {
    render(<SectionMember {...mockProps} />)
  })
  it("section-member is in the document", () => {
    const sectionMember = screen.getByTestId("section-member")
    expect(sectionMember).toBeInTheDocument()
  })
  it("player name is in the document", () => {
    const playerName = screen.getByText(`${mockProps.player.user.firstName} ${mockProps.player.user.lastName}`)
    expect(playerName).toBeInTheDocument()
  })
  it("position title is in the document", () => {
    const positionTitle = screen.getByText(mockProps.player.positionTitle)
    expect(positionTitle).toBeInTheDocument()
  })
  it("contact player btn is in the document", () => {
    const contactBtn = screen.getByTestId("contact-btn")
    expect(contactBtn).toBeInTheDocument()
  })
  //it("contact player btn calls axios.post() with expected args", () => {})
})

