import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"
import SectionExtra, { SectionExtraProps } from "../../../components/ensemble/sections/sectionExtra"
import { mockEnsembleMemberWithUser } from "../../../__mocks__/models/ensembleMember"

const mockProps: SectionExtraProps = {
  player: mockEnsembleMemberWithUser
}

describe("<SectionExtra />", () => {
  beforeEach(() => {
    render(<SectionExtra {...mockProps}/>)
  })
  it("player name is in the document", () => {
    const playerName = screen.getByText(`${mockProps.player.user.firstName} ${mockProps.player.user.lastName}`)
    expect(playerName).toBeInTheDocument()
  })
  it("user img is in the document", () => {
    const userImg = screen.getByTestId("user-img")
    expect(userImg).toBeInTheDocument()
  })
  it("'Extra' position title is in the document", () => {
    const positionTitle = screen.getByText("Extra")
    expect(positionTitle).toBeInTheDocument()
  })
  it("contact btn is in the document", () => {
    const contactBtn = screen.getByTestId("contact-btn")
    expect(contactBtn).toBeInTheDocument()
  })
  it("view profile link is in the document with expect href", () => {
    const profileLink = screen.getByText("View Profile")
    expect(profileLink).toHaveAttribute("href", `/user/${mockProps.player.userId}`)
  })
  it("contact btn calls axios.post() with expected args on click", () => {})
})